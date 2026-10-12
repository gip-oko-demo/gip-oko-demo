import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { reportError } from '@global/lib/report-error.lib';
// import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  // MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { LightDarkMode } from '@global/components/ui-theme/components/light-dark-mode/light-dark-mode';
import { ThemeColorPalette } from '@global/components/ui-theme/components/theme-color-palette/theme-color-palette';

// import { UserAccountFeatures } from '@global/components/user-account-features/user-account-features';
// import { UserDataService } from '@global/services/user-data-service/user-data.service';

@Component({
  selector: 'main-menu',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,

    // UserAccountFeatures,
    LightDarkMode,
    ThemeColorPalette,
  ],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMenu {
  constructor(
    // private router: Router,
    // protected $userDataService: UserDataService,
  ) {}

  // @ViewChild(UserAccountFeatures) userAccountFeaturesRef: UserAccountFeatures;
  @ViewChild(LightDarkMode) lightDarkModeRef: LightDarkMode;
  @ViewChild(ThemeColorPalette) themeColorPaletteRef: ThemeColorPalette;

  // protected goToLanding() {
  //   this.router.navigate(['/landing']);
  // }

  readonly dialog = inject(MatDialog);
  protected openContacts(_event: MouseEvent): void {
    try {
      // _event.stopPropagation();
      this.dialog.open(ContactsDialog, {
        id: 'AboutProject',
        enterAnimationDuration: 300,
        exitAnimationDuration: 300,
        hasBackdrop: true,
        autoFocus: true,
      });
    } catch (error: unknown) {
      reportError(error);
      throw error;
    }
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  template: `
    <div class="greeting-container">
      <h2 mat-dialog-title>О карте</h2>
      <mat-dialog-content style="text-align: justify;">
        <br />Это карта - малая frontend-ЧАСТЬ ДЕМО
        <a
          href="https://gip-oko-landing.github.io/gip-oko-landing"
          target="_blank"
          rel="noopener noreferrer"
          >ГИП "ОКО"</a
        >, размещенная на бесплатном хостинге Github Pages. В настоящий момент демо-версия ГИП
        "ОКО", включающая в себя серверную часть и работу с реальными данными, находится в ближайших
        планах разработки. <br />По всем вопросам Вы можете обращаться непосредственно к
        <a
          href="https://gip-oko-landing.github.io/gip-oko-landing/#contacts"
          target="_blank"
          rel="noopener noreferrer"
          >разработчикам проекта</a
        >
        <br /><br />
        Текущие возможности данной карты:

        <ul>
          <li>
            Карта мира (OSM) в трех проекциях на выбор: 3D, 2D и перспектива ("Columbus view",
            2.5D);
          </li>
          <li>Расчет географических координат под курсором мыши;</li>
          <li>Выбор системы координат ("WGS-84", "СК-42 м", "СК-42 °", "ПЗ-90.11");</li>
          <li>
            Нанесение на карту меток и простых геометрических фигур с возможностями их экспорта в
            табличный .ods-документ и последующего импорта;
          </li>
          <li>Экспорт / импорт векторных объектов формата .kml (.kmz);</li>
          <li>Линейные и площадные измерения на карте;</li>
          <li>Полное управления камерой;</li>
          <li>Управление темами оформления (светлая/темная, плюс четыре цветовые палитры);</li>
          <li>Полноэкранный режим;</li>
          <li>Снимок экрана (без интерфейса);</li>
          <li>Поддержка мобильных устройств (тачпад).</li>
        </ul>
      </mat-dialog-content>
      <mat-dialog-actions>
        <div class="osm-copyright">
          <p>
            Map data from
            <a
              href="https://www.openstreetmap.org/copyright"
              title="OpenStreetMap copyright rules"
              target="_blank"
              rel="noopener noreferrer"
              >OpenStreetMap</a
            >
          </p>
        </div>
        <button matButton mat-dialog-close cdkFocusInitial>Ok</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: `
    :host {
      .greeting-container {
        background-color: var(--theme-ui-background-color);
      }
      .greeting-container mat-dialog-actions {
        justify-content: space-between;
      }
      .osm-copyright {
        // position: absolute;
        // right: 104px;
        // bottom: 15px;
        // padding-inline: 5px;
        // background-color: var(--theme-ui-background-color);
        // border-radius: 5px;
        // outline: 1px solid var(--theme-outline-color);
        p {
          margin: 0;
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsDialog {
  // readonly dialogRef = inject(MatDialogRef<ContactsDialog>);
}
