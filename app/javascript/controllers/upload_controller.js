import { Controller } from "@hotwired/stimulus"
import { DirectUpload } from "@rails/activestorage"
import { metaContent, insertAfter, removeElement } from "helpers/dom_helpers"

export default class extends Controller {
  static targets = ["input", "submit"]

  dropFiles({detail: { files }}) {
    const file = files[0]

    if (file) {
      this.hiddenInput = this.#createHiddenInput()

      const directUpload = new DirectUpload(file, this.url, this)

      directUpload.create((error, blob) => {
        if (error) {
          removeElement(this.hiddenInput)
        } else {
          this.hiddenInput.value = blob.signed_id
          this.dispatch("complete", { detail: { form: this.element }})
        }
      })
    }
  }

  submit({detail: { form }}) {
    form.requestSubmit()
  }

  get url() { return this.inputTarget.dataset.directUploadUrl }

  get headers() { return { "X-CSRF-Token": metaContent("csrf-token") } }

  directUploadWillStoreFileWithXHR(xhr) {
    xhr.upload.addEventListener("progress", event => this.#uploadProgress(event))
  }

  #uploadProgress(event) {
    if (event.lengthComputable) {
      const percent = Math.round((event.loaded / event.total) * 100)
      this.#progressCallback(percent)
    }
  }

  #createHiddenInput() {
    const input = document.createElement("input")
    input.type = "hidden"
    input.name = this.inputTarget.name
    insertAfter(input, this.inputTarget)
    return input
  }

  #progressCallback(percent) {
    // Update the DOM with this value to give upload progress feedback
    percent
  }
}
