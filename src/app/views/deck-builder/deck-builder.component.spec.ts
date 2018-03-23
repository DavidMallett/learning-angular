import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { expect, should } from 'chai';
import { DeckBuilderComponent } from './deck-builder.component';

describe('DeckBuilderComponent', () => {
  let component: DeckBuilderComponent;
  let fixture: ComponentFixture<DeckBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // tslint:disable-next-line:no-unused-expression
    expect(component).to.be.true;
  });
});
