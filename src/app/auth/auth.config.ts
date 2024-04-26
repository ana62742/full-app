import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';

export const MS_GRAPH_URL = 'https://graph.microsoft.com/v1.0';

export const msalConfig = {
  // scopeUrl: 'api://xxxxxxx-xxxx-xxxx-a247-6023a95xxxxx/api',
  clientId: '8c4c164b-93be-4333-8518-615cd153646b',
  tenantName: '3260ea4d-aa20-465a-a197-28afd38975aa',
  scopes: ['openid', 'profile', 'User.Read', 'Sites.FullControl.All'],
  appUrl: 'http://localhost:4200',
  location: 'localStorage',
  graphUrl: MS_GRAPH_URL,
};

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export function MSALInsanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: msalConfig.clientId,
      authority: `https://login.microsoftonline.com/${msalConfig.tenantName}`,
      redirectUri: msalConfig.appUrl,
      postLogoutRedirectUri: msalConfig.appUrl,
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: isIE,
    },
  });
}
