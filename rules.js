var source = new MarcRecord();
LoadSource(source);


//source.VariableField.forEach(function(item,i,arr){
  //console.log(item.Tag);
  //item.SubFields.forEach(function(item,i,arr){
    //console.log("\t",item.Name,":",item.Data);
  //})
//})
var destination = new MarcRecord();

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

function RawCopyField(from, to) {
  if (!source.GetField(from)){
    return;
  }
  destination.VariableField.push(source.GetField(from))
  destination.GetField(to).Tag = to;
}

function CopySubfield(fromField, fromSubFields, toField, toSubfield) {
  if (!source.GetField(fromField)){
    return;
  }
  if (!source.IsExistsSubfield(fromField, fromSubFields)){
    return;
  }
  if (!destination.GetField(toField)) {
    vf = new VariableField();
    vf.Tag = toField;
    vf.HasIndicators = true;
    vf.Indicators = ["#","#"];
    destination.VariableField.push(vf)
  }
  vsf = new VariableSubField();
  vsf.Name = toSubfield;
  vsf.Data = source.GetSubfield(fromField, fromSubFields).Data;
  destination.GetField(toField).SubFields.push(vsf)
}


RawCopyField("001", "001");
RawCopyField("005", "005");

CopySubfield("020", "c", "010", "d");
CopySubfield("020","e","010","b");
CopySubfield("020","t","010","9");
CopySubfield("022","a","011","a");
CopySubfield("041","a","101","a");
CopySubfield("041","h","101","c");
CopySubfield("080","a","675","a");
CopySubfield("090","a","899","j");
CopySubfield("090","e","899","x");
CopySubfield("090","f","899","b");
CopySubfield("090","h","899","c");
CopySubfield("993","c","899","y");
CopySubfield("993","e","899","x");
CopySubfield("993","h","899","9");
CopySubfield("993","n","899","m");
CopySubfield("090","s","899","l");
CopySubfield("090","x","899","i");
CopySubfield("091","a","686","a");
CopySubfield("100","а","700","a");
CopySubfield("094","a","316","a");
CopySubfield("100","b","700","d");
CopySubfield("100","c","700","c");
CopySubfield("100","d","700","f");
CopySubfield("110","a","710","a");
CopySubfield("110","b","710","b");
CopySubfield("110","c","710","e");
CopySubfield("110","d","710","f");
CopySubfield("111","a","710","a");
CopySubfield("111","c","710","e");
CopySubfield("111","d","710","f");
CopySubfield("111","e","710","b");
CopySubfield("111","n","710","d");
CopySubfield("130","a","500","a");
CopySubfield("130","p","500","i");
CopySubfield("245","a","200","a");
CopySubfield("245","b","200","e");
CopySubfield("245","c","200","g");
CopySubfield("245","h","200","b");
CopySubfield("245","n","200","h");
CopySubfield("245","o","200","d");
CopySubfield("245","z","200","z");
CopySubfield("245","p","200","i");
CopySubfield("246","a","517","a");
CopySubfield("246","g","200","z");
CopySubfield("250","a","205","a");
CopySubfield("250","b","205","a");
CopySubfield("260","a","210","a");
CopySubfield("260","b","210","c");
CopySubfield("260","c","210","d");
CopySubfield("260","e","210","e");
CopySubfield("260","f","210","g");
CopySubfield("260","g","210","h");
CopySubfield("300","a","215","a");
CopySubfield("300","b","215","c");
CopySubfield("300","c","215","d");
CopySubfield("300","d","316","a");
CopySubfield("300","e","215","a");
CopySubfield("440","a","225","a");
CopySubfield("440","n","225","h");
CopySubfield("440","p","225","i");
CopySubfield("440","v","225","v");
CopySubfield("440","x","225","x");
CopySubfield("500","a","300","a");
CopySubfield("504","a","320","a");
CopySubfield("505","a","327","a");
CopySubfield("508","a","317","a");
CopySubfield("515","a","317","a");
CopySubfield("518","a","317","a");
CopySubfield("520","a","330","a");
CopySubfield("600","a","600","a");
CopySubfield("690","a","600","a");
CopySubfield("998","a","600","a");
CopySubfield("630","a","605","a");
CopySubfield("630","p","605","i");
CopySubfield("650","a","606","a");
CopySubfield("650","b","607","a");
CopySubfield("650","x","606","x");
CopySubfield("650","y","606","z");
CopySubfield("650","z","606","y");
CopySubfield("653","a","610","a");
CopySubfield("675","a","317","z");
CopySubfield("680","a","317","b");
CopySubfield("685","a","317","y");
CopySubfield("700","a","701","a");



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
  currentDate = currentDate + source.GetSubfield("260","c").Data;
} else {
  currentDate = currentDate + currentDate.substr(0,8);
}
currentDate = currentDate + "####u##Y0rusY0102####ca";
vfs = new VariableSubField();
vfs.Name = "a"
vfs.Data = currentDate;
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


indicators.forEach(function(item, i, arr) {
  if (destination.GetField(i)) {
    destination.GetField(i).Indicators = item;
  }
})

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

//destination.VariableField.forEach(function(item,i,arr){
  //console.log(item.Tag);
  //item.SubFields.forEach(function(item,i,arr){
    //console.log("\t",item.Name,":",item.Data);
  //})
//})
WriteResult(destination)
