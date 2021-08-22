import { trigger, state, style, transition, animate } from "@angular/animations";
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { DisplayProfile, PlayerDetails, PlayerInfo } from "../models/player";
import { HomeComponentService } from "../service/home-component.service";

@Component({
    selector:"home-component",
    templateUrl:"./home-component.html",
    styleUrls:["./home-component.scss"],
    animations: [
        trigger('appearIn', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('600ms', style({ opacity: 1 })),
              ]),
        ]),
      ]
})

export class HomeComponent implements OnInit {

    playerSearchForm !: FormGroup;
    playerNameVal!: string;
    active:boolean = false;
    showResult:boolean = false;
    displayDetail?:DisplayProfile;
    showSearch: boolean = false;

    constructor( private readonly homeComponentService: HomeComponentService,
        private cdr: ChangeDetectorRef,
        private readonly fb: FormBuilder ) {
        this.playerSearchForm = this.fb.group({
            playerName: new FormControl('',Validators.pattern("[a-zA-Z][a-zA-Z0-9 ]*")),
        });
    }

    ngOnInit() {}

    ngAfterViewInit() {
        setTimeout(()=> {
            this.showSearch = true;
        },600);
        this.cdr.detectChanges();
    }

    get getForm(){
        return this.playerSearchForm.controls;
    }

    search() {
        if(this.playerNameVal) {
            this.playerNameVal = this.playerNameVal.trim();
            this.homeComponentService.getPlayerData(this.playerNameVal.toLowerCase()).subscribe((playerInfo : PlayerInfo) => {
                this.showResult=true;
                if(playerInfo && playerInfo.active && playerInfo.active === "true") {
                    this.fetchPlayerDetails(playerInfo["profile-id"]);
                } else {
                    this.active=false;
                }
            },()=> {
                this.showResult=true;
                this.active=false;          
                console.log("Something went wrong with the PLAYER DATA API");
            });
        }
    }

    fetchPlayerDetails(profileId:string) { 
        this.homeComponentService.getPlayerProfile(profileId).subscribe((playerDetails:PlayerDetails) => {
            if(playerDetails) {
                this.active=true;
                this.displayDetail = {
                    id: playerDetails.id,
                    active: 'true',
                    age: playerDetails.profile.age,
                    role: playerDetails.profile.role,
                    team: playerDetails.profile.team
                }
                console.log(this.displayDetail);
            } 
        },() => {
            console.log("Something went wrong with the PLAYER PROFILE API");
        })

    }
    clear() {

    }

}