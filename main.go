package main

import (
	"github.com/robertkrimen/otto"
	"github.com/t0pep0/marc21"
	"io"
	"io/ioutil"
	"os"
)

const (
	classJS = `

    function VariableSubField(){
      this.Name = "";
      this.Data = "";
    }

    function VariableField() {
      this.Tag = "";
      this.HasIndicators = "";
      this.Indicators = [];
      this.RawData = [];
      this.SubFields = [];
    }

    function Leader() {
        this.Status = "";
        this.Type = "";
        this.BibLevel = "";
        this.ControlType = "";
        this.CharacterEncoding = "";
        this.IndicatorCount = "";
        this.SubfieldCodeCount = "";
        this.EncodingLevel = "";
        this.CatalogingForm = "";
        this.MultipartLevel = "";
        this.LengthOFFieldPort = "";
        this.StartCharPos = "";
        this.LengthImplemenDefine = "";
        this.Undefine = "";
    }

    function MarcRecord(){
      this.Leader = new Leader()
      this.VariableField = []
    };
    `
)

type jsMachine struct {
	otto        *otto.Otto
	source      *marc21.MarcRecord
	destination *marc21.MarcRecord
}

func NewJSMachine(source, destination *marc21.MarcRecord) (js *jsMachine) {
	js = new(jsMachine)
	js.otto = otto.New()
	js.otto.Run(classJS)
	js.otto.Set("LoadSource", js.fillSource)
	js.otto.Set("WriteResult", js.getResult)
	js.source = source
	js.destination = destination
	return js
}

func (js *jsMachine) Run(src string) (err error) {
	_, err = js.otto.Run(src)
	if err != nil {
		return err
	}
	return nil
}

func (js *jsMachine) fillSource(call otto.FunctionCall) otto.Value {
	source := call.Argument(0)
	if !source.IsObject() {
		return otto.FalseValue()
	}
	object := source.Object()
	jsValue, _ := js.otto.Run("new Leader()")
	leader := jsValue.Object()
	//Set leader
	leader.Set("Status", string(js.source.Leader.Status))
	leader.Set("Type", string(js.source.Leader.Type))
	leader.Set("BibLevel", string(js.source.Leader.BibLevel))
	leader.Set("ControlType", string(js.source.Leader.ControlType))
	leader.Set("CharacterEncoding", string(js.source.Leader.CharacterEncoding))
	leader.Set("IndicatorCount", string(js.source.Leader.IndicatorCount))
	leader.Set("SubfieldCodeCount", string(js.source.Leader.SubfieldCodeCount))
	leader.Set("EncodingLevel", string(js.source.Leader.EncodingLevel))
	leader.Set("CatalogingForm", string(js.source.Leader.CatalogingForm))
	leader.Set("MultipartLevel", string(js.source.Leader.MultipartLevel))
	leader.Set("LengthOFFieldPort", string(js.source.Leader.LengthOFFieldPort))
	leader.Set("StartCharPos", string(js.source.Leader.StartCharPos))
	leader.Set("LengthImplemenDefine", string(js.source.Leader.LengthImplemenDefine))
	leader.Set("Undefine", string(js.source.Leader.Undefine))
	object.Set("Leader", leader)
	jsValue, _ = object.Get("VariableField")
	jsVariableField := jsValue.Object()
	for _, vf := range js.source.VariableFields {
		jsValue, _ := js.otto.Run("new VariableField()")
		vfJS := jsValue.Object()
		vfJS.Set("Tag", vf.Tag)
		vfJS.Set("HasIndicators", vf.HasIndicators)
		jsValue, _ = vfJS.Get("Indicators")
		jsIndicators := jsValue.Object()
		for _, ind := range vf.Indicators {
			indJs, _ := otto.ToValue(string(ind))
			jsIndicators.Call("push", indJs)
		}
		jsValue, _ = vfJS.Get("RawData")
		jsRawData := jsValue.Object()
		for _, raw := range vf.RawData {
			rawJs, _ := otto.ToValue(string(raw))
			jsRawData.Call("push", rawJs)
		}
		jsValue, _ = vfJS.Get("SubFields")
		jsSubFields := jsValue.Object()
		for _, sf := range vf.Subfields {
			jsValue, _ := js.otto.Run("new VariableSubField()")
			sfJs := jsValue.Object()
			sfJs.Set("Name", sf.Name)
			sfJs.Set("Data", string(sf.Data))
			jsSubFields.Call("push", sfJs)
		}
		jsVariableField.Call("push", vfJS)
	}
	return otto.TrueValue()
}

func (js *jsMachine) getResult(call otto.FunctionCall) otto.Value {
	source := call.Argument(0)
	if !source.IsObject() {
		return otto.FalseValue()
	}
	object := source.Object()
	jsValue, _ := object.Get("Leader")
	if !jsValue.IsObject() {
		return otto.FalseValue()
	}
	//Read Leader
	leader := jsValue.Object()
	jsValue, _ = leader.Get("Status")
	js.destination.Leader = new(marc21.Leader)
	js.destination.Leader.Status = jsValue.String()[0]
	jsValue, _ = leader.Get("Type")
	js.destination.Leader.Type = jsValue.String()[0]
	jsValue, _ = leader.Get("BibLevel")
	js.destination.Leader.BibLevel = jsValue.String()[0]
	jsValue, _ = leader.Get("ControlType")
	js.destination.Leader.ControlType = jsValue.String()[0]
	jsValue, _ = leader.Get("CharacterEncoding")
	js.destination.Leader.CharacterEncoding = jsValue.String()[0]
	jsValue, _ = leader.Get("IndicatorCount")
	js.destination.Leader.IndicatorCount = jsValue.String()[0]
	jsValue, _ = leader.Get("SubfieldCodeCount")
	js.destination.Leader.SubfieldCodeCount = jsValue.String()[0]
	jsValue, _ = leader.Get("EncodingLevel")
	js.destination.Leader.EncodingLevel = jsValue.String()[0]
	jsValue, _ = leader.Get("CatalogingForm")
	js.destination.Leader.CatalogingForm = jsValue.String()[0]
	jsValue, _ = leader.Get("MultipartLevel")
	js.destination.Leader.MultipartLevel = jsValue.String()[0]
	jsValue, _ = leader.Get("LengthOFFieldPort")
	js.destination.Leader.LengthOFFieldPort = jsValue.String()[0]
	jsValue, _ = leader.Get("StartCharPos")
	js.destination.Leader.StartCharPos = jsValue.String()[0]
	jsValue, _ = leader.Get("LengthImplemenDefine")
	js.destination.Leader.LengthImplemenDefine = jsValue.String()[0]
	jsValue, _ = leader.Get("Undefine")
	js.destination.Leader.Undefine = jsValue.String()[0]
	//Get VariableFields
	jsValue, _ = object.Get("VariableField")
	jsVariableFields := jsValue.Object()
	jsVariableFields.Call("forEach", func(call otto.FunctionCall) otto.Value {
		jsValue = call.Argument(0)
		if !jsValue.IsObject() {
			return otto.Value{}
		}
		vfJS := jsValue.Object()
		vf := new(marc21.VariableField)
		jsValue, _ = vfJS.Get("Tag")
		vf.Tag = jsValue.String()
		jsValue, _ = vfJS.Get("HasIndicators")
		vf.HasIndicators, _ = jsValue.ToBoolean()
		if vf.HasIndicators {
			jsValue, _ = vfJS.Get("Indicators")
			jsIndicators := jsValue.Object()
			jsIndicators.Call("forEach", func(call otto.FunctionCall) otto.Value {
				vf.Indicators = append(vf.Indicators, call.Argument(0).String()[0])
				return otto.Value{}
			})
		}
		jsValue, _ = vfJS.Get("RawData")
		jsRawData := jsValue.Object()
		jsRawData.Call("forEach", func(call otto.FunctionCall) otto.Value {
			vf.RawData = append(vf.RawData, call.Argument(0).String()[0])
			return otto.Value{}
		})
		jsValue, _ = vfJS.Get("SubFields")
		jsSubFields := jsValue.Object()
		jsSubFields.Call("forEach", func(call otto.FunctionCall) otto.Value {
			jsValue = call.Argument(0)
			if !jsValue.IsObject() {
				return otto.Value{}
			}
			sfJs := jsValue.Object()
			sf := new(marc21.SubField)
			jsValue, _ = sfJs.Get("Name")
			sf.Name = jsValue.String()
			jsValue, _ = sfJs.Get("Data")
			sf.Data = []byte(jsValue.String())
			vf.Subfields = append(vf.Subfields, sf)
			return otto.Value{}
		})
		if len(vf.Subfields) == 0 && len(vf.RawData) == 0 {
			return otto.Value{}
		}
		js.destination.VariableFields = append(js.destination.VariableFields, vf)
		return otto.Value{}
	})
	return otto.TrueValue()
}

func main() {
	marcFile, err := os.Open(os.Args[1])
	outFile, _ := os.Create(os.Args[2])
	jsFile, _ := os.Open(os.Args[3])
	jsBytes, _ := ioutil.ReadAll(jsFile)
	jsRules := string(jsBytes)
	if err != nil {
		return
	}
	for {
		rec, err := marc21.ReadRecord(marcFile)
		if err != nil {
			if err == io.EOF {
				break
			}
			panic(err)
		}
		if rec == nil {
			break
		}
		res := new(marc21.MarcRecord)

		js := NewJSMachine(rec, res)
		err = js.Run(jsRules)
		if err != nil {
			panic(err)
		}
		res.Write(outFile)
	}

}
