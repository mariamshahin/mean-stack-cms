import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ITemplateConfig {
  layout: {
    navbar: {
      type: string; // options: Static & Fixed
    };
    sidebar: {
      //Options for Vertical Side menu
      collapsed: boolean; // options: true, false
      size: string; // Options: 'sidebar-lg', 'sidebar-md', 'sidebar-sm'
      backgroundColor: string;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public templateConf: ITemplateConfig = this.setConfigValue();
  templateConfSubject = new BehaviorSubject<ITemplateConfig>(this.templateConf);
  templateConf$ = this.templateConfSubject.asObservable();

  constructor() {}

  setConfigValue() {
    return (this.templateConf = {
      layout: {
        navbar: {
          type: 'Static',
        },
        sidebar: {
          collapsed: false,
          size: 'sidebar-md',
          backgroundColor: 'bluish',
        },
      },
    });
  }

  applyTemplateConfigChange(tempConfig: ITemplateConfig) {
    this.templateConf = Object.assign(this.templateConf, tempConfig);
    this.templateConfSubject.next(this.templateConf);
  }
}
