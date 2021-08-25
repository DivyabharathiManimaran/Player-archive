import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { HomeComponentService } from "../service/home-component.service";
import { FormsModule } from "@angular/forms";
import { HomeComponent } from "./home-component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const formBuilderStub = () => ({ group: () => ({}) });
    // const formControlStub = () => ({ group: () => ({}) });
    const homeComponentServiceStub = () => ({
      getPlayerData: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      getPlayerProfile: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule, BrowserAnimationsModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: HomeComponentService, useFactory: homeComponentServiceStub },
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  it(`active has default value`, () => {
    expect(component.active).toEqual(false);
  });

  it(`showResult has default value`, () => {
    expect(component.showResult).toEqual(false);
  });

  it(`showSearch has default value`, () => {
    expect(component.showSearch).toEqual(false);
  });

  describe("ngOnInit", () => {
    it("does required operation", () => {
      component.ngOnInit();
      expect(component.playerSearchForm).toBeDefined();
    })
  })

  describe("ngAfterViewInit", () => {
    it("makes expected operations", () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
      spyOn(changeDetectorRefStub, "detectChanges").and.callThrough();
      expect(component.showSearch).toBeFalsy;
      jasmine.clock().install();
      component.ngAfterViewInit();
      jasmine.clock().tick(600);
      expect(component.showSearch).toBeTrue;
      jasmine.clock().uninstall();
    });
  });

  describe("search", () => {
    it("makes player data calls", () => {
      const homeComponentServiceStub: HomeComponentService = fixture.debugElement.injector.get(
        HomeComponentService
      );
      spyOn(component, "fetchPlayerDetails").and.callThrough();
      spyOn(homeComponentServiceStub, "getPlayerData").and.callThrough();
      component.search();
      expect(component.playerNameVal).toBeUndefined();
      expect(component.fetchPlayerDetails).toBeDefined();
      expect(homeComponentServiceStub.getPlayerData).toBeDefined();      
      expect(homeComponentServiceStub.getPlayerData).not.toHaveBeenCalled();
    });
  });

  describe("fetchPlayerDetails", () => {
    it("makes player profile calls", () => {
      const homeComponentServiceStub: HomeComponentService = fixture.debugElement.injector.get(
        HomeComponentService
      );
      spyOn(homeComponentServiceStub, "getPlayerProfile").and.callThrough();
      component.search();      
      expect(homeComponentServiceStub.getPlayerProfile).toBeDefined();      
      expect(homeComponentServiceStub.getPlayerProfile).not.toHaveBeenCalled();
    });
  });
});
