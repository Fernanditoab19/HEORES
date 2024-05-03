import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Importa módulo para pruebas de enrutamiento
import { of } from 'rxjs'; // Importa la función "of" de RxJS

import { HeroSearchComponent } from '../hero-search/hero-search.component'; // Importa componente relacionado
import { HeroService } from '../hero.service'; // Importa el servicio HeroService
import { HEROES } from '../mock-heroes'; // Importa héroes de muestra

import { DashboardComponent } from './dashboard.component'; // Importa el componente a probar

describe('DashboardComponent', () => {
  let component: DashboardComponent; // Declara variable para el componente
  let fixture: ComponentFixture<DashboardComponent>; // Declara variable para el fixture
  let heroService; // Declara variable para el servicio HeroService
  let getHeroesSpy: jasmine.Spy; // Declara variable para el espía de la función getHeroes

  beforeEach(waitForAsync(() => {
    heroService = jasmine.createSpyObj('HeroService', ['getHeroes']); // Crea un espía del servicio HeroService
    getHeroesSpy = heroService.getHeroes.and.returnValue(of(HEROES)); // Crea un espía para la función getHeroes que devuelve un observable con héroes de muestra
    TestBed.configureTestingModule({
        declarations: [DashboardComponent, HeroSearchComponent], // Declara los componentes que se utilizan en las pruebas
        imports: [RouterTestingModule.withRoutes([])], // Importa el módulo para pruebas de enrutamiento
        providers: [{provide: HeroService, useValue: heroService}] // Proporciona el servicio HeroService al componente de prueba
      })
      .compileComponents(); // Compila los componentes

    fixture = TestBed.createComponent(DashboardComponent); // Crea un nuevo componente a partir del fixture
    component = fixture.componentInstance; // Asigna el componente del fixture a la variable "component"
    fixture.detectChanges(); // Realiza la detección de cambios en el fixture
  }));

  it('should be created', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se haya creado correctamente
  });

  it('should display "Top Heroes" as headline', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual('Top Heroes'); // Verifica que el encabezado muestre "Top Heroes"
  });

  it('should call heroService', waitForAsync(() => {
    expect(getHeroesSpy.calls.any()).toBe(true); // Verifica que se haya llamado al servicio HeroService para obtener los héroes
  }));

  it('should display 4 links', waitForAsync(() => {
    expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4); // Verifica que se muestren 4 enlaces
  }));
});
