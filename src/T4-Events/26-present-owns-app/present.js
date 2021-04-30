/**
  * Universidad de La Laguna
  * Escuela Superior de Ingeniería y Tecnología
  * Grado en Ingeniería Informática
  * Programación de Aplicaciones Interactivas
  *
  * @author F. de Sande
  * @since 14.may.2020
  * @desc OO Present. Present Class
  *       The Present holds a reference (#app) to the class that owns this Present
  *       NOTE: This is a BAD Practice! Don't do this.
  */

"use strict";

/** @desc Class to represent a single present */
class Present {
  #containerElement;  /** DOM element that holds the presents */
  #presentSrc;        /** URL of the present image */
  #image;             /** New DOM element to hold the present image */
  #app;               /** The class (App) that holds this (object) present */

  /**
   * @desc Sets up a present object placing it in the page (DOM)
   *       It set up an event listener for the click event on the initial image
   * @param {object} containerElement - The DOM element that will host the button
   * @param {String} presentSrc - URL for the (new) image for this present
   * @param {object} app - The object that owns this present
   */
  constructor(containerElement, presentSrc, app) {
    this.#containerElement = containerElement;
    this.#presentSrc = presentSrc;
    this.#app = app;  // <-- POOR STYLE: DON'T DO THIS:
    
    // Bind event listeners.
    this.openPresent = this.openPresent.bind(this);
    
    // Create image and append to container.
    this.#image = document.createElement('img');
    const INITIAL_IMAGE = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/gift-icon.png';
    this.#image.src = INITIAL_IMAGE;  
    this.#image.addEventListener('click', this.openPresent);
    this.#containerElement.append(this.#image);
  } 
  
  /**
   * @method
   * @desc Listener for the click event on images (presents)
   *       Replaces the initial image with the present (new) image
   *       Removes the click event listener
   * @param {object} event - The event object 
   */
  openPresent(event) {
    this.#image.src = this.#presentSrc;
    this.#image.removeEventListener('click', this.openPresent);
    this.#app.onPresentOpened(); // <-- POOR STYLE: DON'T DO THIS:
  }
}
