import React, { ReactElement, ReactNode, useState } from "react";
import { SupportedLanguages } from "./SupportedLanguages";
import { Translations } from "./Translations";
import { WebExtensionMessage } from "./WebExtensionMessage";
import { IntlProvider } from "react-intl";

export function TranslationProvider(props: {
  children: ReactNode;
}): ReactElement {
  const [langState, setLangState] = useState<SupportedLanguages>(
    SupportedLanguages.hu
  );
  const translations = Translations;
  const translationsForLocale = translations[langState];
  const messagesForLocale = mapWebExtensionsMessages(translationsForLocale);
  return (
    <IntlProvider locale={langState} messages={messagesForLocale}>
      {props.children}
    </IntlProvider>
  );
}

function mapWebExtensionsMessages(messages: {
  [key: string]: WebExtensionMessage;
}): Record<string, string> {
  const result: Record<string, string> = {};
  Object.keys(messages).forEach((key) => {
    result[key] = messages[key].message;
  });
  return result;
}
