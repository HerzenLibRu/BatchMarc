# BatchMarc

## English

BatchMarc - tool for processing of marc record

### Build
> go get github.com/HerzenLibRu/BatchMarc

### Run
> go get github.com/HerzenLibRu/BatchMarc

### Processing rules
Write on JavaScript. Used interpretator - https://github.com/robertkrimen/otto/

Attention! If you use regular expression in your rules - read Readme interpretator.

### Constructors classes in interpretator

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

#### Get MARC-record on JavaScript

For get current record, you must create instance of class MarcRecord and send it as argument to function LoadSource

    var source = new MarcRecord();
    LoadSource(source);
    
After that, variable "source" will contain current MARC-record.

### Send result from JavaScript for write in output file

For send result, you must send instance of class MarcRecord as argument to function WriteResult

    var result = source;
    WriteResult(source);
    
Attention! If you call function WriteResult repeatedly -  will be writed state of variable last function call

## Russian
BatchMarc - утилита для  обработки записей marc файлов.

### Сборка
> go get github.com/HerzenLibRu/BatchMarc

### Запуск

> BatchMarc /path/to/input.ldb /path/to/output.ldb /path/to/rules.js

### Правила обработки

Пишутся на JavaScript. Используемыё интерпретатор - https://github.com/robertkrimen/otto/

Внимание! Если в Ваших правилах используются регулярные выражение - прочитайте Readme интерпретатора!

#### Конструкторы классов в интепретаторе

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

#### Получение записи в JavaScript

Для получения записи необходимо создать экземпляр класса MarcRecord и передать экземпляр в качестве аргумента функции LoadSource

    var source = new MarcRecord();
    LoadSource(source);
    
После этого в переменной source будет содержаться текущая marc запись.

#### Передача результата из JavaScript для записи в выходной файл

Для передачи результата работы скрипта передайте экземпляр класса MarcRecord в качестве аргумента функции WriteResult

    var result = source;
    WriteResult(source);
    
Внимание! Если WriteResult будет вызвано несколько раз - результирующим будет состояние переменной при последнем вызове
