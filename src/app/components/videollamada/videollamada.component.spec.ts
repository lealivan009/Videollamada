import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideollamadaComponent } from './videollamada.component';

describe('VideollamadaComponent', () => {
  let component: VideollamadaComponent;
  let fixture: ComponentFixture<VideollamadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideollamadaComponent]
    });
    fixture = TestBed.createComponent(VideollamadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
