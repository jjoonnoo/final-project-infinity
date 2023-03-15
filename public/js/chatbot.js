import { Configuration, OpenAIApi } from 'https://cdn.skypack.dev/openai';
    // const { Configuration, OpenAIApi } = require("openai");

    document.querySelector('#send').addEventListener('click', function(){
      var template = `<div class="line">
        <span class="chat-box mine">${ document.querySelector('#input').value }</span>
      </div>`
      document.querySelector('.chat-content').insertAdjacentHTML('beforeend', template);

      const configuration = new Configuration({
        apiKey: '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',
      });
      const openai = new OpenAIApi(configuration);

      openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: `${ document.querySelector('#input').value }`}],
      }).then((result) => {
        console.log(result.data.choices[0].message.content)
        var template = `<div class="line">
          <span class="chat-box">${ result.data.choices[0].message.content }</span>
        </div>`
        document.querySelector('.chat-content').insertAdjacentHTML('beforeend', template);
      })
    })