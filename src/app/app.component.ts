import { Component } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";

@Component({
  selector: "app-root",
  template: `<h1>{{ title }}</h1>`,
  styles: [],
})
export class AppComponent {
  title = "Hello BATMAN";

  constructor(swUpdate: SwUpdate) {
    console.log("Is Enabled:", swUpdate.isEnabled);

    swUpdate.unrecoverable.subscribe(event => {
      console.warn(
        `An error occurred that we cannot recover from:\n${event.reason}\n\n` +
        'Please reload the page.');
    });

    swUpdate.available.subscribe((event) => {
      console.log("current version is", event.current);
      console.log("available version is", event.available);
      if (confirm("Guncelleme yapilsin mi?")) {
        swUpdate.activateUpdate().then(() => {
          document.location.reload()
        });
      }
    });

    swUpdate.activated.subscribe((event) => {
      console.log("old version was", event.previous);
      console.log("new version is", event.current);
    });
  }
}
