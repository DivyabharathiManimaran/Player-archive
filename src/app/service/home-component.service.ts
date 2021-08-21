import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { PlayerDetails, PlayerInfo } from "../models/player";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class HomeComponentService {
    constructor( private readonly http: HttpClient) {}

    getPlayerData(name: string) {
        return this.http.get<PlayerInfo>(`https://web-sandbox.onefootball.com/assignments/player/data/${name}.json`);
    }
    getPlayerProfile(profileId: string) {
        return this.http.get<PlayerDetails>(`https://web-sandbox.onefootball.com/assignments/player/profile/${profileId}`);
    }


}