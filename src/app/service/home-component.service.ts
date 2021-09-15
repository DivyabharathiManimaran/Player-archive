import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { PlayerDetails, PlayerInfo } from "../models/player";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class HomeComponentService {
    constructor( private readonly http: HttpClient) {}

    getPlayerData(name: string): Observable<PlayerInfo> {
        return this.http.get<PlayerInfo>(`assets/jsons/player-data/${name}.json`);
    }
    getPlayerProfile(profileId: string): Observable<PlayerDetails> {
        return this.http.get<PlayerDetails>(`assets/jsons/player-profile/${profileId}`);
    }


}
