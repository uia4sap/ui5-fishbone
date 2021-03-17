Fishbone Diagram for UI5
===

## Description
This UI5 control wraps the [Fishbone Diagram](https://github.com/uia4w/uia-fishbone).

* __uia.fishbone.Diagram__ is original implementation without any UI5 dependencies.
  * `uia.fishbone.data(...)` - create the dataset the diagram displays.

* __ui5.fishbone.Fishbone__ is the UI5 wrapper of the uia.fishbone.Diagram.
  * `setData(data)` - data is an object created by `uia.fishbone.data(...)`.

## Build and Text

1. npm install - init the project.

2. npm start - launch test pages.
   
3. npm run build - build the library.



## Example
1. View

    The namespace is `ui5.fishbone`.


    ``` xml
    <mvc:View
            controllerName="your.Controller"
            xmlns:mvc="sap.ui.core.mvc"
            xmlns:fb="ui5.fishbone">
        ...
        <fb:Fishbone 
            id="fishbone1" 
            width="100%" 
            height="600"
            drillEnabled="true"
            drilled="onDrilled"
            nodeClicked="onNodeClicked" />
        ...
    </mvc:View>
    ```

2. Controller

    The namespace is `uia.fishbone`.

    ``` javascript
    // data model, namespace: uia.fishbone
    var quality = uia.fishbone.data("Quality");
    var machine = quality
        .add("Machine")
            .leaf("Mill")
            .leaf("Mixer")
            .leaf("Metal Lathe")

    var method = quality
        .add("Method");

    var material = quality
        .add("Material");
    material
        .leaf("Masonite")
        .add("Marscapone")
            .leaf("Malty")
            .add("Minty")
                .leaf("spearMint")
                .leaf("pepperMint");
    var mainPower = quality
        .add("Main Power")
            .leaf("Manager")
            .leaf("Master's Student")
            .leaf("Magician")
            .leaf("Miner");
    mainPower.add("Magister")
                .leaf("Malpractice");
    mainPower.add("Massage Artist")
        .leaf("Masseuse")
        .leaf("Masseur");
    var measurement = quality
        .add("Measurement")
            .leaf("Malleability");
    var milieu = quality
        .add("Milieu")
        .leaf("Marine");


    this.byId("fishbone1").setData(quality);
    ```



## References

[Fishbone Diagram](https://github.com/uia4w/uia-fishbone)

[UI5Lab Library Simple Example](https://github.com/UI5Lab/UI5Lab-library-simple)