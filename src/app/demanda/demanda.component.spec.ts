import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandaComponent } from './demanda.component';

describe('DemandaComponent', () => {
  let component: DemandaComponent;
  let fixture: ComponentFixture<DemandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
