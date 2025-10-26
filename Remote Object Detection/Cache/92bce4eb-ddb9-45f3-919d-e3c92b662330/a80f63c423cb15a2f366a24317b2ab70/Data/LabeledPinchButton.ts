import {Interactable} from "../../../../Components/Interaction/Interactable/Interactable"
import {PinchButton} from "../../../../Components/UI/PinchButton/PinchButton"
import {InteractorEvent} from "../../../../Core/Interactor/InteractorEvent"
import Event, {PublicApi} from "../../../../Utils/Event"
import NativeLogger from "../../../../Utils/NativeLogger"
import {validate} from "../../../../Utils/validate"

const log = new NativeLogger("LabeledPinchButton")

export type LabeledPinchButtonOptions = {
  parent: SceneObject
  prefab: ObjectPrefab
  labels: Texture[]
  toggle?: boolean
  defaultColor?: vec4
  hoverColor?: vec4
  triggerColor?: vec4
}

export class LabeledPinchButton {
  defaultColor: vec4 = this.options.defaultColor || new vec4(0.5, 0.5, 0.5, 1)
  hoverColor: vec4 = this.options.hoverColor || new vec4(0.9, 0.8, 0.2, 1)
  triggerColor: vec4 = this.options.triggerColor || new vec4(0.8, 0.7, 0.2, 1)
  private labeledPinchButtonPrefab: ObjectPrefab
  object: SceneObject
  private isToggle = this.options.toggle ?? false
  toggled = false
  private interactable: Interactable | null
  private pinchButton: PinchButton | null
  private triggerEvent: Event = new Event()
  onTrigger: PublicApi<void> = this.triggerEvent.publicApi()

  private colors: {[index: string]: vec4[]} = {
    default: [this.defaultColor],
    hover: [this.hoverColor],
    trigger: [this.triggerColor],
  }

  transform: Transform
  alpha: number = 1
  private rmv: RenderMeshVisual
  private material: Material
  private baseAlpha: number
  private labels = this.options.labels
  private _labelIndex: number = 0

  constructor(private options: LabeledPinchButtonOptions) {
    this.labeledPinchButtonPrefab = options.prefab
    this.object = this.labeledPinchButtonPrefab.instantiate(null)
    this.interactable = this.object.getComponent(Interactable.getTypeName())
    this.pinchButton = this.object.getComponent(PinchButton.getTypeName())

    validate(this.interactable)
    validate(this.pinchButton)

    this.transform = this.object.getTransform()

    try {
      this.rmv = this.object.getComponent("Component.RenderMeshVisual")
      
      if (!this.rmv || !this.rmv.mainMaterial) {
        print("LabeledPinchButton: No valid RenderMeshVisual or material found")
        return
      }
      
      // Try to clone the material safely
      try {
        this.material = this.rmv.mainMaterial.clone()
      } catch (e) {
        print(`LabeledPinchButton: Failed to clone material: ${e}`)
        return
      }
      
      if (!this.material || !this.material.mainPass) {
        print("LabeledPinchButton: Material has no valid mainPass")
        return
      }
      
      // Safely access mainPass properties
      try {
        this.baseAlpha = this.material.mainPass.alpha as number || 1.0
        this.material.mainPass.icon = this.labels[this.labelIndex]
        this.material.mainPass.hoverColor = this.hoverColor
        this.material.mainPass.isToggle = this.isToggle ? 1 : 0
      } catch (e) {
        print(`LabeledPinchButton: Failed to set material properties: ${e}`)
        return
      }
    } catch (e) {
      print(`LabeledPinchButton: Initialization failed: ${e}`)
      return
    }

    this.rmv.mainMaterial = this.material
    this.object.setParent(this.options.parent)

    this.setupButtonTrigger()

    this.setColor("default")

    this.interactable.onHoverEnter.add(() => {
      if (!this.toggled) {
        this.setColor("hover")
      } else {
        if (this.material && this.material.mainPass) {
          this.material.mainPass.hovered = 1
        }
      }
    })
    this.interactable.onHoverExit.add(() => {
      if (!this.isToggle) {
        this.setColor("default")
      } else {
        if (this.toggled) {
          this.setColor("trigger")
        } else {
          this.setColor("default")
        }
      }
      if (this.material && this.material.mainPass) {
        this.material.mainPass.hovered = 0
      }
    })
  }

  setRenderOrder = (newOrder: number) => {
    this.rmv.setRenderOrder(newOrder)
  }

  setAlpha = (alpha: number) => {
    this.alpha = alpha
    if (this.material && this.material.mainPass) {
      this.material.mainPass.alpha = this.baseAlpha * this.alpha
    }
  }

  setColor = (state: string) => {
    const [color] = this.colors[state]
    if (this.material && this.material.mainPass) {
      this.material.mainPass.baseColor = color
      if (state === "trigger") {
        this.material.mainPass.triggered = 1
      } else {
        this.material.mainPass.triggered = 0
      }
    }
  }

  setTexture = (labelIndex: number) => {
    this._labelIndex = labelIndex
    if (this.material && this.material.mainPass) {
      this.material.mainPass.icon = this.labels[this._labelIndex]
    }
  }

  get labelIndex() {
    return this._labelIndex
  }

  private setupButtonTrigger = () => {
    validate(this.interactable)

    let isTriggered = false
    this.interactable.onTriggerStart.add((e: InteractorEvent) => {
      e.stopPropagation()
      this.setColor("trigger")
      this.rmv.setBlendShapeWeight("Pinch", 1)
      isTriggered = true
    })
    this.interactable.onTriggerEnd.add((e: InteractorEvent) => {
      e.stopPropagation()
      this.rmv.setBlendShapeWeight("Pinch", 0)
      if (isTriggered) {
        this.triggerEvent.invoke()
        if (!this.isToggle) {
          this.setColor("hover")
        } else {
          if (!this.toggled) this.setColor("hover")
        }
      }
      isTriggered = false
    })
    this.interactable.onTriggerCanceled.add(() => {
      this.rmv.setBlendShapeWeight("Pinch", 0)
      isTriggered = false
    })
  }

  setIconScale = (scale: vec2) => {
    if (this.material && this.material.mainPass) {
      this.material.mainPass.iconScale = scale
    }
  }

  getInteractable = () => this.interactable
}
