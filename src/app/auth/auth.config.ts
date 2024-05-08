import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

export const MS_GRAPH_URL = 'https://graph.microsoft.com/v1.0';

export const msalConfig = {
  // scopeUrl: 'api://xxxxxxx-xxxx-xxxx-a247-6023a95xxxxx/api',
  clientId: environment.clientId,
  tenantName: environment.tenantName,
  appUrl: environment.appUrl,
  scopes: ['openid', 'profile', 'User.Read', 'Sites.FullControl.All'],
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
