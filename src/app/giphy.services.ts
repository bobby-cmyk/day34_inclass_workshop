import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom, map, Subject, tap } from "rxjs";
import { API_KEY, BUNDLE, LANG, OFFSET, SEARCH_ENDPOINT } from "./constants";
import { SearchCriteria } from "./models";

@Injectable()
export class GiphyService {
    private http = inject(HttpClient)

    private url:string = SEARCH_ENDPOINT

    searchResults = new Subject<string[]>()

    searchGifs(search:SearchCriteria): Promise<string[]> {
        const queryParams = new HttpParams()
            .set("api_key", API_KEY)
            .set("q", search.q)
            .set("limit", search.limit)
            .set("offset", OFFSET)
            .set("rating", search.rating)
            .set("lang", LANG)
            .set("bundle", BUNDLE)

        return firstValueFrom(
            this.http.get<any>(this.url, {params: queryParams})
            // Doing everything inside observable
            .pipe(
                map(result => result['data']),
                map((data: any[]) => data.map((g: any) => g.images.fixed_height.url)),
                tap(images => this.searchResults.next(images)))
        )
    }
}