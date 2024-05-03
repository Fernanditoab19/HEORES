import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class HeroService {
  
  private heroesUrl = 'api/heroes';  // URL de la API de los héroes

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes desde el servidor */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('heroes obtenidos')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /** GET héroe por id. Retorna `undefined` si no se encuentra el id */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // retorna un array {0|1} elemento
        tap(h => {
          const outcome = h ? 'obtenido' : 'no encontrado';
          this.log(`${outcome} héroe id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /** GET héroe por id. Devolverá 404 si no se encuentra el id */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`héroe obtenido id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /* GET héroes cuyo nombre contiene el término de búsqueda */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // si no hay término de búsqueda, retornar un arreglo de héroes vacío
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`héroes encontrados coincidiendo con "${term}"`) :
         this.log(`no se encontraron héroes coincidiendo con "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  //////// Métodos de guardado //////////

  /** POST: añadir un nuevo héroe al servidor */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`añadido héroe con id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: eliminar el héroe del servidor */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`eliminado héroe id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /** PUT: actualizar el héroe en el servidor */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`actualizado héroe id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Maneja la operación Http que falló.
   * Permite que la aplicación continúe.
   *
   * @param operation - nombre de la operación que falló
   * @param result - valor opcional para retornar como resultado del observable
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: enviar el error a una infraestructura de registro remota
      console.error(error); // registrar en la consola en su lugar

      // TODO: mejorar la transformación del error para el consumo del usuario
      this.log(`${operation} falló: ${error.message}`);

      // Permite que la aplicación continúe ejecutándose retornando un resultado vacío.
      return of(result as T);
    };
  }

  /** Registrar un mensaje del servicio HeroService con MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
