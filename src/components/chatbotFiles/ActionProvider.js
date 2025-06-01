import axios from 'axios';

class ActionProvider {
    constructor(createChatBotMessage , setStateFunc){
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
    handleUserMessage = async (message) =>{
        try{
            const response = await axios.post(
                'https://fictional-broccoli-g944v47xg6929x5x-5000.app.github.dev/ask',
                { question: message },
                {
                  headers: {
                    'X-Github-Token': 'ghu_U2Q2Ps9TF5EGh1IVtEA7TFy4pew35s3BgQTZ',
                    'Content-Type': 'application/json',
                  },
                }
              );
              const botResponse = response.data?.answer || response.data?.response || JSON.stringify(response.data);
             const botMessage = this.createChatBotMessage(botResponse);
             this.setState((prev) => 
             ({
                ...prev,
                messages:[...prev.messages,botMessage],

             })
            );

        }
        catch(err){
         const errorMessage = this.createChatBotMessage("Une erreur est survenue!");
         this.setState((prev) =>
        ({
            ...prev,
            messages:[...prev.messages,errorMessage],

        }));
        }
    };
}
export default ActionProvider;