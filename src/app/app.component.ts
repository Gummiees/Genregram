import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as ColorMap from 'colormap';
import * as WaveSurfer from 'wavesurfer.js';
import * as SpectrogramPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.min.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  public title: string = 'Genregram';

  private options: any;
  private wavesurfer: WaveSurfer;

  @ViewChild('progressBar', { static: false }) el: ElementRef;

  constructor(private rd: Renderer2, private http: HttpClient) {
  }

  ngAfterViewInit() {
    this.initAndLoadSpectogram(this.generateColorMap());
  }

  private generateColorMap(): any {
    return ColorMap({
      colormap: 'hot',
      nshades: 256,
      format: 'float'
    });
  }

  private initAndLoadSpectogram(colorMap: any) {
    this.options = {
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'purple',
      loaderColor: 'purple',
      cursorColor: 'navy',
      plugins: [
        SpectrogramPlugin.create({
          container: '#wave-spectrogram',
          labels: true,
          colorMap: colorMap
        })
      ]
    };
    this.wavesurfer = WaveSurfer.create(this.options);
    this.loadingBar();
    this.wavesurfer.load('./assets/La casa por el tejado.mp3');
  }

  private loadingBar() {
    const showProgress = (percent: number) => {
      this.el.nativeElement.style.display = 'block';
      this.el.nativeElement.style.width = percent + '%';
    };

    const hideProgress = () => this.el.nativeElement.style.display = 'none';

    this.wavesurfer.on('loading', showProgress);
    this.wavesurfer.on('ready', hideProgress);
    this.wavesurfer.on('destroy', hideProgress);
    this.wavesurfer.on('error', hideProgress);
  }

  private getJSON(): Observable<any> {
    return this.http.get("./assets/colormap.json");
  }
}
