import { useRecoilValue } from 'recoil';
import { currentLanguageState } from '../../../States/States';
import { get } from 'lodash';
import { Component, ReactElement } from 'react';

interface Props {
    key: string;
}

interface State {
    currentLanguage: string;
    translations: {
        [key: string]: string;
    };
}

interface ClassProps extends Props, State {}

class TranslationInner extends Component<ClassProps> {
    render() {
        return get(this.props.translations, [this.props.currentLanguage, this.props.key]);
    }
}

export const Translation = ({ key }: Props) => {
    const currentLanguage = useRecoilValue(currentLanguageState);
    const translations = {
        de: require('../../../Translations/de.json'),
        en: require('../../../Translations/en.json'),
    };
    return <TranslationInner key={key} currentLanguage={currentLanguage} translations={translations} />;
};
