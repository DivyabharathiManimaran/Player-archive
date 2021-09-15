import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { PlayerDetails, PlayerInfo } from "../models/player";

@Injectable({
    providedIn: "root"
})

export class HomeComponentService {
    constructor( private readonly http: HttpClient) {}

    getPlayerData(name: string) {
        return this.http.get<PlayerInfo>(`assets/jsons/player-data/${name}.json`);
    }
    getPlayerProfile(profileId: string) {
        return this.http.get<PlayerDetails>(`assets/jsons/player-profile/${profileId}`);
    }


}
