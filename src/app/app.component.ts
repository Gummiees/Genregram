import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

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
  public percentage: number = 0;
  public loaded: boolean = false;

  private options: any;
  private wavesurfer: WaveSurfer;

  constructor() {}

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
    this.wavesurfer.load('./assets/bensound-thejazzpiano.mp3');
  }

  play() {
    this.wavesurfer.play();
  }

  stop() {
    this.wavesurfer.pause();
  }

  private loadingBar() {
    this.wavesurfer.on('loading', (percentage: number) => (this.percentage = percentage));
    this.wavesurfer.on('waveform-ready', (this.loaded = true));
    this.wavesurfer.on('destroy', (this.loaded = true));
    this.wavesurfer.on('error', (this.loaded = true));
  }
}
