import runtimeEnv from '@mars/heroku-js-runtime-env';

class Config {
    static getApiURL(){
        const env = runtimeEnv();
        switch (env.REACT_APP_ENV) {
            case "production":
                return "https://beach-train-backend.herokuapp.com/";
            case "qa":
                return "https://beach-train-backend-qa.herokuapp.com/";
            case "development":
                return "https://beach-train-backend-qa.herokuapp.com/";
            default:
                return "https://beach-train-backend-qa.herokuapp.com/";
        }
    }
};

export default Config;