orig.GetField = function(field) {
  sItem = false;
  orig.VariableField.forEach(function(item, i, arr){
    if (item.Tag == field) {
      sItem = item;
    }
  })
  return sItem;
}

res.GetField = function(field) {
  sItem = false;
  res.VariableField.forEach(function(item, i, arr){
    if (item.Tag == field) {
      sItem = item;
    }
  })
  return sItem;
}

orig.IsExistsSubfield = function(field, subfield) {
  if (!!orig.GetSubfield(field, subfield)) {
    if (orig.GetSubfield(field, subfield).Data == undefined) {
      return false;
    }
    return true;
  }
  return false;
}

res.IsExistsSubfield = function(field, subfield) {
  if (!!res.GetSubfield(field, subfield)) {
    if (res.GetSubfield(field, subfield).Data == undefined) {
      return false;
    }
    return true;
  }
  return false;
}

orig.GetSubfield = function(field,subfield) {
  if (!orig.GetField(field)) {
    return false
  }
  sItem = false
  orig.GetField(field).SubField.forEach(function(item, i, arr){
    if (item.Name == subfield){
      sItem = item;
    }
  })
  return sItem;
}

res.GetSubfield = function(field, subfield) {
  if (!res.GetField(field)) {
    return false
  }
  sItem = false

  res.GetField(field).SubField.forEach(function(item, i, arr){
    if (item.Name == subfield){
      sItem = item;
    }
  })
  return sItem;
}

function RawCopyField(from, to) {
  if (!orig.GetField(from)){
    return;
  }
  res.VariableField.push(orig.GetField(from))
  res.GetField(to).Tag = to;
}

function CopySubfield(fromField, fromSubField, toField, toSubfield) {
  if (!orig.GetField(fromField)){
    return;
  }
  if (!orig.IsExistsSubfield(fromField, fromSubField)){
    return;
  }
  if (!res.GetField(toField)) {
    res.VariableField.push(new VariableField(toField, "#", "#"))
  }
  res.GetField(toField).SubField.push(new VariableSubField(toSubfield, orig.GetSubfield(fromField, fromSubField).Data))
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
if (!res.GetField("010")) {
  res.VariableField.push(new VariableField("010", "#","#"));
}
if (orig.IsExistsSubfield("020", "a")) {
  if (orig.GetSubfield("020","a").Data.length <4 ){
    res.GetField("010").SubField.push(new VariableSubField("a","-"));
  } else {
    res.GetField("010").SubField.push(new VariableSubField("a", orig.GetSubfield("020","a").Data));
  }
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
if (orig.IsExistsSubfield("260","c")) {
  currentDate = currentDate + orig.GetSubfield("260","c").Data;
} else {
  currentDate = currentDate + currentDate.substr(0,8);
}
currentDate = currentDate + "####u##Y0rusY0102####ca";
if (!res.GetField("100")) {
  vf = new VariableField("100", "#", "#");
  vf.SubField.push(new VariableSubField("a", currentDate));
  res.VariableField.push(vf);
} else {
  res.GetField("100").SubField.push(new VariableSubField("a", currentDate));
}

//UDK Handler
if (res.IsExistsSubfield("675","a")) {
  res.GetField("675").SubField.push(new VariableSubField("v", "Сокращенное издание 2001"));
}

//GOUNB Handler
if (!res.GetField("899")) {
  vf = new VariableField("899", "#", "#");
  vf.SubField.push(new VariableSubField("a", "Кировская ГОУНБ"))
  res.VariableField.push(vf);  
} else {
  res.GetField("899").SubField.push(new VariableSubField("a", "Кировская ГОУНБ"));
}

//BBK Handler
if (res.IsExistsSubfield("686","a")) {
  if (res.GetSubfield("686","a").Data.length > 0) {
    res.GetField("686").SubField.push(new VariableSubField("v", "LBC/RL"))
    res.GetField("686").SubField.push(new VariableSubField("2", "rubbk"))
  }
}

var indicators = [];
indicators["700"] = ["#","1"];
indicators["200"] = ["1","#"];
indicators["606"] = ["1","#"];
indicators["701"] = ["#","1"];

indicators.forEach(function(item, i, arr) {
  if (res.GetField(i)) {
    res.GetField(i).IndicatorOne = item[0];
    res.GetField(i).IndicatorTwo = item[1];
  }
})

res.Leader.Status = orig.Leader.Status;
res.Leader.Type = orig.Leader.Type;
res.Leader.BibLevel = orig.Leader.BibLevel;
res.Leader.ControlType = String.fromCharCode(48)
res.Leader.CharacterEncoding = orig.Leader.CharacterEncoding;
res.Leader.IndicatorCount = orig.Leader.IndicatorCount;
res.Leader.SubfieldCodeCount = orig.Leader.SubfieldCodeCount;
res.Leader.EncodingLevel = String.fromCharCode(32)
res.Leader.CatalogingForm = String.fromCharCode(105)
res.Leader.MultipartLevel = orig.Leader.MultipartLevel;
res.Leader.LengthOFFieldPort = orig.Leader.LengthOFFieldPort;
res.Leader.StartCharPos = orig.Leader.StartCharPos;
res.Leader.LengthImplemenDefine = orig.Leader.LengthImplemenDefine;
res.Leader.Undefine = orig.Leader.Undefine;
