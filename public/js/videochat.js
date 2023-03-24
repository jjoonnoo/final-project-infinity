const socket = io.connect('ws://localhost:7000');


const myFace = document.getElementById('myFace');
const muteBtn = document.getElementById('mute');
const cameraBtn = document.getElementById('camera');
const camerasSelect = document.getElementById('cameras');
const call = document.getElementById('call');


call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;
let roomName;
let myPeerConnection;
let myDataChannel;

/**
 * camera(device)의 정보를 가져와 option형식으로 만듬
 */
async function getCameras() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(
            (device) => device.kind === 'videoinput'
        );
        const currentCamera = myStream.getVideoTracks()[0];
        cameras.forEach((camera) => {
            const option = document.createElement('option');
            option.value = camera.deviceId;
            option.innerText = camera.label;
            if (currentCamera.label === camera.label) {
                option.selected = true;
            }
            camerasSelect.appendChild(option);
        });
    } catch (e) {
        console.log(e);
    }

}

/**
 * Constrains를 이용해 media를 myFace에 출력
 * @param {string} deviceId
 */
async function getMedia(deviceId) {
    const initialConstrains = {
        audio: true,
        video: { facingMode: 'user' },
    };
    const cameraConstraints = {
        audio: true,
        video: { deviceId: { exact: deviceId } },
    };
    try {
        myStream = await navigator.mediaDevices.getUserMedia(
            deviceId ? cameraConstraints : initialConstrains
        );
        myFace.srcObject = myStream;
        if (!deviceId) {
            await getCameras();
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 *
 */
function handleMuteClick() {
    myStream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
}
if (!muted) {
    muteBtn.innerText = 'Unmute';
    muted = true;
} else {
    muteBtn.innerText = 'Mute';
    muted = false;
}

function handleCameraClick() {
    myStream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
    if (cameraOff) {
        cameraBtn.innerText = 'Turn Camera Off';
        cameraOff = false;
    } else {
        cameraBtn.innerText = 'Turn Camera On';
        cameraOff = true;
    }
}

async function handleCameraChange() {
    await getMedia(camerasSelect.value);
    if (myPeerConnection) {
        const videoTrack = myStream.getVideoTracks()[0];
        const videoSender = myPeerConnection
            .getSenders() // senders => connection을 컨트롤함!
            .find((sender) => sender.track.find === 'video');
        videoSender.replaceTrack(videoTrack);
    }
}

muteBtn.addEventListener('click', handleMuteClick);
cameraBtn.addEventListener('click', handleCameraClick);
camerasSelect.addEventListener('click', handleCameraChange);

// welcome form(join a room)

const welcome = document.getElementById('welcome');
const welcomeForm = welcome.querySelector('form');

async function initCall() {
    welcome.hidden = true;
    call.hidden = false;
    await getMedia();
    makeConnection();
    console.log('initcall initiated');
}

// Enter Room

async function handleWelcomeSubmit(event) {
    event.preventDefault();
    const input = welcomeForm.querySelector('input');
    await initCall();
    socket.emit('join_room', input.value);
    roomName = input.value;
    input.value = '';
}

// Room에 들어가고, offer를 주는 방식(socket)은 거의 실시간으로 일어나기 때문에
// offer가 가지도 않았는데 description단이 실행되면서 오류가 일어남!
// done() 을 이용한 initCall함수 호출을 앞으로 뺌
// 그렇게 되면 offer를 받은 후 myPeerConnection이 존재하게 됨!

welcomeForm.addEventListener('submit', handleWelcomeSubmit);

// Socket

// Send offer - Client 1
socket.on('welcome', async () => {
    myDataChannel = myPeerConnection.createDataChannel('chat');
    myDataChannel.addEventListener('message', console.log); // client 2 don't need to make data channel!
    console.log('made data channel');
    const offer = await myPeerConnection.createOffer();
    myPeerConnection.setLocalDescription(offer);
    console.log('sent the offer');
    socket.emit('offer', offer, roomName);
});

// Set description and CreateAnser- Client 2
// C1 에서 온 remote를 받고 나의 local을 설정
socket.on('offer', async (offer) => {
    myPeerConnection.addEventListener('datachannel', (event) => {
        myDataChannel = event.channel;
        myDataChannel.addEventListener('message', console.log);
    }); //myDataChannel.send("hello") => c2에 뜸!
    console.log('i received offer');
    myPeerConnection.setRemoteDescription(offer);
    const answer = await myPeerConnection.createAnswer();
    console.log(answer);
    myPeerConnection.setLocalDescription(answer);
    socket.emit('answer', answer, roomName);
    console.log('send the answer');
});

socket.on('answer', (answer) => {
    console.log('received answer');
    myPeerConnection.setRemoteDescription(answer);
});

socket.on('ice', (ice) => {
    console.log('received candidate');
    myPeerConnection.addIceCandidate(ice);
});

// RTC code

function makeConnection() {
    myPeerConnection = new RTCPeerConnection();
    iceServers: [
        {
            urls: [
                'stun:stun.l.google.com:19302',
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
                'stun:stun3.l.google.com:19302',
                'stun:stun4.l.google.com:19302',
            ],
        },
    ];
    myPeerConnection.addEventListener('icecandidate', handleIce);
    myPeerConnection.addEventListener('addstream', handleAddStream);
    myStream
        .getTracks()
        .forEach((track) => myPeerConnection.addTrack(track, myStream));
}

function handleIce(data) {
    console.log('sent candidate');
    socket.emit('ice', data.candidate, roomName);
}

function handleAddStream(data) {
    const peerFace = document.getElementById('peerFace');
    peerFace.srcObject = data.stream;
}
