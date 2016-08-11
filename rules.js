var source = new MarcRecord();
LoadSource(source);

var destination = new MarcRecord();

var copyRules = [{from:{field:"020",subfield:"c"},to:{field:"010",subfield:"d"}},
{from:{field:"020",subfield:"e"},to:{field:"010",subfield:"b"}},
{from:{field:"020",subfield:"t"},to:{field:"010",subfield:"9"}},
{from:{field:"022",subfield:"a"},to:{field:"011",subfield:"a"}},
{from:{field:"041",subfield:"a"},to:{field:"101",subfield:"a"}},
{from:{field:"041",subfield:"h"},to:{field:"101",subfield:"c"}},
{from:{field:"080",subfield:"a"},to:{field:"675",subfield:"a"}},
{from:{field:"090",subfield:"a"},to:{field:"899",subfield:"j"}},
{from:{field:"090",subfield:"e"},to:{field:"899",subfield:"x"}},
{from:{field:"090",subfield:"f"},to:{field:"899",subfield:"b"}},
{from:{field:"090",subfield:"h"},to:{field:"899",subfield:"c"}},
{from:{field:"993",subfield:"c"},to:{field:"899",subfield:"y"}},
{from:{field:"993",subfield:"e"},to:{field:"899",subfield:"x"}},
{from:{field:"993",subfield:"h"},to:{field:"899",subfield:"9"}},
{from:{field:"993",subfield:"n"},to:{field:"899",subfield:"m"}},
{from:{field:"090",subfield:"s"},to:{field:"899",subfield:"l"}},
{from:{field:"090",subfield:"x"},to:{field:"899",subfield:"i"}},
{from:{field:"091",subfield:"a"},to:{field:"686",subfield:"a"}},
{from:{field:"100",subfield:"а"},to:{field:"700",subfield:"a"}},
{from:{field:"094",subfield:"a"},to:{field:"316",subfield:"a"}},
{from:{field:"100",subfield:"b"},to:{field:"700",subfield:"d"}},
{from:{field:"100",subfield:"c"},to:{field:"700",subfield:"c"}},
{from:{field:"100",subfield:"d"},to:{field:"700",subfield:"f"}},
{from:{field:"110",subfield:"a"},to:{field:"710",subfield:"a"}},
{from:{field:"110",subfield:"b"},to:{field:"710",subfield:"b"}},
{from:{field:"110",subfield:"c"},to:{field:"710",subfield:"e"}},
{from:{field:"110",subfield:"d"},to:{field:"710",subfield:"f"}},
{from:{field:"111",subfield:"a"},to:{field:"710",subfield:"a"}},
{from:{field:"111",subfield:"c"},to:{field:"710",subfield:"e"}},
{from:{field:"111",subfield:"d"},to:{field:"710",subfield:"f"}},
{from:{field:"111",subfield:"e"},to:{field:"710",subfield:"b"}},
{from:{field:"111",subfield:"n"},to:{field:"710",subfield:"d"}},
{from:{field:"130",subfield:"a"},to:{field:"500",subfield:"a"}},
{from:{field:"130",subfield:"p"},to:{field:"500",subfield:"i"}},
{from:{field:"245",subfield:"a"},to:{field:"200",subfield:"a"}},
{from:{field:"245",subfield:"b"},to:{field:"200",subfield:"e"}},
{from:{field:"245",subfield:"c"},to:{field:"200",subfield:"g"}},
{from:{field:"245",subfield:"h"},to:{field:"200",subfield:"b"}},
{from:{field:"245",subfield:"n"},to:{field:"200",subfield:"h"}},
{from:{field:"245",subfield:"o"},to:{field:"200",subfield:"d"}},
{from:{field:"245",subfield:"z"},to:{field:"200",subfield:"z"}},
{from:{field:"245",subfield:"p"},to:{field:"200",subfield:"i"}},
{from:{field:"246",subfield:"a"},to:{field:"517",subfield:"a"}},
{from:{field:"246",subfield:"g"},to:{field:"200",subfield:"z"}},
{from:{field:"250",subfield:"a"},to:{field:"205",subfield:"a"}},
{from:{field:"250",subfield:"b"},to:{field:"205",subfield:"a"}},
{from:{field:"260",subfield:"a"},to:{field:"210",subfield:"a"}},
{from:{field:"260",subfield:"b"},to:{field:"210",subfield:"c"}},
{from:{field:"260",subfield:"c"},to:{field:"210",subfield:"d"}},
{from:{field:"260",subfield:"e"},to:{field:"210",subfield:"e"}},
{from:{field:"260",subfield:"f"},to:{field:"210",subfield:"g"}},
{from:{field:"260",subfield:"g"},to:{field:"210",subfield:"h"}},
{from:{field:"300",subfield:"a"},to:{field:"215",subfield:"a"}},
{from:{field:"300",subfield:"b"},to:{field:"215",subfield:"c"}},
{from:{field:"300",subfield:"c"},to:{field:"215",subfield:"d"}},
{from:{field:"300",subfield:"d"},to:{field:"316",subfield:"a"}},
{from:{field:"300",subfield:"e"},to:{field:"215",subfield:"a"}},
{from:{field:"440",subfield:"a"},to:{field:"225",subfield:"a"}},
{from:{field:"440",subfield:"n"},to:{field:"225",subfield:"h"}},
{from:{field:"440",subfield:"p"},to:{field:"225",subfield:"i"}},
{from:{field:"440",subfield:"v"},to:{field:"225",subfield:"v"}},
{from:{field:"440",subfield:"x"},to:{field:"225",subfield:"x"}},
{from:{field:"500",subfield:"a"},to:{field:"300",subfield:"a"}},
{from:{field:"504",subfield:"a"},to:{field:"320",subfield:"a"}},
{from:{field:"505",subfield:"a"},to:{field:"327",subfield:"a"}},
{from:{field:"508",subfield:"a"},to:{field:"317",subfield:"a"}},
{from:{field:"515",subfield:"a"},to:{field:"317",subfield:"a"}},
{from:{field:"518",subfield:"a"},to:{field:"317",subfield:"a"}},
{from:{field:"520",subfield:"a"},to:{field:"330",subfield:"a"}},
{from:{field:"600",subfield:"a"},to:{field:"600",subfield:"a"}},
{from:{field:"690",subfield:"a"},to:{field:"600",subfield:"a"}},
{from:{field:"998",subfield:"a"},to:{field:"600",subfield:"a"}},
{from:{field:"630",subfield:"a"},to:{field:"605",subfield:"a"}},
{from:{field:"630",subfield:"p"},to:{field:"605",subfield:"i"}},
{from:{field:"650",subfield:"a"},to:{field:"606",subfield:"a"}},
{from:{field:"650",subfield:"b"},to:{field:"607",subfield:"a"}},
{from:{field:"650",subfield:"x"},to:{field:"606",subfield:"x"}},
{from:{field:"650",subfield:"y"},to:{field:"606",subfield:"z"}},
{from:{field:"650",subfield:"z"},to:{field:"606",subfield:"y"}},
{from:{field:"653",subfield:"a"},to:{field:"610",subfield:"a"}},
{from:{field:"675",subfield:"a"},to:{field:"317",subfield:"z"}},
{from:{field:"680",subfield:"a"},to:{field:"317",subfield:"b"}},
{from:{field:"685",subfield:"a"},to:{field:"317",subfield:"y"}},
{from:{field:"700",subfield:"a"},to:{field:"701",subfield:"a"}}]

var indicators = [];
indicators["101"] = ["0","#"];
indicators["200"] = ["1","#"];
indicators["225"] = ["1","#"];
indicators["327"] = ["1","#"];
indicators["500"] = ["1","0"];
indicators["510"] = ["1","#"];
indicators["512"] = ["1","#"];
indicators["513"] = ["1","#"];
indicators["514"] = ["1","#"];
indicators["516"] = ["1","#"];
indicators["517"] = ["1","#"];
indicators["532"] = ["1","0"];
indicators["606"] = ["1","#"];
indicators["700"] = ["#","1"];
indicators["701"] = ["#","1"];
indicators["702"] = ["#","1"];
indicators["710"] = ["0","2"];
indicators["711"] = ["0","2"];
indicators["712"] = ["0","2"];

source.GetField = function(field) {
  sItem = false;
  source.VariableField.forEach(function(item, i, arr){
    if (item.Tag == field) {
      sItem = item;
    }
  })
  return sItem;
}

destination.GetField = function(field) {
  sItem = false;
  destination.VariableField.forEach(function(item, i, arr){
    if (item.Tag == field) {
      sItem = item;
    }
  })
  return sItem;
}

source.IsExistsSubfield = function(field, subfield) {
  if (!!source.GetSubfield(field, subfield)) {
    if (source.GetSubfield(field, subfield).Data == undefined) {
      return false;
    }
    return true;
  }
  return false;
}

destination.IsExistsSubfield = function(field, subfield) {
  if (!!destination.GetSubfield(field, subfield)) {
    if (destination.GetSubfield(field, subfield).Data == undefined) {
      return false;
    }
    return true;
  }
  return false;
}

source.GetSubfield = function(field,subfield) {
  if (!source.GetField(field)) {
    return false
  }
  sItem = false
  source.GetField(field).SubFields.forEach(function(item, i, arr){
    if (item.Name == subfield){
      sItem = item;
    }
  })
  return sItem;
}

destination.GetSubfield = function(field, subfield) {
  if (!destination.GetField(field)) {
    return false
  }
  sItem = false

  destination.GetField(field).SubFields.forEach(function(item, i, arr){
    if (item.Name == subfield){
      sItem = item;
    }
  })
  return sItem;
}

destination.Leader.Status = source.Leader.Status;
destination.Leader.Type = source.Leader.Type;
destination.Leader.BibLevel = source.Leader.BibLevel;
destination.Leader.ControlType = String.fromCharCode(48)
destination.Leader.CharacterEncoding = source.Leader.CharacterEncoding;
destination.Leader.IndicatorCount = source.Leader.IndicatorCount;
destination.Leader.SubfieldCodeCount = source.Leader.SubfieldCodeCount;
destination.Leader.EncodingLevel = String.fromCharCode(32)
destination.Leader.CatalogingForm = String.fromCharCode(105)
destination.Leader.MultipartLevel = source.Leader.MultipartLevel;
destination.Leader.LengthOFFieldPort = source.Leader.LengthOFFieldPort;
destination.Leader.StartCharPos = source.Leader.StartCharPos;
destination.Leader.LengthImplemenDefine = source.Leader.LengthImplemenDefine;
destination.Leader.Undefine = source.Leader.Undefine;

copyRules.forEach(function(rule, index, rules) {
  source.VariableField.forEach(function(record, i, arr){
    if (record.Tag == rule.from.field) {
      record.SubFields.forEach(function(sf, j, sfArr){
        if (sf.Name == rule.from.subfield) {
          vf = destination.GetField(rule.to.field)
          if (!vf) {
            vf = new VariableField();
            vf.Tag = rule.to.field;
            vf.HasIndicators = true;
            inds = indicators[rule.to.field];
            if (!inds) {
              inds = ["#","#"];
            }
            vf.Indicators = inds;
            destination.VariableField.push(vf)
          }
          vsf = new VariableSubField();
          vsf.Name = rule.to.subfield;
          vsf.Data = sf.Data;
          vf.SubFields.push(vsf)
        }
      })
    }
  })
})

//ISBN Handler
if (!destination.GetField("010")) {
  vf = new VariableField();
  vf.Tag = "010";
  vf.HasIndicators = true;
  vf.Indicators = ["#","#"]
  destination.VariableField.push(vf);
}
if (source.IsExistsSubfield("020", "a")) {
    vsf = new VariableSubField();
    vsf.Name = "a";
  if (source.GetSubfield("020","a").Data.length <4 ){
    vsf.Data = "-"
  } else {
    vsf.Data = source.GetSubfield("020","a").Data
  }
  destination.GetField("010").SubFields.push(vsf);
}

//CodingData
var time = new Date();
var currentDate = ""+time.getFullYear();
var month = ""+time.getMonth();
if (month.length < 2) {
  month = "0"+month;
}

var day = ""+time.getDay();
if (day.length < 2) {
  day = "0"+day;
}
currentDate = currentDate + month +day;
var data = currentDate + "d";
if (source.IsExistsSubfield("260","c")) {
  data = data + source.GetSubfield("260","c").Data;
} else {
  data = data + currentDate.substr(0,8);
}
data = data + "####u##y0rusy0102####ca";
vfs = new VariableSubField();
vfs.Name = "a"
vfs.Data = data;
if (!destination.GetField("100")) {
  vf = new VariableField();
  vf.Tag = "100";
  vf.HasIndicators = true;
  vf.Indicators = ["#", "#"];
  vf.SubFields.push(vfs);
  destination.VariableField.push(vf);
} else {
  destination.GetField("100").SubFields.push(vfs);
}

//UDK Handler
if (destination.IsExistsSubfield("675","a")) {
  vsf = new VariableSubField();
  vsf.Name ="v";
  vsf.Data = "Сокращенное издание 2001";
  destination.GetField("675").SubFields.push(vsf);
}

vsf = new VariableSubField();
vsf.Name = "a";
vsf.Data = "Кировская ГОУНБ";
//GOUNB Handler
if (!destination.GetField("899")) {
  vf = new VariableField();
  vf.Tag =  "899";
  vf.HasIndicators = true;
  vf.Indicators = ["#", "#"];
  vf.SubFields.push(vsf)
  destination.VariableField.push(vf);  
} else {
  destination.GetField("899").SubFields.push(vsf);
}

//BBK Handler
if (destination.IsExistsSubfield("686","a")) {
  if (destination.GetSubfield("686","a").Data.length > 0) {
    vsfV = new VariableSubField();
    vsfV.Name = "v";
    vsfV.Data = "LBC/RL";
    destination.GetField("686").SubFields.push(vsfV);
    vsf2 = new VariableSubField();
    vsf2.Name = "2";
    vsf2.Data = "rubbk";
    destination.GetField("686").SubFields.push(vsf2);
  }
}

//source.VariableField.forEach(function(item,i,arr){
  //console.log(item.Tag);
  //item.SubFields.forEach(function(item,i,arr){
    //console.log("\t",item.Name,":",item.Data);
  //})
//})

function RawCopyField(from, to) {
  if (!source.GetField(from)){
    return;
  }
  destination.VariableField.push(source.GetField(from))
  destination.GetField(to).Tag = to;
}

RawCopyField("001", "001");
RawCopyField("005", "005");

//destination.VariableField.forEach(function(item,i,arr){
  //console.log(item.Tag);
  //item.SubFields.forEach(function(item,i,arr){
    //console.log("\t",item.Name,":",item.Data);
  //})
//})
WriteResult(destination)
