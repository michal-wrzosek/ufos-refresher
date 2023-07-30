// styled.d.ts
import 'styled-components';
import { CustomTheme } from '../styles/theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends CustomTheme {}
}
