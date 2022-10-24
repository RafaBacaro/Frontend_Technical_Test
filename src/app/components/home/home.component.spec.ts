import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModule } from 'src/app/app.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let data = {
    temperature: 10,
    humidity:  80
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        HttpClientTestingModule, 
        MatDialogModule,
        AppModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} }, 
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the text: 'Madrid'`, () => {

    const de: DebugElement = fixture.debugElement.query(
      By.css('h2')
    );
    const el: Element = de.nativeElement;
    expect(el.textContent).toEqual('MADRID');
    setTimeout(() => {
      expect(el.textContent).not.toEqual('MADRID');
    }, 15000);

  });

  it(`should have the text: 'Temperature'`, () => {

    const de: DebugElement = fixture.debugElement.query(
      By.css('.temperature')
    );
    const el: Element = de.nativeElement;
    expect(el.textContent).toEqual('0ºC');
  });
});
