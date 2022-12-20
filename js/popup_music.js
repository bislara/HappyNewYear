/**
 * Dialog module.
 * @module dialog.js
 * @version 1.0.0
 * @summary 02-01-2022
 * @author Mads Stoumann
 * @description Custom versions of `alert`, `confirm` and `prompt`, using `<dialog>`
 */

var playMusic = false;

class Dialog {
    constructor(settings = {}) {
      this.settings = Object.assign(
        {
          accept: 'Play',
          bodyClass: 'dialog-open',
          cancel: 'Cancel',
          dialogClass: '',
          message: '',
          template: ''
        },
        settings
      )
      this.init()
    }

    getFocusable() {
      return [...this.dialog.querySelectorAll('button,[href],select,textarea,input:not([type="hidden"]),[tabindex]:not([tabindex="-1"])')]
    }
  
    init() {
      this.dialogSupported = typeof HTMLDialogElement === 'function'
      this.dialog = document.createElement('dialog')
      this.dialog.role = 'dialog'
      this.dialog.dataset.component = this.dialogSupported ? 'dialog' : 'no-dialog';
      this.dialog.innerHTML = `
      <form method="dialog" data-ref="form">
        <fieldset data-ref="fieldset" role="document">
          <legend data-ref="message" id="${(Math.round(Date.now())).toString(36)}"></legend>
          <div data-ref="template"></div>
        </fieldset>
        <menu>
          <button${this.dialogSupported ? '' : ` type="button"`} data-ref="cancel" value="cancel"></button>
          <button${this.dialogSupported ? '' : ` type="button"`} data-ref="accept" value="default"></button>
        </menu>
      </form>`
      document.body.appendChild(this.dialog)
  
      this.elements = {}
      this.dialog.querySelectorAll('[data-ref]').forEach(el => this.elements[el.dataset.ref] = el)
      this.dialog.setAttribute('aria-labelledby', this.elements.message.id)
      this.elements.cancel.addEventListener('click', () => { this.dialog.dispatchEvent(new Event('cancel')) })
      this.dialog.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          if (!this.dialogSupported) e.preventDefault()
          this.elements.accept.dispatchEvent(new Event('click'))
        }
        if (e.key === 'Escape') this.dialog.dispatchEvent(new Event('cancel'))
        if (e.key === 'Tab') {
          e.preventDefault()
        //   const len =  this.focusable.length - 1;
        //   let index = this.focusable.indexOf(e.target);
        //   index = e.shiftKey ? index - 1 : index + 1;
        //   if (index < 0) index = len;
        //   if (index > len) index = 0;
        //   this.focusable[index].focus();
        }
      })
      this.toggle()
    }
  
    open(settings = {}) {
      const dialog = Object.assign({}, this.settings, settings)
      this.dialog.className = dialog.dialogClass || ''
      this.elements.accept.innerText = dialog.accept
      this.elements.cancel.innerText = dialog.cancel
      this.elements.cancel.hidden = dialog.cancel === ''
      this.elements.message.innerText = dialog.message
      this.elements.target = dialog.target || ''
      this.elements.template.innerHTML = dialog.template || ''
  
    //   this.focusable = this.getFocusable()
      this.hasFormData = this.elements.fieldset.elements.length > 0
  
      this.toggle(true)
  
    }
  
    toggle(open = false) {
      if (this.dialogSupported && open) this.dialog.showModal();
      if (!this.dialogSupported) {
        document.body.classList.toggle(this.settings.bodyClass, open)
        this.dialog.hidden = !open
        if (this.elements.target && !open) {
          this.elements.target.focus()
        }
      }
    }
  
    waitForUser() {
      return new Promise(resolve => {
        this.dialog.addEventListener('cancel', (ev) => { 
          resolve(false)
          ev.stopPropagation();
        }, { once: true })
        this.elements.accept.addEventListener('click', (ev) => {
          resolve(true);
          ev.stopPropagation();
        }, { once: true })
      })
    }
    
    confirm(message, config = { }) {
      const settings = Object.assign({}, config, { message, template: '' })
      console.log(settings)
      this.open(settings)
      return this.waitForUser();
    }
  }
  
  /* FOR DEMO */
  const dialog = new Dialog();

  dialog.confirm('Confirm to play music!').then((res) => {  
    if(res)
    {
        console.log("Music can start");
        var music_player = document.querySelector("#music_list audio");
        music_player.play();
        playMusic = true;
    }
    else{
    console.log(res) 
    }
})

$('html').click(function(e) {   
    var list = document.getElementsByTagName("dialog")[0];
    list.remove()
    // list.removeAttribute("open");
    // list.dispatchEvent(new Event('cancel'));
    // dialog.toggle();    
 }); 
