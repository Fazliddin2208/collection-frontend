import React,{ useState } from 'react';
import { IntlProvider } from 'react-intl'

import English from '../localization/en-US.json'
import Uzbek from '../localization/uz-UZ.json'

export const Context = React.createContext();

const local = navigator.language;

let lang;

if(local == 'en-US'){
  lang = English
}else{
  lang = Uzbek
}

const Wrapper = (props) => {

    const [locale,setLocale] = useState(local)
    const [messages,setMessages] = useState(lang)

    function selectLang(e){
        const newLocale = e.target.value;
        setLocale(newLocale)
        if(newLocale === 'uz-UZ'){
            setMessages(Uzbek)
        }else{
            setMessages(English)
        }
    }

    return (
        <div>
            <Context.Provider value={{locale,selectLang}}>
                <IntlProvider messages={messages} locale={locale}>
                    {props.children}
                </IntlProvider>
            </Context.Provider>
        </div>
    );
};


export default Wrapper;