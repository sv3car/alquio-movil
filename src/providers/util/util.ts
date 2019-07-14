import {StartPage} from '../../pages/start/start';
export abstract class Util {

  public static goToStart(nav): void {
      nav.push(StartPage);
  }
}
