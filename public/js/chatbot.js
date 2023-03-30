const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();

document.querySelector('#send').addEventListener('click', function () {
    var template = `<div class="line_mine">
        <span class="chat-box mine">${
            document.querySelector('#input').value
        }</span>
      </div>
      <div class="line">
      <span class="chat-box">답변 생성중입니다. 잠시만 기다려 주십시오</span>
      </div>`;
    //   var temp_template = `<div class="line">
    //   <span class="chat-box">답변 생성중입니다. 잠시만 기다려 주십시오</span>
    // </div>`
    document
        .querySelector('.chat-content')
        .insertAdjacentHTML('beforeend', template);
    document.getElementById('chat-content').scrollTop =
        document.getElementById('chat-content').scrollHeight;

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: [{role: "user", content: `${ document.querySelector('#input').value }`}],
    openai
        .createCompletion({
            model: 'text-davinci-003',
            prompt: document.querySelector('#input').value,
            temperature: 0.5,
            max_tokens: 256,
        })
        .then((result) => {
            var template = `<div class="line">
          <span class="chat-box">${result.data.choices[0].text}</span>
        </div>`;
            document
                .querySelector('.chat-content')
                .insertAdjacentHTML('beforeend', template);

            document.getElementById('chat-content').scrollTop =
                document.getElementById('chat-content').scrollHeight;
        });
});

// result.data.choices[0].message.content
