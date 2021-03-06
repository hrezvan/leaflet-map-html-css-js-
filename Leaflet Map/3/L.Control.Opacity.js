(L.Control.Opacity = L.Control.extend({
  options: { collapsed: !1, position: "topright", label: null },
  initialize: function (t, e) {
    for (var i in (L.Util.setOptions(this, e),
    (this._layerControlInputs = []),
    (this._layers = []),
    (this._lastZIndex = 0),
    (this._handlingClick = !1),
    t))
      this._addLayer(t[i], i, !0);
  },
  onAdd: function (t) {
    return this._initLayout(), this._update(), this._container;
  },
  expand: function () {
    L.DomUtil.addClass(this._container, "leaflet-control-layers-expanded"),
      (this._form.style.height = null);
    var t = this._map.getSize().y - (this._container.offsetTop + 50);
    return (
      t < this._form.clientHeight
        ? (L.DomUtil.addClass(this._form, "leaflet-control-layers-scrollbar"),
          (this._form.style.height = t + "px"))
        : L.DomUtil.removeClass(this._form, "leaflet-control-layers-scrollbar"),
      this
    );
  },
  collapse: function () {
    return (
      L.DomUtil.removeClass(this._container, "leaflet-control-layers-expanded"),
      this
    );
  },
  _initLayout: function () {
    var t = "leaflet-control-layers",
      e = (this._container = L.DomUtil.create("div", t)),
      i = this.options.collapsed;
    if (
      (e.setAttribute("aria-haspopup", !0),
      L.DomEvent.disableClickPropagation(e),
      L.DomEvent.disableScrollPropagation(e),
      this.options.label)
    ) {
      var a = L.DomUtil.create("p", t + "-label");
      (a.innerHTML = this.options.label), e.appendChild(a);
    }
    var s = (this._form = L.DomUtil.create("form", t + "-list"));
    i &&
      (this._map.on("click", this.collapse, this),
      L.Browser.android ||
        L.DomEvent.on(
          e,
          { mouseenter: this.expand, mouseleave: this.collapse },
          this
        ));
    var l = (this._layersLink = L.DomUtil.create("a", t + "-toggle", e));
    (l.href = "#"),
      (l.title = "Layers"),
      L.Browser.touch
        ? (L.DomEvent.on(l, "click", L.DomEvent.stop),
          L.DomEvent.on(l, "click", this.expand, this))
        : L.DomEvent.on(l, "focus", this.expand, this),
      i || this.expand(),
      (this._baseLayersList = L.DomUtil.create("div", t + "-base", s)),
      (this._separator = L.DomUtil.create("div", t + "-separator", s)),
      (this._overlaysList = L.DomUtil.create("div", t + "-overlays", s)),
      e.appendChild(s);
  },
  _getLayer: function (t) {
    for (var e = 0; e < this._layers.length; e++)
      if (this._layers[e] && L.Util.stamp(this._layers[e].layer) === t)
        return this._layers[e];
  },
  _addLayer: function (t, e, i) {
    this._layers.push({ layer: t, name: e, overlay: i });
  },
  _update: function () {
    if (!this._container) return this;
    L.DomUtil.empty(this._baseLayersList),
      L.DomUtil.empty(this._overlaysList),
      (this._layerControlInputs = []);
    var t,
      e,
      i,
      a,
      s = 0;
    for (i = 0; i < this._layers.length; i++)
      (a = this._layers[i]),
        this._addItem(a),
        (e = e || a.overlay),
        (t = t || !a.overlay),
        (s += a.overlay ? 0 : 1);
    return (
      this.options.hideSingleBase &&
        ((t = t && s > 1),
        (this._baseLayersList.style.display = t ? "" : "none")),
      (this._separator.style.display = e && t ? "" : "none"),
      this
    );
  },
  _addItem: function (t) {
    var e,
      i = document.createElement("label");
    t.overlay
      ? (((e = document.createElement("input")).type = "range"),
        (e.className = "leaflet-control-layers-range"),
        (e.min = 0),
        (e.max = 100),
        (e.value = 100))
      : (e = this._createRadioElement("leaflet-base-layers", checked)),
      this._layerControlInputs.push(e),
      (e.layerId = L.Util.stamp(t.layer)),
      L.DomEvent.on(e, "click", this._onInputClick, this),
      L.DomEvent.on(e, "touchend", this._onInputClick, this);
    var a = document.createElement("span");
    a.innerHTML = " " + t.name;
    var s = document.createElement("div"),
      l = document.createElement("div");
    return (
      i.appendChild(s),
      s.appendChild(a),
      i.appendChild(l),
      l.appendChild(e),
      (t.overlay ? this._overlaysList : this._baseLayersList).appendChild(i),
      i
    );
  },
  _onInputClick: function () {
    var t,
      e,
      i = this._layerControlInputs;
    this._handlingClick = !0;
    for (var a = i.length - 1; a >= 0; a--)
      (t = i[a]),
        void 0 === (e = this._getLayer(t.layerId).layer)._url ||
          e.setOpacity(t.value / 100);
    (this._handlingClick = !1), this._refocusOnMap();
  },
})),
  (L.control.opacity = function (t, e) {
    return new L.Control.Opacity(t, e);
  });
