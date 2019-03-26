import { By } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { MatSlideToggle } from '@angular/material';
import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';

import { TestingModule, TestStore } from '@testing/utils';
import { ConfiguracoesContainerComponent } from '@app/configuracoes';
import {
  ActionConfiguracoesChangeAnimationsElements,
  ActionConfiguracoesChangeAnimationsPage,
  ActionConfiguracoesChangeAutoNightMode,
  ActionConfiguracoesChangeTheme
} from '@app/configuracoes/configuracoes.actions';
import { ConfiguracoesStateModel } from '@app/configuracoes/configuracoes.model';

describe('ConfiguracoesContainerComponent', () => {
  let component: ConfiguracoesContainerComponent;
  let fixture: ComponentFixture<ConfiguracoesContainerComponent>;
  let store: TestStore<ConfiguracoesStateModel>;
  let dispatchSpy;

  const getThemeSelectArrow = () =>
    fixture.debugElement.queryAll(By.css('.mat-select-trigger'))[1];
  const getSelectOptions = () =>
    fixture.debugElement.queryAll(By.css('mat-option'));

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ConfiguracoesContainerComponent],
        imports: [TestingModule]
      }).compileComponents();
    })
  );

  beforeEach(
    inject([Store], (testStore: TestStore<ConfiguracoesStateModel>) => {
      store = testStore;
      store.setState({
        theme: 'DEFAULT-THEME',
        autoNightMode: true,
        pageAnimations: true,
        pageAnimationsDisabled: false,
        elementsAnimations: true,
        language: 'en'
      });
      fixture = TestBed.createComponent(ConfiguracoesContainerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(component.configuracoes.theme).toBe('DEFAULT-THEME');
    expect(component.configuracoes.autoNightMode).toBeTruthy();
    expect(component.configuracoes.pageAnimations).toBeTruthy();
  });

  it('should dispatch change theme action on theme selection', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    getThemeSelectArrow().triggerEventHandler('click', {});

    fixture.detectChanges();

    getSelectOptions()[1].triggerEventHandler('click', {});

    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new ActionConfiguracoesChangeTheme('LIGHT-THEME')
    );
  });

  it('should dispatch change auto night mode on night mode toggle', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.queryAll(By.directive(MatSlideToggle))[0];

    slider.triggerEventHandler('change', { checked: false });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new ActionConfiguracoesChangeAutoNightMode(false)
    );
  });

  it('should dispatch change animations page', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.queryAll(By.directive(MatSlideToggle))[1];

    slider.triggerEventHandler('change', { checked: false });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new ActionConfiguracoesChangeAnimationsPage(false)
    );
  });

  it('should dispatch change animations elements', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.queryAll(By.directive(MatSlideToggle))[2];

    slider.triggerEventHandler('change', { checked: false });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new ActionConfiguracoesChangeAnimationsElements(false)
    );
  });

  it('should disable change animations page when disabled is set in state', () => {
    store.setState({
      theme: 'DEFAULT-THEME',
      autoNightMode: true,
      pageAnimations: true,
      pageAnimationsDisabled: true, // change animations disabled
      elementsAnimations: true,
      language: 'en'
    });
    fixture.detectChanges();

    dispatchSpy = spyOn(store, 'dispatch');
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.queryAll(By.directive(MatSlideToggle))[1];

    slider.triggerEventHandler('change', { checked: false });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });
});
