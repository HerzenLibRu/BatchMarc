package main

import (
	"github.com/robertkrimen/otto"
	"github.com/t0pep0/marc21"
	"io/ioutil"
	"os"
	"strconv"
)

func main() {
	marcFile, err := os.Open(os.Args[1])
	outFile, _ := os.Create(os.Args[2])
	jsFile, _ := os.Open(os.Args[3])
	jsBytes, _ := ioutil.ReadAll(jsFile)
	jsRules := string(jsBytes)
	if err != nil {
		return
	}
	mReader := marc21.NewReader(marcFile)

	for {
		rec, err := mReader.ReadRecord()
		if err != nil {
			panic(err)
		}
		if rec == nil {
			break
		}
		vm := otto.New()
		initJS := `

    function VariableSubField(name, data){
      this.Name = name;
      this.Data = data;
    }

    function VariableField(tag, indicatorOne, indicatorTwo) {
      this.Tag = tag;
      this.IndicatorOne = indicatorOne;
      this.IndicatorTwo = indicatorTwo;
      this.RawData = [];
      this.SubField = [];
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

    orig = new MarcRecord();
    res = new MarcRecord();
    `

		for tag, field := range rec.VariableField {
			switch len(field.Indicators) {
			case 0:
				field.Indicators[0] = byte('#')
				field.Indicators[1] = byte('#')
			case 1:
				field.Indicators = append(field.Indicators, byte('#'))
			}
			initJS += "\nindex = orig.VariableField.push(new VariableField(\"" + tag + "\",\"" + string(field.Indicators[0]) + "\",\"" + string(field.Indicators[1]) + "\"));"
			field.Subfields.First()
			sf := field.Subfields
			for sf != nil {
				initJS += "\norig.VariableField[index-1].SubField.push(new VariableSubField(\"" + sf.Name + "\",'" + string(sf.Data) + "'));"
				sf = sf.Next
			}
			for i, arr := range field.RawData {
				initJS += "\norig.VariableField[index-1].RawData[" + strconv.Itoa(i) + "] = [];"
				for j, val := range arr {
					initJS += "\norig.VariableField[index-1].RawData[" + strconv.Itoa(i) + "][" + strconv.Itoa(j) + "]=String.fromCharCode(" + strconv.Itoa(int(val)) + ");"
				}
			}
		}

		initJS += "\norig.Leader.Status = \"" + string(rec.Status) + "\";"
		initJS += "\norig.Leader.Type = \"" + string(rec.Type) + "\";"
		initJS += "\norig.Leader.BibLevel = \"" + string(rec.BibLevel) + "\";"
		initJS += "\norig.Leader.ControlType = \"" + string(rec.ControlType) + "\";"
		initJS += "\norig.Leader.CharacterEncoding = \"" + string(rec.CharacterEncoding) + "\";"
		initJS += "\norig.Leader.IndicatorCount = \"" + string(rec.IndicatorCount) + "\";"
		initJS += "\norig.Leader.SubfieldCodeCount = \"" + string(rec.SubfieldCodeCount) + "\";"
		initJS += "\norig.Leader.EncodingLevel = \"" + string(rec.EncodingLevel) + "\";"
		initJS += "\norig.Leader.CatalogingForm = \"" + string(rec.CatalogingForm) + "\";"
		initJS += "\norig.Leader.MultipartLevel = \"" + string(rec.MultipartLevel) + "\";"
		initJS += "\norig.Leader.LengthOFFieldPort = \"" + string(rec.LengthOFFieldPort) + "\";"
		initJS += "\norig.Leader.StartCharPos= \"" + string(rec.StartCharPos) + "\";"
		initJS += "\norig.Leader.LengthImplemenDefine  = \"" + string(rec.LengthImplemenDefine) + "\";"
		initJS += "\norig.Leader.Undefine  = \"" + string(rec.Undefine) + "\";"

		_, err = vm.Run(initJS)
		if err != nil {
			panic(err)
		}
		_, err = vm.Run(jsRules)
		if err != nil {
			panic(err)
		}

		res := marc21.NewEmptyMarcRecord()

		if value, err := vm.Run("res.Leader.Status"); err == nil {
			if value_str, err := value.ToString(); err == nil {
				res.Status = []byte(value_str)[0]
			}
		}
		if value, err := vm.Run("res.Leader.Type"); err == nil {
			if value_str, err := value.ToString(); err == nil {
				res.Type = []byte(value_str)[0]
			}
		}
		if value, err := vm.Run("res.Leader.BibLevel"); err == nil {
			if value_str, err := value.ToString(); err == nil {
				res.BibLevel = []byte(value_str)[0]
			}
		}
		if value, err := vm.Run("res.Leader.ControlType"); err == nil {
			if value_str, err := value.ToString(); err == nil {
				res.ControlType = []byte(value_str)[0]
			}
		}
		if value, err := vm.Run("res.Leader.CharacterEncoding"); err == nil {
			if value_str, err := value.ToString(); err == nil {
				res.CharacterEncoding = []byte(value_str)[0]
			}
		}
		if value, err := vm.Run("res.Leader.IndicatorCount"); err == nil {
			if value_str, err := value.ToString(); err == nil {
				res.IndicatorCount = []byte(value_str)[0]
			}
		}
		if value, err := vm.Run("res.Leader.SubfieldCodeCount"); err == nil {
			if value_str, err := value.ToString(); err == nil {
				res.SubfieldCodeCount = []byte(value_str)[0]
			}
		}
		if value, err := vm.Run("res.Leader.EncodingLevel"); err == nil {
			if value_str, err := value.ToString(); err == nil {
				res.EncodingLevel = []byte(value_str)[0]
			}
		}
		if value, err := vm.Run("res.Leader.CatalogingForm"); err == nil {
			if value_str, err := value.ToString(); err == nil {
				res.CatalogingForm = []byte(value_str)[0]
			}
		}
		if value, err := vm.Run("res.Leader.MultipartLevel"); err == nil {
			if value_str, err := value.ToString(); err == nil {
				res.MultipartLevel = []byte(value_str)[0]
			}
		}
		if value, err := vm.Run("res.Leader.LengthOFFieldPort"); err == nil {
			if value_str, err := value.ToString(); err == nil {
				res.LengthOFFieldPort = []byte(value_str)[0]
			}
		}
		if value, err := vm.Run("res.Leader.StartCharPos"); err == nil {
			if value_str, err := value.ToString(); err == nil {
				res.StartCharPos = []byte(value_str)[0]
			}
		}
		if value, err := vm.Run("res.Leader.LengthImplemenDefine"); err == nil {
			if value_str, err := value.ToString(); err == nil {
				res.LengthImplemenDefine = []byte(value_str)[0]
			}
		}
		if value, err := vm.Run("res.Leader.Undefine"); err == nil {
			if value_str, err := value.ToString(); err == nil {
				res.Type = []byte(value_str)[0]
			}
		}

		vm.Set("__readVariableField", func(call otto.FunctionCall) otto.Value {
			indexJS, _ := call.Argument(1).ToInteger()
			i := strconv.Itoa(int(indexJS))
			field := new(marc21.RawField)
			if value, err := vm.Run("res.VariableField[" + i + "].Tag"); err == nil {
				if value_str, err := value.ToString(); err == nil {
					field.Tag = value_str
				}
			}
			if value, err := vm.Run("res.VariableField[" + i + "].IndicatorOne"); err == nil {
				if value_str, err := value.ToString(); err == nil {
					if len(value_str) > 1 {
						field.Indicators = []byte{value_str[0]}
					} else {
						field.Indicators = []byte{'#'}
					}
				}
			}
			if value, err := vm.Run("res.VariableField[" + i + "].IndicatorTwo"); err == nil {
				if value_str, err := value.ToString(); err == nil {
					if len(value_str) > 1 {
						field.Indicators = append(field.Indicators, value_str[0])
					} else {
						field.Indicators = append(field.Indicators, '#')
					}
				}
			}
			rawDataLength, err := vm.Run("res.VariableField[" + i + "].RawData.length")
			if err != nil {
				panic(err)
			}
			{
				rawDataLength, _ := rawDataLength.ToInteger()
				for j := int64(0); j < rawDataLength; j++ {
					subArrayLength, err := vm.Run("res.VariableField[" + i + "].RawData[" + strconv.Itoa(int(j)) + "].length")
					if err != nil {
						panic(err)
					}
					arr := []byte{}
					{
						subArrayLength, _ := subArrayLength.ToInteger()
						for z := int64(0); z < subArrayLength; z++ {
							if value, err := vm.Run("res.VariableField[\"" + i + "\"].RawData[" + strconv.Itoa(int(j)) + "]" + "[" + strconv.Itoa(int(z)) + "]"); err == nil {
								if value_str, err := value.ToString(); err == nil {
									arr = append(arr, value_str[0])
								}
							}
						}
					}
					field.RawData = append(field.RawData, arr)
				}
			}
			field.Subfields = new(marc21.OStack)
			subfieldCount, err := vm.Run("res.VariableField[\"" + i + "\"].SubField.length")
			if err != nil {
				panic(err)
			}
			{
				subfieldCount, _ := subfieldCount.ToInteger()
				for j := int64(0); j < subfieldCount; j++ {
					sfName := ""
					sfData := []byte{}
					if value, err := vm.Run("res.VariableField[\"" + i + "\"].SubField[" + strconv.Itoa(int(j)) + "].Name"); err == nil {
						if value_str, err := value.ToString(); err == nil {
							sfName = value_str
						}
					}
					if value, err := vm.Run("res.VariableField[\"" + i + "\"].SubField[" + strconv.Itoa(int(j)) + "].Data"); err == nil {
						if value_str, err := value.ToString(); err == nil {
							sfData = []byte(value_str)
						}
					}
					field.Subfields.Add(sfName, sfData)
				}
			}
			res.VariableField[field.Tag] = field
			return otto.Value{}
		})

		_, err = vm.Run("res.VariableField.forEach(__readVariableField)")
		if err != nil {
			panic(err)
		}

		//res.Status = rec.Status
		//res.Type = rec.Type
		//res.BibLevel = rec.BibLevel
		//res.ControlType = 48 //rec.ControlType
		//res.CharacterEncoding = rec.CharacterEncoding
		//res.IndicatorCount = rec.IndicatorCount
		//res.SubfieldCodeCount = rec.SubfieldCodeCount
		//res.EncodingLevel = 32   //rec.EncodingLevel
		//res.CatalogingForm = 105 //rec.CatalogingForm
		//res.MultipartLevel = rec.MultipartLevel
		//res.LengthOFFieldPort = rec.LengthOFFieldPort
		//res.StartCharPos = rec.StartCharPos
		//res.LengthImplemenDefine = rec.LengthImplemenDefine
		//res.Undefine = rec.Undefine
		//for _, move := range MoveMatrix {
		//move.Do(rec, res)
		//}
		res.Write(outFile)
		//fmt.Println(res)
	}

}
