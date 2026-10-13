---
status: implemented
created: 2026-10-13
parent: 2026-09-17-gip-oko-demo-ui-theme-design.md
---

# gip-oko-demo — закрытие overlay sidenav свайпом по backdrop

> **Parent:** [ui-theme as-is](./2026-09-17-gip-oko-demo-ui-theme-design.md). As-is уже содержит жест: ui-theme (sidenav) и `.cursor/skills/gip-oko-demo-a11y-touch/SKILL.md`. Плана Superpowers нет (реализация в сессии). **Скилы:** `.cursor/skills/gip-oko-demo-a11y-touch/SKILL.md`, `.cursor/skills/gip-oko-demo-angular-ui/SKILL.md`.

**Цель:** когда левая панель в `mode=over` и открыта, закрывать её одним пальцем свайпом влево по затемнённому `.mat-drawer-backdrop` (тот же слой, что клик-закрытие). Полоска-edge для открытия не меняется.

**Non-goals:** трекпад / PointerEvent / `maxTouchPoints`; свайп по самой панели (табы, `drawings-list`); свайп вправо по backdrop (открытие); слушатель на `document`; `preventDefault` на `touchmove` всего `document`; смена `disableClose` / `side` / `wideMobile`.

## Когда

Только если sidenav overlay и открыт: `tabletLayout` ≤767 **или** (`isMobile` и не `wideMobile`). Это уже даёт `hasBackdrop`, `mode=over`, `disableClose=false`. В `side` backdrop нет — жеста нет.

Клик по backdrop по-прежнему закрывает через Material. Тач только `TouchEvent`, один палец.

## Жест

Порог как у `.gip-oko-demo-main-sidenav-edge-swipe`: `dx ≥ 48` влево и `dx > |dy|`. Вертикаль и второй палец — игнор.

Слушатели `touchstart` / `touchmove` / `touchend` / `touchcancel` на элементе `.mat-drawer-backdrop` внутри `mat-sidenav-container`. Вешать, когда overlay открыт; снимать при close/destroy. Не на `document`. Панель и полоска edge своих новых слушателей не получают.

Закрывать на **`touchend`**, если порог уже набран в `touchmove`. Если закрыть на `move`, backdrop уйдёт из-под пальца и ghost-click попадёт в карту. На этом `touchend` — `preventDefault` только если `event.cancelable` (`passive: false`). Chrome часто отдаёт `touchend` с `cancelable=false` (жест уже как scroll) — безусловный `preventDefault` даёт Intervention. На незасчитанном тапе `preventDefault` не звать — Material-клик должен закрыть. На `touchmove` document — не звать. `.mat-drawer-backdrop` — `touch-action: none`.

Свайп вправо по backdrop — no-op. Открытие — только текущая полоска слева.

## Код

`Planet`: `ViewChild` контейнера, `effect` + `untracked` на `sidenavOpened()` и overlay-условие, `querySelector('.mat-drawer-backdrop')`, те же пороги что edge-swipe (общий хелпер ок, отдельный сервис нет). Zoneless / OnPush как сейчас.

## Тесты

`planet.spec.ts`, `provideZonelessChangeDetection()`. Overlay открыт → свайп влево по backdrop (вызов тех же методов/хелпера) → `sidenav.opened === false`. Вертикаль и два пальца не закрывают. Существующие тесты edge-swipe (открытие вправо, не открывать вертикалью / вторым пальцем) не ломать.

## As-is после реализации

В ui-theme (абзац sidenav) и в `gip-oko-demo-a11y-touch` (буллет «Свайп sidenav»): при открытом overlay свайп влево по `.mat-drawer-backdrop` закрывает; порог 48px; close на `touchend`; не `document`.
