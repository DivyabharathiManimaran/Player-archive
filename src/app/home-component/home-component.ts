import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PlayerDetails, PlayerInfo } from "../models/player";
import { HomeComponentService } from "../service/home-component.service";

@Component({
    selector:"home-component",
    templateUrl:"./home-component.html",
    styleUrls:["./home-component.scss"]
})

export class HomeComponent implements OnInit {

    playerSearchForm !: FormGroup;
    playerNameVal!: string;
    constructor( private readonly homeComponentService: HomeComponentService,
        private readonly fb: FormBuilder ) {
        this.playerSearchForm = this.fb.group({
            playerName: ['',[Validators.pattern("[a-zA-Z][A-Za-z .-]*")]],
        });
    }

    ngOnInit() {
        
    }
    get getForm(){
        return this.playerSearchForm.controls;
    }

    search() {
        if(this.playerNameVal) {
            this.playerNameVal.trim();
            this.homeComponentService.getPlayerData(this.playerNameVal).subscribe((respose : PlayerInfo) => {
                if(respose && respose.active && respose.active === "true") {
                    this.fetchPlayerDetails(respose["profile-id"]);
                } else alert ("No player");
            },()=> {                
            console.log("Something went wrong with the data API");
                alert ("No player");
            });
        }
    }

    fetchPlayerDetails(profileId:string) { 
        this.homeComponentService.getPlayerProfile(profileId).subscribe((response:PlayerDetails) => {
            if(response) {
                const obj = {
                    ID: response.id,
                    ACTIVE: true,
                    AGE: response.profile.age,
                    ROLE: response.profile.role,
                    TEAM: response.profile.team
                }
                console.log(obj);
            } 
        },() => {
            console.log("Something went wrong with the profile API");
        })

    }
    clear() {

    }

}