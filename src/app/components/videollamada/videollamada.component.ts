import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
declare var JitsiMeetExternalAPI: any;

@Component({
    selector: 'app-videollamada',
    templateUrl: './videollamada.component.html',
    styleUrls: ['./videollamada.component.css']
})
export class VideollamadaComponent implements OnInit, AfterViewInit {

    title = 'jitsi-meet';
    domain: string = 'proyectofinal.website';
    room: any;
    options: any;
    api: any | undefined;

    isAudioMuted = false;
    isVideoMuted = false;

    usuario: Usuario=new Usuario("prueba","prueba@talk2gether.com","foto");

    constructor(
        private router: Router, 
        private usuarioService: UsuarioService,
        private route: ActivatedRoute, 
    ) { }

    ngOnInit(): void {
        const id=this.obtenerParametro("id");
        //this.usuario=this.obtenerUsuario(id);
        this.obtenerUsuario(id);
        //setTimeout(() => {
        //this.cargarReunion();
        //}, 3000)

    }

    cargarReunion(): void {
        this.options = {
            roomName: 'master',
            width: 900,
            height: 500,
            configOverwrite: { prejoinPageEnabled: false },
            parentNode: document.querySelector('#meet'),
            userInfo: {
                email: this.usuario.correo,
                displayName: this.usuario.nombre,
            }
        }

        this.api = new JitsiMeetExternalAPI(this.domain, this.options);

        this.api.executeCommand('avatarUrl', this.usuario.urlFoto);

        this.api.addEventListeners({
            readyToClose: this.handleClose,
            participantLeft: this.handleParticipantLeft,
            participantJoined: this.handleParticipantJoined,
            videoConferenceJoined: this.handleVideoConferenceJoined,
            videoConferenceLeft: this.handleVideoConferenceLeft,
            audioMuteStatusChanged: this.handleMuteStatus,
            videoMuteStatusChanged: this.handleVideoStatus
        });
    }

    ngAfterViewInit(): void {
    }



    obtenerParametro(nombreParametro: string): number {
        var id=0;
        this.route.paramMap.subscribe(params => {
          id = Number(params.get(nombreParametro));
          console.log("El valor del parametro es: " + id);
        })
        return id;
      }
    
      obtenerUsuario(id: number) {
        if(id!=0){
        this.usuarioService.findOneG(id).subscribe(res =>{
          if(res.body){
            this.usuario=new Usuario(res.body.nombre, res.body.correo, res.body.urlFoto);
          }
          this.cargarReunion();
           })}
       
      }


    handleClose = () => {
        console.log("handleClose");
    }

    handleParticipantLeft = async (participant: any) => {
        console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
        const data = await this.getParticipants();
        console.log(data);
    }

    handleParticipantJoined = async (participant: any) => {
        console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
        const data = await this.getParticipants();
    }

    handleVideoConferenceJoined = async (participant: any) => {
        console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
        const data = await this.getParticipants();
    }

    handleVideoConferenceLeft = () => {
        console.log("handleVideoConferenceLeft");

        this.router.navigate(['/thanks']);
    }

    handleMuteStatus = (audio: any) => {
        console.log("handleMuteStatus", audio); // { muted: true }
    }

    handleVideoStatus = (video: any) => {
        console.log("handleVideoStatus", video); // { muted: true }
    }

    getParticipants() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.api.getParticipantsInfo()); // get all participants
            }, 500)
        });
    }

    // custom events
    executeCommand(command: string) {
        this.api.executeCommand(command);;
        if (command == 'hangup') {
            this.router.navigate(['/thanks']);
            return;
        }

        if (command == 'toggleAudio') {
            this.isAudioMuted = !this.isAudioMuted;
        }

        if (command == 'toggleVideo') {
            this.isVideoMuted = !this.isVideoMuted;
        }
    }
}