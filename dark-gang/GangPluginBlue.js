var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key2 of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key2) && key2 !== "default")
        __defProp(target, key2, { get: () => module2[key2], enumerable: !(desc = __getOwnPropDesc(module2, key2)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// (disabled):node_modules/buffer/index.js
var require_buffer = __commonJS({
  "(disabled):node_modules/buffer/index.js"() {
  }
});

// node_modules/bn.js/lib/bn.js
var require_bn = __commonJS({
  "node_modules/bn.js/lib/bn.js"(exports2, module2) {
    (function(module3, exports3) {
      "use strict";
      function assert2(val, msg) {
        if (!val)
          throw new Error(msg || "Assertion failed");
      }
      function inherits2(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
      function BN3(number, base2, endian) {
        if (BN3.isBN(number)) {
          return number;
        }
        this.negative = 0;
        this.words = null;
        this.length = 0;
        this.red = null;
        if (number !== null) {
          if (base2 === "le" || base2 === "be") {
            endian = base2;
            base2 = 10;
          }
          this._init(number || 0, base2 || 10, endian || "be");
        }
      }
      if (typeof module3 === "object") {
        module3.exports = BN3;
      } else {
        exports3.BN = BN3;
      }
      BN3.BN = BN3;
      BN3.wordSize = 26;
      var Buffer2;
      try {
        if (typeof window !== "undefined" && typeof window.Buffer !== "undefined") {
          Buffer2 = window.Buffer;
        } else {
          Buffer2 = require_buffer().Buffer;
        }
      } catch (e3) {
      }
      BN3.isBN = function isBN(num) {
        if (num instanceof BN3) {
          return true;
        }
        return num !== null && typeof num === "object" && num.constructor.wordSize === BN3.wordSize && Array.isArray(num.words);
      };
      BN3.max = function max(left, right) {
        if (left.cmp(right) > 0)
          return left;
        return right;
      };
      BN3.min = function min(left, right) {
        if (left.cmp(right) < 0)
          return left;
        return right;
      };
      BN3.prototype._init = function init2(number, base2, endian) {
        if (typeof number === "number") {
          return this._initNumber(number, base2, endian);
        }
        if (typeof number === "object") {
          return this._initArray(number, base2, endian);
        }
        if (base2 === "hex") {
          base2 = 16;
        }
        assert2(base2 === (base2 | 0) && base2 >= 2 && base2 <= 36);
        number = number.toString().replace(/\s+/g, "");
        var start = 0;
        if (number[0] === "-") {
          start++;
          this.negative = 1;
        }
        if (start < number.length) {
          if (base2 === 16) {
            this._parseHex(number, start, endian);
          } else {
            this._parseBase(number, base2, start);
            if (endian === "le") {
              this._initArray(this.toArray(), base2, endian);
            }
          }
        }
      };
      BN3.prototype._initNumber = function _initNumber(number, base2, endian) {
        if (number < 0) {
          this.negative = 1;
          number = -number;
        }
        if (number < 67108864) {
          this.words = [number & 67108863];
          this.length = 1;
        } else if (number < 4503599627370496) {
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863
          ];
          this.length = 2;
        } else {
          assert2(number < 9007199254740992);
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863,
            1
          ];
          this.length = 3;
        }
        if (endian !== "le")
          return;
        this._initArray(this.toArray(), base2, endian);
      };
      BN3.prototype._initArray = function _initArray(number, base2, endian) {
        assert2(typeof number.length === "number");
        if (number.length <= 0) {
          this.words = [0];
          this.length = 1;
          return this;
        }
        this.length = Math.ceil(number.length / 3);
        this.words = new Array(this.length);
        for (var i3 = 0; i3 < this.length; i3++) {
          this.words[i3] = 0;
        }
        var j3, w3;
        var off = 0;
        if (endian === "be") {
          for (i3 = number.length - 1, j3 = 0; i3 >= 0; i3 -= 3) {
            w3 = number[i3] | number[i3 - 1] << 8 | number[i3 - 2] << 16;
            this.words[j3] |= w3 << off & 67108863;
            this.words[j3 + 1] = w3 >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j3++;
            }
          }
        } else if (endian === "le") {
          for (i3 = 0, j3 = 0; i3 < number.length; i3 += 3) {
            w3 = number[i3] | number[i3 + 1] << 8 | number[i3 + 2] << 16;
            this.words[j3] |= w3 << off & 67108863;
            this.words[j3 + 1] = w3 >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j3++;
            }
          }
        }
        return this.strip();
      };
      function parseHex4Bits(string, index) {
        var c3 = string.charCodeAt(index);
        if (c3 >= 65 && c3 <= 70) {
          return c3 - 55;
        } else if (c3 >= 97 && c3 <= 102) {
          return c3 - 87;
        } else {
          return c3 - 48 & 15;
        }
      }
      function parseHexByte(string, lowerBound, index) {
        var r3 = parseHex4Bits(string, index);
        if (index - 1 >= lowerBound) {
          r3 |= parseHex4Bits(string, index - 1) << 4;
        }
        return r3;
      }
      BN3.prototype._parseHex = function _parseHex(number, start, endian) {
        this.length = Math.ceil((number.length - start) / 6);
        this.words = new Array(this.length);
        for (var i3 = 0; i3 < this.length; i3++) {
          this.words[i3] = 0;
        }
        var off = 0;
        var j3 = 0;
        var w3;
        if (endian === "be") {
          for (i3 = number.length - 1; i3 >= start; i3 -= 2) {
            w3 = parseHexByte(number, start, i3) << off;
            this.words[j3] |= w3 & 67108863;
            if (off >= 18) {
              off -= 18;
              j3 += 1;
              this.words[j3] |= w3 >>> 26;
            } else {
              off += 8;
            }
          }
        } else {
          var parseLength = number.length - start;
          for (i3 = parseLength % 2 === 0 ? start + 1 : start; i3 < number.length; i3 += 2) {
            w3 = parseHexByte(number, start, i3) << off;
            this.words[j3] |= w3 & 67108863;
            if (off >= 18) {
              off -= 18;
              j3 += 1;
              this.words[j3] |= w3 >>> 26;
            } else {
              off += 8;
            }
          }
        }
        this.strip();
      };
      function parseBase(str, start, end, mul3) {
        var r3 = 0;
        var len = Math.min(str.length, end);
        for (var i3 = start; i3 < len; i3++) {
          var c3 = str.charCodeAt(i3) - 48;
          r3 *= mul3;
          if (c3 >= 49) {
            r3 += c3 - 49 + 10;
          } else if (c3 >= 17) {
            r3 += c3 - 17 + 10;
          } else {
            r3 += c3;
          }
        }
        return r3;
      }
      BN3.prototype._parseBase = function _parseBase(number, base2, start) {
        this.words = [0];
        this.length = 1;
        for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base2) {
          limbLen++;
        }
        limbLen--;
        limbPow = limbPow / base2 | 0;
        var total = number.length - start;
        var mod = total % limbLen;
        var end = Math.min(total, total - mod) + start;
        var word = 0;
        for (var i3 = start; i3 < end; i3 += limbLen) {
          word = parseBase(number, i3, i3 + limbLen, base2);
          this.imuln(limbPow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        if (mod !== 0) {
          var pow = 1;
          word = parseBase(number, i3, number.length, base2);
          for (i3 = 0; i3 < mod; i3++) {
            pow *= base2;
          }
          this.imuln(pow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        this.strip();
      };
      BN3.prototype.copy = function copy(dest) {
        dest.words = new Array(this.length);
        for (var i3 = 0; i3 < this.length; i3++) {
          dest.words[i3] = this.words[i3];
        }
        dest.length = this.length;
        dest.negative = this.negative;
        dest.red = this.red;
      };
      BN3.prototype.clone = function clone() {
        var r3 = new BN3(null);
        this.copy(r3);
        return r3;
      };
      BN3.prototype._expand = function _expand(size) {
        while (this.length < size) {
          this.words[this.length++] = 0;
        }
        return this;
      };
      BN3.prototype.strip = function strip() {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--;
        }
        return this._normSign();
      };
      BN3.prototype._normSign = function _normSign() {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0;
        }
        return this;
      };
      BN3.prototype.inspect = function inspect4() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      };
      var zeros2 = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ];
      var groupSizes = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ];
      var groupBases = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      BN3.prototype.toString = function toString(base2, padding2) {
        base2 = base2 || 10;
        padding2 = padding2 | 0 || 1;
        var out;
        if (base2 === 16 || base2 === "hex") {
          out = "";
          var off = 0;
          var carry = 0;
          for (var i3 = 0; i3 < this.length; i3++) {
            var w3 = this.words[i3];
            var word = ((w3 << off | carry) & 16777215).toString(16);
            carry = w3 >>> 24 - off & 16777215;
            if (carry !== 0 || i3 !== this.length - 1) {
              out = zeros2[6 - word.length] + word + out;
            } else {
              out = word + out;
            }
            off += 2;
            if (off >= 26) {
              off -= 26;
              i3--;
            }
          }
          if (carry !== 0) {
            out = carry.toString(16) + out;
          }
          while (out.length % padding2 !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        if (base2 === (base2 | 0) && base2 >= 2 && base2 <= 36) {
          var groupSize = groupSizes[base2];
          var groupBase = groupBases[base2];
          out = "";
          var c3 = this.clone();
          c3.negative = 0;
          while (!c3.isZero()) {
            var r3 = c3.modn(groupBase).toString(base2);
            c3 = c3.idivn(groupBase);
            if (!c3.isZero()) {
              out = zeros2[groupSize - r3.length] + r3 + out;
            } else {
              out = r3 + out;
            }
          }
          if (this.isZero()) {
            out = "0" + out;
          }
          while (out.length % padding2 !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        assert2(false, "Base should be between 2 and 36");
      };
      BN3.prototype.toNumber = function toNumber() {
        var ret2 = this.words[0];
        if (this.length === 2) {
          ret2 += this.words[1] * 67108864;
        } else if (this.length === 3 && this.words[2] === 1) {
          ret2 += 4503599627370496 + this.words[1] * 67108864;
        } else if (this.length > 2) {
          assert2(false, "Number can only safely store up to 53 bits");
        }
        return this.negative !== 0 ? -ret2 : ret2;
      };
      BN3.prototype.toJSON = function toJSON2() {
        return this.toString(16);
      };
      BN3.prototype.toBuffer = function toBuffer(endian, length) {
        assert2(typeof Buffer2 !== "undefined");
        return this.toArrayLike(Buffer2, endian, length);
      };
      BN3.prototype.toArray = function toArray(endian, length) {
        return this.toArrayLike(Array, endian, length);
      };
      BN3.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
        var byteLength = this.byteLength();
        var reqLength = length || Math.max(1, byteLength);
        assert2(byteLength <= reqLength, "byte array longer than desired length");
        assert2(reqLength > 0, "Requested array length <= 0");
        this.strip();
        var littleEndian = endian === "le";
        var res = new ArrayType(reqLength);
        var b3, i3;
        var q = this.clone();
        if (!littleEndian) {
          for (i3 = 0; i3 < reqLength - byteLength; i3++) {
            res[i3] = 0;
          }
          for (i3 = 0; !q.isZero(); i3++) {
            b3 = q.andln(255);
            q.iushrn(8);
            res[reqLength - i3 - 1] = b3;
          }
        } else {
          for (i3 = 0; !q.isZero(); i3++) {
            b3 = q.andln(255);
            q.iushrn(8);
            res[i3] = b3;
          }
          for (; i3 < reqLength; i3++) {
            res[i3] = 0;
          }
        }
        return res;
      };
      if (Math.clz32) {
        BN3.prototype._countBits = function _countBits(w3) {
          return 32 - Math.clz32(w3);
        };
      } else {
        BN3.prototype._countBits = function _countBits(w3) {
          var t3 = w3;
          var r3 = 0;
          if (t3 >= 4096) {
            r3 += 13;
            t3 >>>= 13;
          }
          if (t3 >= 64) {
            r3 += 7;
            t3 >>>= 7;
          }
          if (t3 >= 8) {
            r3 += 4;
            t3 >>>= 4;
          }
          if (t3 >= 2) {
            r3 += 2;
            t3 >>>= 2;
          }
          return r3 + t3;
        };
      }
      BN3.prototype._zeroBits = function _zeroBits(w3) {
        if (w3 === 0)
          return 26;
        var t3 = w3;
        var r3 = 0;
        if ((t3 & 8191) === 0) {
          r3 += 13;
          t3 >>>= 13;
        }
        if ((t3 & 127) === 0) {
          r3 += 7;
          t3 >>>= 7;
        }
        if ((t3 & 15) === 0) {
          r3 += 4;
          t3 >>>= 4;
        }
        if ((t3 & 3) === 0) {
          r3 += 2;
          t3 >>>= 2;
        }
        if ((t3 & 1) === 0) {
          r3++;
        }
        return r3;
      };
      BN3.prototype.bitLength = function bitLength() {
        var w3 = this.words[this.length - 1];
        var hi = this._countBits(w3);
        return (this.length - 1) * 26 + hi;
      };
      function toBitArray(num) {
        var w3 = new Array(num.bitLength());
        for (var bit = 0; bit < w3.length; bit++) {
          var off = bit / 26 | 0;
          var wbit = bit % 26;
          w3[bit] = (num.words[off] & 1 << wbit) >>> wbit;
        }
        return w3;
      }
      BN3.prototype.zeroBits = function zeroBits() {
        if (this.isZero())
          return 0;
        var r3 = 0;
        for (var i3 = 0; i3 < this.length; i3++) {
          var b3 = this._zeroBits(this.words[i3]);
          r3 += b3;
          if (b3 !== 26)
            break;
        }
        return r3;
      };
      BN3.prototype.byteLength = function byteLength() {
        return Math.ceil(this.bitLength() / 8);
      };
      BN3.prototype.toTwos = function toTwos(width) {
        if (this.negative !== 0) {
          return this.abs().inotn(width).iaddn(1);
        }
        return this.clone();
      };
      BN3.prototype.fromTwos = function fromTwos(width) {
        if (this.testn(width - 1)) {
          return this.notn(width).iaddn(1).ineg();
        }
        return this.clone();
      };
      BN3.prototype.isNeg = function isNeg() {
        return this.negative !== 0;
      };
      BN3.prototype.neg = function neg3() {
        return this.clone().ineg();
      };
      BN3.prototype.ineg = function ineg() {
        if (!this.isZero()) {
          this.negative ^= 1;
        }
        return this;
      };
      BN3.prototype.iuor = function iuor(num) {
        while (this.length < num.length) {
          this.words[this.length++] = 0;
        }
        for (var i3 = 0; i3 < num.length; i3++) {
          this.words[i3] = this.words[i3] | num.words[i3];
        }
        return this.strip();
      };
      BN3.prototype.ior = function ior(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuor(num);
      };
      BN3.prototype.or = function or(num) {
        if (this.length > num.length)
          return this.clone().ior(num);
        return num.clone().ior(this);
      };
      BN3.prototype.uor = function uor(num) {
        if (this.length > num.length)
          return this.clone().iuor(num);
        return num.clone().iuor(this);
      };
      BN3.prototype.iuand = function iuand(num) {
        var b3;
        if (this.length > num.length) {
          b3 = num;
        } else {
          b3 = this;
        }
        for (var i3 = 0; i3 < b3.length; i3++) {
          this.words[i3] = this.words[i3] & num.words[i3];
        }
        this.length = b3.length;
        return this.strip();
      };
      BN3.prototype.iand = function iand(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuand(num);
      };
      BN3.prototype.and = function and(num) {
        if (this.length > num.length)
          return this.clone().iand(num);
        return num.clone().iand(this);
      };
      BN3.prototype.uand = function uand(num) {
        if (this.length > num.length)
          return this.clone().iuand(num);
        return num.clone().iuand(this);
      };
      BN3.prototype.iuxor = function iuxor(num) {
        var a3;
        var b3;
        if (this.length > num.length) {
          a3 = this;
          b3 = num;
        } else {
          a3 = num;
          b3 = this;
        }
        for (var i3 = 0; i3 < b3.length; i3++) {
          this.words[i3] = a3.words[i3] ^ b3.words[i3];
        }
        if (this !== a3) {
          for (; i3 < a3.length; i3++) {
            this.words[i3] = a3.words[i3];
          }
        }
        this.length = a3.length;
        return this.strip();
      };
      BN3.prototype.ixor = function ixor(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuxor(num);
      };
      BN3.prototype.xor = function xor(num) {
        if (this.length > num.length)
          return this.clone().ixor(num);
        return num.clone().ixor(this);
      };
      BN3.prototype.uxor = function uxor(num) {
        if (this.length > num.length)
          return this.clone().iuxor(num);
        return num.clone().iuxor(this);
      };
      BN3.prototype.inotn = function inotn(width) {
        assert2(typeof width === "number" && width >= 0);
        var bytesNeeded = Math.ceil(width / 26) | 0;
        var bitsLeft = width % 26;
        this._expand(bytesNeeded);
        if (bitsLeft > 0) {
          bytesNeeded--;
        }
        for (var i3 = 0; i3 < bytesNeeded; i3++) {
          this.words[i3] = ~this.words[i3] & 67108863;
        }
        if (bitsLeft > 0) {
          this.words[i3] = ~this.words[i3] & 67108863 >> 26 - bitsLeft;
        }
        return this.strip();
      };
      BN3.prototype.notn = function notn(width) {
        return this.clone().inotn(width);
      };
      BN3.prototype.setn = function setn(bit, val) {
        assert2(typeof bit === "number" && bit >= 0);
        var off = bit / 26 | 0;
        var wbit = bit % 26;
        this._expand(off + 1);
        if (val) {
          this.words[off] = this.words[off] | 1 << wbit;
        } else {
          this.words[off] = this.words[off] & ~(1 << wbit);
        }
        return this.strip();
      };
      BN3.prototype.iadd = function iadd(num) {
        var r3;
        if (this.negative !== 0 && num.negative === 0) {
          this.negative = 0;
          r3 = this.isub(num);
          this.negative ^= 1;
          return this._normSign();
        } else if (this.negative === 0 && num.negative !== 0) {
          num.negative = 0;
          r3 = this.isub(num);
          num.negative = 1;
          return r3._normSign();
        }
        var a3, b3;
        if (this.length > num.length) {
          a3 = this;
          b3 = num;
        } else {
          a3 = num;
          b3 = this;
        }
        var carry = 0;
        for (var i3 = 0; i3 < b3.length; i3++) {
          r3 = (a3.words[i3] | 0) + (b3.words[i3] | 0) + carry;
          this.words[i3] = r3 & 67108863;
          carry = r3 >>> 26;
        }
        for (; carry !== 0 && i3 < a3.length; i3++) {
          r3 = (a3.words[i3] | 0) + carry;
          this.words[i3] = r3 & 67108863;
          carry = r3 >>> 26;
        }
        this.length = a3.length;
        if (carry !== 0) {
          this.words[this.length] = carry;
          this.length++;
        } else if (a3 !== this) {
          for (; i3 < a3.length; i3++) {
            this.words[i3] = a3.words[i3];
          }
        }
        return this;
      };
      BN3.prototype.add = function add3(num) {
        var res;
        if (num.negative !== 0 && this.negative === 0) {
          num.negative = 0;
          res = this.sub(num);
          num.negative ^= 1;
          return res;
        } else if (num.negative === 0 && this.negative !== 0) {
          this.negative = 0;
          res = num.sub(this);
          this.negative = 1;
          return res;
        }
        if (this.length > num.length)
          return this.clone().iadd(num);
        return num.clone().iadd(this);
      };
      BN3.prototype.isub = function isub(num) {
        if (num.negative !== 0) {
          num.negative = 0;
          var r3 = this.iadd(num);
          num.negative = 1;
          return r3._normSign();
        } else if (this.negative !== 0) {
          this.negative = 0;
          this.iadd(num);
          this.negative = 1;
          return this._normSign();
        }
        var cmp = this.cmp(num);
        if (cmp === 0) {
          this.negative = 0;
          this.length = 1;
          this.words[0] = 0;
          return this;
        }
        var a3, b3;
        if (cmp > 0) {
          a3 = this;
          b3 = num;
        } else {
          a3 = num;
          b3 = this;
        }
        var carry = 0;
        for (var i3 = 0; i3 < b3.length; i3++) {
          r3 = (a3.words[i3] | 0) - (b3.words[i3] | 0) + carry;
          carry = r3 >> 26;
          this.words[i3] = r3 & 67108863;
        }
        for (; carry !== 0 && i3 < a3.length; i3++) {
          r3 = (a3.words[i3] | 0) + carry;
          carry = r3 >> 26;
          this.words[i3] = r3 & 67108863;
        }
        if (carry === 0 && i3 < a3.length && a3 !== this) {
          for (; i3 < a3.length; i3++) {
            this.words[i3] = a3.words[i3];
          }
        }
        this.length = Math.max(this.length, i3);
        if (a3 !== this) {
          this.negative = 1;
        }
        return this.strip();
      };
      BN3.prototype.sub = function sub(num) {
        return this.clone().isub(num);
      };
      function smallMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative;
        var len = self2.length + num.length | 0;
        out.length = len;
        len = len - 1 | 0;
        var a3 = self2.words[0] | 0;
        var b3 = num.words[0] | 0;
        var r3 = a3 * b3;
        var lo = r3 & 67108863;
        var carry = r3 / 67108864 | 0;
        out.words[0] = lo;
        for (var k3 = 1; k3 < len; k3++) {
          var ncarry = carry >>> 26;
          var rword = carry & 67108863;
          var maxJ = Math.min(k3, num.length - 1);
          for (var j3 = Math.max(0, k3 - self2.length + 1); j3 <= maxJ; j3++) {
            var i3 = k3 - j3 | 0;
            a3 = self2.words[i3] | 0;
            b3 = num.words[j3] | 0;
            r3 = a3 * b3 + rword;
            ncarry += r3 / 67108864 | 0;
            rword = r3 & 67108863;
          }
          out.words[k3] = rword | 0;
          carry = ncarry | 0;
        }
        if (carry !== 0) {
          out.words[k3] = carry | 0;
        } else {
          out.length--;
        }
        return out.strip();
      }
      var comb10MulTo = function comb10MulTo2(self2, num, out) {
        var a3 = self2.words;
        var b3 = num.words;
        var o3 = out.words;
        var c3 = 0;
        var lo;
        var mid;
        var hi;
        var a0 = a3[0] | 0;
        var al0 = a0 & 8191;
        var ah0 = a0 >>> 13;
        var a1 = a3[1] | 0;
        var al1 = a1 & 8191;
        var ah1 = a1 >>> 13;
        var a22 = a3[2] | 0;
        var al2 = a22 & 8191;
        var ah2 = a22 >>> 13;
        var a32 = a3[3] | 0;
        var al3 = a32 & 8191;
        var ah3 = a32 >>> 13;
        var a4 = a3[4] | 0;
        var al4 = a4 & 8191;
        var ah4 = a4 >>> 13;
        var a5 = a3[5] | 0;
        var al5 = a5 & 8191;
        var ah5 = a5 >>> 13;
        var a6 = a3[6] | 0;
        var al6 = a6 & 8191;
        var ah6 = a6 >>> 13;
        var a7 = a3[7] | 0;
        var al7 = a7 & 8191;
        var ah7 = a7 >>> 13;
        var a8 = a3[8] | 0;
        var al8 = a8 & 8191;
        var ah8 = a8 >>> 13;
        var a9 = a3[9] | 0;
        var al9 = a9 & 8191;
        var ah9 = a9 >>> 13;
        var b0 = b3[0] | 0;
        var bl0 = b0 & 8191;
        var bh0 = b0 >>> 13;
        var b1 = b3[1] | 0;
        var bl1 = b1 & 8191;
        var bh1 = b1 >>> 13;
        var b22 = b3[2] | 0;
        var bl2 = b22 & 8191;
        var bh2 = b22 >>> 13;
        var b32 = b3[3] | 0;
        var bl3 = b32 & 8191;
        var bh3 = b32 >>> 13;
        var b4 = b3[4] | 0;
        var bl4 = b4 & 8191;
        var bh4 = b4 >>> 13;
        var b5 = b3[5] | 0;
        var bl5 = b5 & 8191;
        var bh5 = b5 >>> 13;
        var b6 = b3[6] | 0;
        var bl6 = b6 & 8191;
        var bh6 = b6 >>> 13;
        var b7 = b3[7] | 0;
        var bl7 = b7 & 8191;
        var bh7 = b7 >>> 13;
        var b8 = b3[8] | 0;
        var bl8 = b8 & 8191;
        var bh8 = b8 >>> 13;
        var b9 = b3[9] | 0;
        var bl9 = b9 & 8191;
        var bh9 = b9 >>> 13;
        out.negative = self2.negative ^ num.negative;
        out.length = 19;
        lo = Math.imul(al0, bl0);
        mid = Math.imul(al0, bh0);
        mid = mid + Math.imul(ah0, bl0) | 0;
        hi = Math.imul(ah0, bh0);
        var w0 = (c3 + lo | 0) + ((mid & 8191) << 13) | 0;
        c3 = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
        w0 &= 67108863;
        lo = Math.imul(al1, bl0);
        mid = Math.imul(al1, bh0);
        mid = mid + Math.imul(ah1, bl0) | 0;
        hi = Math.imul(ah1, bh0);
        lo = lo + Math.imul(al0, bl1) | 0;
        mid = mid + Math.imul(al0, bh1) | 0;
        mid = mid + Math.imul(ah0, bl1) | 0;
        hi = hi + Math.imul(ah0, bh1) | 0;
        var w1 = (c3 + lo | 0) + ((mid & 8191) << 13) | 0;
        c3 = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
        w1 &= 67108863;
        lo = Math.imul(al2, bl0);
        mid = Math.imul(al2, bh0);
        mid = mid + Math.imul(ah2, bl0) | 0;
        hi = Math.imul(ah2, bh0);
        lo = lo + Math.imul(al1, bl1) | 0;
        mid = mid + Math.imul(al1, bh1) | 0;
        mid = mid + Math.imul(ah1, bl1) | 0;
        hi = hi + Math.imul(ah1, bh1) | 0;
        lo = lo + Math.imul(al0, bl2) | 0;
        mid = mid + Math.imul(al0, bh2) | 0;
        mid = mid + Math.imul(ah0, bl2) | 0;
        hi = hi + Math.imul(ah0, bh2) | 0;
        var w22 = (c3 + lo | 0) + ((mid & 8191) << 13) | 0;
        c3 = (hi + (mid >>> 13) | 0) + (w22 >>> 26) | 0;
        w22 &= 67108863;
        lo = Math.imul(al3, bl0);
        mid = Math.imul(al3, bh0);
        mid = mid + Math.imul(ah3, bl0) | 0;
        hi = Math.imul(ah3, bh0);
        lo = lo + Math.imul(al2, bl1) | 0;
        mid = mid + Math.imul(al2, bh1) | 0;
        mid = mid + Math.imul(ah2, bl1) | 0;
        hi = hi + Math.imul(ah2, bh1) | 0;
        lo = lo + Math.imul(al1, bl2) | 0;
        mid = mid + Math.imul(al1, bh2) | 0;
        mid = mid + Math.imul(ah1, bl2) | 0;
        hi = hi + Math.imul(ah1, bh2) | 0;
        lo = lo + Math.imul(al0, bl3) | 0;
        mid = mid + Math.imul(al0, bh3) | 0;
        mid = mid + Math.imul(ah0, bl3) | 0;
        hi = hi + Math.imul(ah0, bh3) | 0;
        var w3 = (c3 + lo | 0) + ((mid & 8191) << 13) | 0;
        c3 = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
        w3 &= 67108863;
        lo = Math.imul(al4, bl0);
        mid = Math.imul(al4, bh0);
        mid = mid + Math.imul(ah4, bl0) | 0;
        hi = Math.imul(ah4, bh0);
        lo = lo + Math.imul(al3, bl1) | 0;
        mid = mid + Math.imul(al3, bh1) | 0;
        mid = mid + Math.imul(ah3, bl1) | 0;
        hi = hi + Math.imul(ah3, bh1) | 0;
        lo = lo + Math.imul(al2, bl2) | 0;
        mid = mid + Math.imul(al2, bh2) | 0;
        mid = mid + Math.imul(ah2, bl2) | 0;
        hi = hi + Math.imul(ah2, bh2) | 0;
        lo = lo + Math.imul(al1, bl3) | 0;
        mid = mid + Math.imul(al1, bh3) | 0;
        mid = mid + Math.imul(ah1, bl3) | 0;
        hi = hi + Math.imul(ah1, bh3) | 0;
        lo = lo + Math.imul(al0, bl4) | 0;
        mid = mid + Math.imul(al0, bh4) | 0;
        mid = mid + Math.imul(ah0, bl4) | 0;
        hi = hi + Math.imul(ah0, bh4) | 0;
        var w4 = (c3 + lo | 0) + ((mid & 8191) << 13) | 0;
        c3 = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
        w4 &= 67108863;
        lo = Math.imul(al5, bl0);
        mid = Math.imul(al5, bh0);
        mid = mid + Math.imul(ah5, bl0) | 0;
        hi = Math.imul(ah5, bh0);
        lo = lo + Math.imul(al4, bl1) | 0;
        mid = mid + Math.imul(al4, bh1) | 0;
        mid = mid + Math.imul(ah4, bl1) | 0;
        hi = hi + Math.imul(ah4, bh1) | 0;
        lo = lo + Math.imul(al3, bl2) | 0;
        mid = mid + Math.imul(al3, bh2) | 0;
        mid = mid + Math.imul(ah3, bl2) | 0;
        hi = hi + Math.imul(ah3, bh2) | 0;
        lo = lo + Math.imul(al2, bl3) | 0;
        mid = mid + Math.imul(al2, bh3) | 0;
        mid = mid + Math.imul(ah2, bl3) | 0;
        hi = hi + Math.imul(ah2, bh3) | 0;
        lo = lo + Math.imul(al1, bl4) | 0;
        mid = mid + Math.imul(al1, bh4) | 0;
        mid = mid + Math.imul(ah1, bl4) | 0;
        hi = hi + Math.imul(ah1, bh4) | 0;
        lo = lo + Math.imul(al0, bl5) | 0;
        mid = mid + Math.imul(al0, bh5) | 0;
        mid = mid + Math.imul(ah0, bl5) | 0;
        hi = hi + Math.imul(ah0, bh5) | 0;
        var w5 = (c3 + lo | 0) + ((mid & 8191) << 13) | 0;
        c3 = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
        w5 &= 67108863;
        lo = Math.imul(al6, bl0);
        mid = Math.imul(al6, bh0);
        mid = mid + Math.imul(ah6, bl0) | 0;
        hi = Math.imul(ah6, bh0);
        lo = lo + Math.imul(al5, bl1) | 0;
        mid = mid + Math.imul(al5, bh1) | 0;
        mid = mid + Math.imul(ah5, bl1) | 0;
        hi = hi + Math.imul(ah5, bh1) | 0;
        lo = lo + Math.imul(al4, bl2) | 0;
        mid = mid + Math.imul(al4, bh2) | 0;
        mid = mid + Math.imul(ah4, bl2) | 0;
        hi = hi + Math.imul(ah4, bh2) | 0;
        lo = lo + Math.imul(al3, bl3) | 0;
        mid = mid + Math.imul(al3, bh3) | 0;
        mid = mid + Math.imul(ah3, bl3) | 0;
        hi = hi + Math.imul(ah3, bh3) | 0;
        lo = lo + Math.imul(al2, bl4) | 0;
        mid = mid + Math.imul(al2, bh4) | 0;
        mid = mid + Math.imul(ah2, bl4) | 0;
        hi = hi + Math.imul(ah2, bh4) | 0;
        lo = lo + Math.imul(al1, bl5) | 0;
        mid = mid + Math.imul(al1, bh5) | 0;
        mid = mid + Math.imul(ah1, bl5) | 0;
        hi = hi + Math.imul(ah1, bh5) | 0;
        lo = lo + Math.imul(al0, bl6) | 0;
        mid = mid + Math.imul(al0, bh6) | 0;
        mid = mid + Math.imul(ah0, bl6) | 0;
        hi = hi + Math.imul(ah0, bh6) | 0;
        var w6 = (c3 + lo | 0) + ((mid & 8191) << 13) | 0;
        c3 = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
        w6 &= 67108863;
        lo = Math.imul(al7, bl0);
        mid = Math.imul(al7, bh0);
        mid = mid + Math.imul(ah7, bl0) | 0;
        hi = Math.imul(ah7, bh0);
        lo = lo + Math.imul(al6, bl1) | 0;
        mid = mid + Math.imul(al6, bh1) | 0;
        mid = mid + Math.imul(ah6, bl1) | 0;
        hi = hi + Math.imul(ah6, bh1) | 0;
        lo = lo + Math.imul(al5, bl2) | 0;
        mid = mid + Math.imul(al5, bh2) | 0;
        mid = mid + Math.imul(ah5, bl2) | 0;
        hi = hi + Math.imul(ah5, bh2) | 0;
        lo = lo + Math.imul(al4, bl3) | 0;
        mid = mid + Math.imul(al4, bh3) | 0;
        mid = mid + Math.imul(ah4, bl3) | 0;
        hi = hi + Math.imul(ah4, bh3) | 0;
        lo = lo + Math.imul(al3, bl4) | 0;
        mid = mid + Math.imul(al3, bh4) | 0;
        mid = mid + Math.imul(ah3, bl4) | 0;
        hi = hi + Math.imul(ah3, bh4) | 0;
        lo = lo + Math.imul(al2, bl5) | 0;
        mid = mid + Math.imul(al2, bh5) | 0;
        mid = mid + Math.imul(ah2, bl5) | 0;
        hi = hi + Math.imul(ah2, bh5) | 0;
        lo = lo + Math.imul(al1, bl6) | 0;
        mid = mid + Math.imul(al1, bh6) | 0;
        mid = mid + Math.imul(ah1, bl6) | 0;
        hi = hi + Math.imul(ah1, bh6) | 0;
        lo = lo + Math.imul(al0, bl7) | 0;
        mid = mid + Math.imul(al0, bh7) | 0;
        mid = mid + Math.imul(ah0, bl7) | 0;
        hi = hi + Math.imul(ah0, bh7) | 0;
        var w7 = (c3 + lo | 0) + ((mid & 8191) << 13) | 0;
        c3 = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
        w7 &= 67108863;
        lo = Math.imul(al8, bl0);
        mid = Math.imul(al8, bh0);
        mid = mid + Math.imul(ah8, bl0) | 0;
        hi = Math.imul(ah8, bh0);
        lo = lo + Math.imul(al7, bl1) | 0;
        mid = mid + Math.imul(al7, bh1) | 0;
        mid = mid + Math.imul(ah7, bl1) | 0;
        hi = hi + Math.imul(ah7, bh1) | 0;
        lo = lo + Math.imul(al6, bl2) | 0;
        mid = mid + Math.imul(al6, bh2) | 0;
        mid = mid + Math.imul(ah6, bl2) | 0;
        hi = hi + Math.imul(ah6, bh2) | 0;
        lo = lo + Math.imul(al5, bl3) | 0;
        mid = mid + Math.imul(al5, bh3) | 0;
        mid = mid + Math.imul(ah5, bl3) | 0;
        hi = hi + Math.imul(ah5, bh3) | 0;
        lo = lo + Math.imul(al4, bl4) | 0;
        mid = mid + Math.imul(al4, bh4) | 0;
        mid = mid + Math.imul(ah4, bl4) | 0;
        hi = hi + Math.imul(ah4, bh4) | 0;
        lo = lo + Math.imul(al3, bl5) | 0;
        mid = mid + Math.imul(al3, bh5) | 0;
        mid = mid + Math.imul(ah3, bl5) | 0;
        hi = hi + Math.imul(ah3, bh5) | 0;
        lo = lo + Math.imul(al2, bl6) | 0;
        mid = mid + Math.imul(al2, bh6) | 0;
        mid = mid + Math.imul(ah2, bl6) | 0;
        hi = hi + Math.imul(ah2, bh6) | 0;
        lo = lo + Math.imul(al1, bl7) | 0;
        mid = mid + Math.imul(al1, bh7) | 0;
        mid = mid + Math.imul(ah1, bl7) | 0;
        hi = hi + Math.imul(ah1, bh7) | 0;
        lo = lo + Math.imul(al0, bl8) | 0;
        mid = mid + Math.imul(al0, bh8) | 0;
        mid = mid + Math.imul(ah0, bl8) | 0;
        hi = hi + Math.imul(ah0, bh8) | 0;
        var w8 = (c3 + lo | 0) + ((mid & 8191) << 13) | 0;
        c3 = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
        w8 &= 67108863;
        lo = Math.imul(al9, bl0);
        mid = Math.imul(al9, bh0);
        mid = mid + Math.imul(ah9, bl0) | 0;
        hi = Math.imul(ah9, bh0);
        lo = lo + Math.imul(al8, bl1) | 0;
        mid = mid + Math.imul(al8, bh1) | 0;
        mid = mid + Math.imul(ah8, bl1) | 0;
        hi = hi + Math.imul(ah8, bh1) | 0;
        lo = lo + Math.imul(al7, bl2) | 0;
        mid = mid + Math.imul(al7, bh2) | 0;
        mid = mid + Math.imul(ah7, bl2) | 0;
        hi = hi + Math.imul(ah7, bh2) | 0;
        lo = lo + Math.imul(al6, bl3) | 0;
        mid = mid + Math.imul(al6, bh3) | 0;
        mid = mid + Math.imul(ah6, bl3) | 0;
        hi = hi + Math.imul(ah6, bh3) | 0;
        lo = lo + Math.imul(al5, bl4) | 0;
        mid = mid + Math.imul(al5, bh4) | 0;
        mid = mid + Math.imul(ah5, bl4) | 0;
        hi = hi + Math.imul(ah5, bh4) | 0;
        lo = lo + Math.imul(al4, bl5) | 0;
        mid = mid + Math.imul(al4, bh5) | 0;
        mid = mid + Math.imul(ah4, bl5) | 0;
        hi = hi + Math.imul(ah4, bh5) | 0;
        lo = lo + Math.imul(al3, bl6) | 0;
        mid = mid + Math.imul(al3, bh6) | 0;
        mid = mid + Math.imul(ah3, bl6) | 0;
        hi = hi + Math.imul(ah3, bh6) | 0;
        lo = lo + Math.imul(al2, bl7) | 0;
        mid = mid + Math.imul(al2, bh7) | 0;
        mid = mid + Math.imul(ah2, bl7) | 0;
        hi = hi + Math.imul(ah2, bh7) | 0;
        lo = lo + Math.imul(al1, bl8) | 0;
        mid = mid + Math.imul(al1, bh8) | 0;
        mid = mid + Math.imul(ah1, bl8) | 0;
        hi = hi + Math.imul(ah1, bh8) | 0;
        lo = lo + Math.imul(al0, bl9) | 0;
        mid = mid + Math.imul(al0, bh9) | 0;
        mid = mid + Math.imul(ah0, bl9) | 0;
        hi = hi + Math.imul(ah0, bh9) | 0;
        var w9 = (c3 + lo | 0) + ((mid & 8191) << 13) | 0;
        c3 = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
        w9 &= 67108863;
        lo = Math.imul(al9, bl1);
        mid = Math.imul(al9, bh1);
        mid = mid + Math.imul(ah9, bl1) | 0;
        hi = Math.imul(ah9, bh1);
        lo = lo + Math.imul(al8, bl2) | 0;
        mid = mid + Math.imul(al8, bh2) | 0;
        mid = mid + Math.imul(ah8, bl2) | 0;
        hi = hi + Math.imul(ah8, bh2) | 0;
        lo = lo + Math.imul(al7, bl3) | 0;
        mid = mid + Math.imul(al7, bh3) | 0;
        mid = mid + Math.imul(ah7, bl3) | 0;
        hi = hi + Math.imul(ah7, bh3) | 0;
        lo = lo + Math.imul(al6, bl4) | 0;
        mid = mid + Math.imul(al6, bh4) | 0;
        mid = mid + Math.imul(ah6, bl4) | 0;
        hi = hi + Math.imul(ah6, bh4) | 0;
        lo = lo + Math.imul(al5, bl5) | 0;
        mid = mid + Math.imul(al5, bh5) | 0;
        mid = mid + Math.imul(ah5, bl5) | 0;
        hi = hi + Math.imul(ah5, bh5) | 0;
        lo = lo + Math.imul(al4, bl6) | 0;
        mid = mid + Math.imul(al4, bh6) | 0;
        mid = mid + Math.imul(ah4, bl6) | 0;
        hi = hi + Math.imul(ah4, bh6) | 0;
        lo = lo + Math.imul(al3, bl7) | 0;
        mid = mid + Math.imul(al3, bh7) | 0;
        mid = mid + Math.imul(ah3, bl7) | 0;
        hi = hi + Math.imul(ah3, bh7) | 0;
        lo = lo + Math.imul(al2, bl8) | 0;
        mid = mid + Math.imul(al2, bh8) | 0;
        mid = mid + Math.imul(ah2, bl8) | 0;
        hi = hi + Math.imul(ah2, bh8) | 0;
        lo = lo + Math.imul(al1, bl9) | 0;
        mid = mid + Math.imul(al1, bh9) | 0;
        mid = mid + Math.imul(ah1, bl9) | 0;
        hi = hi + Math.imul(ah1, bh9) | 0;
        var w10 = (c3 + lo | 0) + ((mid & 8191) << 13) | 0;
        c3 = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
        w10 &= 67108863;
        lo = Math.imul(al9, bl2);
        mid = Math.imul(al9, bh2);
        mid = mid + Math.imul(ah9, bl2) | 0;
        hi = Math.imul(ah9, bh2);
        lo = lo + Math.imul(al8, bl3) | 0;
        mid = mid + Math.imul(al8, bh3) | 0;
        mid = mid + Math.imul(ah8, bl3) | 0;
        hi = hi + Math.imul(ah8, bh3) | 0;
        lo = lo + Math.imul(al7, bl4) | 0;
        mid = mid + Math.imul(al7, bh4) | 0;
        mid = mid + Math.imul(ah7, bl4) | 0;
        hi = hi + Math.imul(ah7, bh4) | 0;
        lo = lo + Math.imul(al6, bl5) | 0;
        mid = mid + Math.imul(al6, bh5) | 0;
        mid = mid + Math.imul(ah6, bl5) | 0;
        hi = hi + Math.imul(ah6, bh5) | 0;
        lo = lo + Math.imul(al5, bl6) | 0;
        mid = mid + Math.imul(al5, bh6) | 0;
        mid = mid + Math.imul(ah5, bl6) | 0;
        hi = hi + Math.imul(ah5, bh6) | 0;
        lo = lo + Math.imul(al4, bl7) | 0;
        mid = mid + Math.imul(al4, bh7) | 0;
        mid = mid + Math.imul(ah4, bl7) | 0;
        hi = hi + Math.imul(ah4, bh7) | 0;
        lo = lo + Math.imul(al3, bl8) | 0;
        mid = mid + Math.imul(al3, bh8) | 0;
        mid = mid + Math.imul(ah3, bl8) | 0;
        hi = hi + Math.imul(ah3, bh8) | 0;
        lo = lo + Math.imul(al2, bl9) | 0;
        mid = mid + Math.imul(al2, bh9) | 0;
        mid = mid + Math.imul(ah2, bl9) | 0;
        hi = hi + Math.imul(ah2, bh9) | 0;
        var w11 = (c3 + lo | 0) + ((mid & 8191) << 13) | 0;
        c3 = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
        w11 &= 67108863;
        lo = Math.imul(al9, bl3);
        mid = Math.imul(al9, bh3);
        mid = mid + Math.imul(ah9, bl3) | 0;
        hi = Math.imul(ah9, bh3);
        lo = lo + Math.imul(al8, bl4) | 0;
        mid = mid + Math.imul(al8, bh4) | 0;
        mid = mid + Math.imul(ah8, bl4) | 0;
        hi = hi + Math.imul(ah8, bh4) | 0;
        lo = lo + Math.imul(al7, bl5) | 0;
        mid = mid + Math.imul(al7, bh5) | 0;
        mid = mid + Math.imul(ah7, bl5) | 0;
        hi = hi + Math.imul(ah7, bh5) | 0;
        lo = lo + Math.imul(al6, bl6) | 0;
        mid = mid + Math.imul(al6, bh6) | 0;
        mid = mid + Math.imul(ah6, bl6) | 0;
        hi = hi + Math.imul(ah6, bh6) | 0;
        lo = lo + Math.imul(al5, bl7) | 0;
        mid = mid + Math.imul(al5, bh7) | 0;
        mid = mid + Math.imul(ah5, bl7) | 0;
        hi = hi + Math.imul(ah5, bh7) | 0;
        lo = lo + Math.imul(al4, bl8) | 0;
        mid = mid + Math.imul(al4, bh8) | 0;
        mid = mid + Math.imul(ah4, bl8) | 0;
        hi = hi + Math.imul(ah4, bh8) | 0;
        lo = lo + Math.imul(al3, bl9) | 0;
        mid = mid + Math.imul(al3, bh9) | 0;
        mid = mid + Math.imul(ah3, bl9) | 0;
        hi = hi + Math.imul(ah3, bh9) | 0;
        var w12 = (c3 + lo | 0) + ((mid & 8191) << 13) | 0;
        c3 = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
        w12 &= 67108863;
        lo = Math.imul(al9, bl4);
        mid = Math.imul(al9, bh4);
        mid = mid + Math.imul(ah9, bl4) | 0;
        hi = Math.imul(ah9, bh4);
        lo = lo + Math.imul(al8, bl5) | 0;
        mid = mid + Math.imul(al8, bh5) | 0;
        mid = mid + Math.imul(ah8, bl5) | 0;
        hi = hi + Math.imul(ah8, bh5) | 0;
        lo = lo + Math.imul(al7, bl6) | 0;
        mid = mid + Math.imul(al7, bh6) | 0;
        mid = mid + Math.imul(ah7, bl6) | 0;
        hi = hi + Math.imul(ah7, bh6) | 0;
        lo = lo + Math.imul(al6, bl7) | 0;
        mid = mid + Math.imul(al6, bh7) | 0;
        mid = mid + Math.imul(ah6, bl7) | 0;
        hi = hi + Math.imul(ah6, bh7) | 0;
        lo = lo + Math.imul(al5, bl8) | 0;
        mid = mid + Math.imul(al5, bh8) | 0;
        mid = mid + Math.imul(ah5, bl8) | 0;
        hi = hi + Math.imul(ah5, bh8) | 0;
        lo = lo + Math.imul(al4, bl9) | 0;
        mid = mid + Math.imul(al4, bh9) | 0;
        mid = mid + Math.imul(ah4, bl9) | 0;
        hi = hi + Math.imul(ah4, bh9) | 0;
        var w13 = (c3 + lo | 0) + ((mid & 8191) << 13) | 0;
        c3 = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
        w13 &= 67108863;
        lo = Math.imul(al9, bl5);
        mid = Math.imul(al9, bh5);
        mid = mid + Math.imul(ah9, bl5) | 0;
        hi = Math.imul(ah9, bh5);
        lo = lo + Math.imul(al8, bl6) | 0;
        mid = mid + Math.imul(al8, bh6) | 0;
        mid = mid + Math.imul(ah8, bl6) | 0;
        hi = hi + Math.imul(ah8, bh6) | 0;
        lo = lo + Math.imul(al7, bl7) | 0;
        mid = mid + Math.imul(al7, bh7) | 0;
        mid = mid + Math.imul(ah7, bl7) | 0;
        hi = hi + Math.imul(ah7, bh7) | 0;
        lo = lo + Math.imul(al6, bl8) | 0;
        mid = mid + Math.imul(al6, bh8) | 0;
        mid = mid + Math.imul(ah6, bl8) | 0;
        hi = hi + Math.imul(ah6, bh8) | 0;
        lo = lo + Math.imul(al5, bl9) | 0;
        mid = mid + Math.imul(al5, bh9) | 0;
        mid = mid + Math.imul(ah5, bl9) | 0;
        hi = hi + Math.imul(ah5, bh9) | 0;
        var w14 = (c3 + lo | 0) + ((mid & 8191) << 13) | 0;
        c3 = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
        w14 &= 67108863;
        lo = Math.imul(al9, bl6);
        mid = Math.imul(al9, bh6);
        mid = mid + Math.imul(ah9, bl6) | 0;
        hi = Math.imul(ah9, bh6);
        lo = lo + Math.imul(al8, bl7) | 0;
        mid = mid + Math.imul(al8, bh7) | 0;
        mid = mid + Math.imul(ah8, bl7) | 0;
        hi = hi + Math.imul(ah8, bh7) | 0;
        lo = lo + Math.imul(al7, bl8) | 0;
        mid = mid + Math.imul(al7, bh8) | 0;
        mid = mid + Math.imul(ah7, bl8) | 0;
        hi = hi + Math.imul(ah7, bh8) | 0;
        lo = lo + Math.imul(al6, bl9) | 0;
        mid = mid + Math.imul(al6, bh9) | 0;
        mid = mid + Math.imul(ah6, bl9) | 0;
        hi = hi + Math.imul(ah6, bh9) | 0;
        var w15 = (c3 + lo | 0) + ((mid & 8191) << 13) | 0;
        c3 = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
        w15 &= 67108863;
        lo = Math.imul(al9, bl7);
        mid = Math.imul(al9, bh7);
        mid = mid + Math.imul(ah9, bl7) | 0;
        hi = Math.imul(ah9, bh7);
        lo = lo + Math.imul(al8, bl8) | 0;
        mid = mid + Math.imul(al8, bh8) | 0;
        mid = mid + Math.imul(ah8, bl8) | 0;
        hi = hi + Math.imul(ah8, bh8) | 0;
        lo = lo + Math.imul(al7, bl9) | 0;
        mid = mid + Math.imul(al7, bh9) | 0;
        mid = mid + Math.imul(ah7, bl9) | 0;
        hi = hi + Math.imul(ah7, bh9) | 0;
        var w16 = (c3 + lo | 0) + ((mid & 8191) << 13) | 0;
        c3 = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
        w16 &= 67108863;
        lo = Math.imul(al9, bl8);
        mid = Math.imul(al9, bh8);
        mid = mid + Math.imul(ah9, bl8) | 0;
        hi = Math.imul(ah9, bh8);
        lo = lo + Math.imul(al8, bl9) | 0;
        mid = mid + Math.imul(al8, bh9) | 0;
        mid = mid + Math.imul(ah8, bl9) | 0;
        hi = hi + Math.imul(ah8, bh9) | 0;
        var w17 = (c3 + lo | 0) + ((mid & 8191) << 13) | 0;
        c3 = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
        w17 &= 67108863;
        lo = Math.imul(al9, bl9);
        mid = Math.imul(al9, bh9);
        mid = mid + Math.imul(ah9, bl9) | 0;
        hi = Math.imul(ah9, bh9);
        var w18 = (c3 + lo | 0) + ((mid & 8191) << 13) | 0;
        c3 = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
        w18 &= 67108863;
        o3[0] = w0;
        o3[1] = w1;
        o3[2] = w22;
        o3[3] = w3;
        o3[4] = w4;
        o3[5] = w5;
        o3[6] = w6;
        o3[7] = w7;
        o3[8] = w8;
        o3[9] = w9;
        o3[10] = w10;
        o3[11] = w11;
        o3[12] = w12;
        o3[13] = w13;
        o3[14] = w14;
        o3[15] = w15;
        o3[16] = w16;
        o3[17] = w17;
        o3[18] = w18;
        if (c3 !== 0) {
          o3[19] = c3;
          out.length++;
        }
        return out;
      };
      if (!Math.imul) {
        comb10MulTo = smallMulTo;
      }
      function bigMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative;
        out.length = self2.length + num.length;
        var carry = 0;
        var hncarry = 0;
        for (var k3 = 0; k3 < out.length - 1; k3++) {
          var ncarry = hncarry;
          hncarry = 0;
          var rword = carry & 67108863;
          var maxJ = Math.min(k3, num.length - 1);
          for (var j3 = Math.max(0, k3 - self2.length + 1); j3 <= maxJ; j3++) {
            var i3 = k3 - j3;
            var a3 = self2.words[i3] | 0;
            var b3 = num.words[j3] | 0;
            var r3 = a3 * b3;
            var lo = r3 & 67108863;
            ncarry = ncarry + (r3 / 67108864 | 0) | 0;
            lo = lo + rword | 0;
            rword = lo & 67108863;
            ncarry = ncarry + (lo >>> 26) | 0;
            hncarry += ncarry >>> 26;
            ncarry &= 67108863;
          }
          out.words[k3] = rword;
          carry = ncarry;
          ncarry = hncarry;
        }
        if (carry !== 0) {
          out.words[k3] = carry;
        } else {
          out.length--;
        }
        return out.strip();
      }
      function jumboMulTo(self2, num, out) {
        var fftm = new FFTM();
        return fftm.mulp(self2, num, out);
      }
      BN3.prototype.mulTo = function mulTo(num, out) {
        var res;
        var len = this.length + num.length;
        if (this.length === 10 && num.length === 10) {
          res = comb10MulTo(this, num, out);
        } else if (len < 63) {
          res = smallMulTo(this, num, out);
        } else if (len < 1024) {
          res = bigMulTo(this, num, out);
        } else {
          res = jumboMulTo(this, num, out);
        }
        return res;
      };
      function FFTM(x3, y3) {
        this.x = x3;
        this.y = y3;
      }
      FFTM.prototype.makeRBT = function makeRBT(N3) {
        var t3 = new Array(N3);
        var l3 = BN3.prototype._countBits(N3) - 1;
        for (var i3 = 0; i3 < N3; i3++) {
          t3[i3] = this.revBin(i3, l3, N3);
        }
        return t3;
      };
      FFTM.prototype.revBin = function revBin(x3, l3, N3) {
        if (x3 === 0 || x3 === N3 - 1)
          return x3;
        var rb = 0;
        for (var i3 = 0; i3 < l3; i3++) {
          rb |= (x3 & 1) << l3 - i3 - 1;
          x3 >>= 1;
        }
        return rb;
      };
      FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N3) {
        for (var i3 = 0; i3 < N3; i3++) {
          rtws[i3] = rws[rbt[i3]];
          itws[i3] = iws[rbt[i3]];
        }
      };
      FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N3, rbt) {
        this.permute(rbt, rws, iws, rtws, itws, N3);
        for (var s2 = 1; s2 < N3; s2 <<= 1) {
          var l3 = s2 << 1;
          var rtwdf = Math.cos(2 * Math.PI / l3);
          var itwdf = Math.sin(2 * Math.PI / l3);
          for (var p2 = 0; p2 < N3; p2 += l3) {
            var rtwdf_ = rtwdf;
            var itwdf_ = itwdf;
            for (var j3 = 0; j3 < s2; j3++) {
              var re = rtws[p2 + j3];
              var ie = itws[p2 + j3];
              var ro = rtws[p2 + j3 + s2];
              var io = itws[p2 + j3 + s2];
              var rx = rtwdf_ * ro - itwdf_ * io;
              io = rtwdf_ * io + itwdf_ * ro;
              ro = rx;
              rtws[p2 + j3] = re + ro;
              itws[p2 + j3] = ie + io;
              rtws[p2 + j3 + s2] = re - ro;
              itws[p2 + j3 + s2] = ie - io;
              if (j3 !== l3) {
                rx = rtwdf * rtwdf_ - itwdf * itwdf_;
                itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                rtwdf_ = rx;
              }
            }
          }
        }
      };
      FFTM.prototype.guessLen13b = function guessLen13b(n2, m3) {
        var N3 = Math.max(m3, n2) | 1;
        var odd = N3 & 1;
        var i3 = 0;
        for (N3 = N3 / 2 | 0; N3; N3 = N3 >>> 1) {
          i3++;
        }
        return 1 << i3 + 1 + odd;
      };
      FFTM.prototype.conjugate = function conjugate(rws, iws, N3) {
        if (N3 <= 1)
          return;
        for (var i3 = 0; i3 < N3 / 2; i3++) {
          var t3 = rws[i3];
          rws[i3] = rws[N3 - i3 - 1];
          rws[N3 - i3 - 1] = t3;
          t3 = iws[i3];
          iws[i3] = -iws[N3 - i3 - 1];
          iws[N3 - i3 - 1] = -t3;
        }
      };
      FFTM.prototype.normalize13b = function normalize13b(ws, N3) {
        var carry = 0;
        for (var i3 = 0; i3 < N3 / 2; i3++) {
          var w3 = Math.round(ws[2 * i3 + 1] / N3) * 8192 + Math.round(ws[2 * i3] / N3) + carry;
          ws[i3] = w3 & 67108863;
          if (w3 < 67108864) {
            carry = 0;
          } else {
            carry = w3 / 67108864 | 0;
          }
        }
        return ws;
      };
      FFTM.prototype.convert13b = function convert13b(ws, len, rws, N3) {
        var carry = 0;
        for (var i3 = 0; i3 < len; i3++) {
          carry = carry + (ws[i3] | 0);
          rws[2 * i3] = carry & 8191;
          carry = carry >>> 13;
          rws[2 * i3 + 1] = carry & 8191;
          carry = carry >>> 13;
        }
        for (i3 = 2 * len; i3 < N3; ++i3) {
          rws[i3] = 0;
        }
        assert2(carry === 0);
        assert2((carry & ~8191) === 0);
      };
      FFTM.prototype.stub = function stub(N3) {
        var ph = new Array(N3);
        for (var i3 = 0; i3 < N3; i3++) {
          ph[i3] = 0;
        }
        return ph;
      };
      FFTM.prototype.mulp = function mulp(x3, y3, out) {
        var N3 = 2 * this.guessLen13b(x3.length, y3.length);
        var rbt = this.makeRBT(N3);
        var _2 = this.stub(N3);
        var rws = new Array(N3);
        var rwst = new Array(N3);
        var iwst = new Array(N3);
        var nrws = new Array(N3);
        var nrwst = new Array(N3);
        var niwst = new Array(N3);
        var rmws = out.words;
        rmws.length = N3;
        this.convert13b(x3.words, x3.length, rws, N3);
        this.convert13b(y3.words, y3.length, nrws, N3);
        this.transform(rws, _2, rwst, iwst, N3, rbt);
        this.transform(nrws, _2, nrwst, niwst, N3, rbt);
        for (var i3 = 0; i3 < N3; i3++) {
          var rx = rwst[i3] * nrwst[i3] - iwst[i3] * niwst[i3];
          iwst[i3] = rwst[i3] * niwst[i3] + iwst[i3] * nrwst[i3];
          rwst[i3] = rx;
        }
        this.conjugate(rwst, iwst, N3);
        this.transform(rwst, iwst, rmws, _2, N3, rbt);
        this.conjugate(rmws, _2, N3);
        this.normalize13b(rmws, N3);
        out.negative = x3.negative ^ y3.negative;
        out.length = x3.length + y3.length;
        return out.strip();
      };
      BN3.prototype.mul = function mul3(num) {
        var out = new BN3(null);
        out.words = new Array(this.length + num.length);
        return this.mulTo(num, out);
      };
      BN3.prototype.mulf = function mulf(num) {
        var out = new BN3(null);
        out.words = new Array(this.length + num.length);
        return jumboMulTo(this, num, out);
      };
      BN3.prototype.imul = function imul(num) {
        return this.clone().mulTo(num, this);
      };
      BN3.prototype.imuln = function imuln(num) {
        assert2(typeof num === "number");
        assert2(num < 67108864);
        var carry = 0;
        for (var i3 = 0; i3 < this.length; i3++) {
          var w3 = (this.words[i3] | 0) * num;
          var lo = (w3 & 67108863) + (carry & 67108863);
          carry >>= 26;
          carry += w3 / 67108864 | 0;
          carry += lo >>> 26;
          this.words[i3] = lo & 67108863;
        }
        if (carry !== 0) {
          this.words[i3] = carry;
          this.length++;
        }
        return this;
      };
      BN3.prototype.muln = function muln(num) {
        return this.clone().imuln(num);
      };
      BN3.prototype.sqr = function sqr() {
        return this.mul(this);
      };
      BN3.prototype.isqr = function isqr() {
        return this.imul(this.clone());
      };
      BN3.prototype.pow = function pow(num) {
        var w3 = toBitArray(num);
        if (w3.length === 0)
          return new BN3(1);
        var res = this;
        for (var i3 = 0; i3 < w3.length; i3++, res = res.sqr()) {
          if (w3[i3] !== 0)
            break;
        }
        if (++i3 < w3.length) {
          for (var q = res.sqr(); i3 < w3.length; i3++, q = q.sqr()) {
            if (w3[i3] === 0)
              continue;
            res = res.mul(q);
          }
        }
        return res;
      };
      BN3.prototype.iushln = function iushln(bits) {
        assert2(typeof bits === "number" && bits >= 0);
        var r3 = bits % 26;
        var s2 = (bits - r3) / 26;
        var carryMask = 67108863 >>> 26 - r3 << 26 - r3;
        var i3;
        if (r3 !== 0) {
          var carry = 0;
          for (i3 = 0; i3 < this.length; i3++) {
            var newCarry = this.words[i3] & carryMask;
            var c3 = (this.words[i3] | 0) - newCarry << r3;
            this.words[i3] = c3 | carry;
            carry = newCarry >>> 26 - r3;
          }
          if (carry) {
            this.words[i3] = carry;
            this.length++;
          }
        }
        if (s2 !== 0) {
          for (i3 = this.length - 1; i3 >= 0; i3--) {
            this.words[i3 + s2] = this.words[i3];
          }
          for (i3 = 0; i3 < s2; i3++) {
            this.words[i3] = 0;
          }
          this.length += s2;
        }
        return this.strip();
      };
      BN3.prototype.ishln = function ishln(bits) {
        assert2(this.negative === 0);
        return this.iushln(bits);
      };
      BN3.prototype.iushrn = function iushrn(bits, hint, extended) {
        assert2(typeof bits === "number" && bits >= 0);
        var h2;
        if (hint) {
          h2 = (hint - hint % 26) / 26;
        } else {
          h2 = 0;
        }
        var r3 = bits % 26;
        var s2 = Math.min((bits - r3) / 26, this.length);
        var mask = 67108863 ^ 67108863 >>> r3 << r3;
        var maskedWords = extended;
        h2 -= s2;
        h2 = Math.max(0, h2);
        if (maskedWords) {
          for (var i3 = 0; i3 < s2; i3++) {
            maskedWords.words[i3] = this.words[i3];
          }
          maskedWords.length = s2;
        }
        if (s2 === 0) {
        } else if (this.length > s2) {
          this.length -= s2;
          for (i3 = 0; i3 < this.length; i3++) {
            this.words[i3] = this.words[i3 + s2];
          }
        } else {
          this.words[0] = 0;
          this.length = 1;
        }
        var carry = 0;
        for (i3 = this.length - 1; i3 >= 0 && (carry !== 0 || i3 >= h2); i3--) {
          var word = this.words[i3] | 0;
          this.words[i3] = carry << 26 - r3 | word >>> r3;
          carry = word & mask;
        }
        if (maskedWords && carry !== 0) {
          maskedWords.words[maskedWords.length++] = carry;
        }
        if (this.length === 0) {
          this.words[0] = 0;
          this.length = 1;
        }
        return this.strip();
      };
      BN3.prototype.ishrn = function ishrn(bits, hint, extended) {
        assert2(this.negative === 0);
        return this.iushrn(bits, hint, extended);
      };
      BN3.prototype.shln = function shln(bits) {
        return this.clone().ishln(bits);
      };
      BN3.prototype.ushln = function ushln(bits) {
        return this.clone().iushln(bits);
      };
      BN3.prototype.shrn = function shrn(bits) {
        return this.clone().ishrn(bits);
      };
      BN3.prototype.ushrn = function ushrn(bits) {
        return this.clone().iushrn(bits);
      };
      BN3.prototype.testn = function testn(bit) {
        assert2(typeof bit === "number" && bit >= 0);
        var r3 = bit % 26;
        var s2 = (bit - r3) / 26;
        var q = 1 << r3;
        if (this.length <= s2)
          return false;
        var w3 = this.words[s2];
        return !!(w3 & q);
      };
      BN3.prototype.imaskn = function imaskn(bits) {
        assert2(typeof bits === "number" && bits >= 0);
        var r3 = bits % 26;
        var s2 = (bits - r3) / 26;
        assert2(this.negative === 0, "imaskn works only with positive numbers");
        if (this.length <= s2) {
          return this;
        }
        if (r3 !== 0) {
          s2++;
        }
        this.length = Math.min(s2, this.length);
        if (r3 !== 0) {
          var mask = 67108863 ^ 67108863 >>> r3 << r3;
          this.words[this.length - 1] &= mask;
        }
        return this.strip();
      };
      BN3.prototype.maskn = function maskn(bits) {
        return this.clone().imaskn(bits);
      };
      BN3.prototype.iaddn = function iaddn(num) {
        assert2(typeof num === "number");
        assert2(num < 67108864);
        if (num < 0)
          return this.isubn(-num);
        if (this.negative !== 0) {
          if (this.length === 1 && (this.words[0] | 0) < num) {
            this.words[0] = num - (this.words[0] | 0);
            this.negative = 0;
            return this;
          }
          this.negative = 0;
          this.isubn(num);
          this.negative = 1;
          return this;
        }
        return this._iaddn(num);
      };
      BN3.prototype._iaddn = function _iaddn(num) {
        this.words[0] += num;
        for (var i3 = 0; i3 < this.length && this.words[i3] >= 67108864; i3++) {
          this.words[i3] -= 67108864;
          if (i3 === this.length - 1) {
            this.words[i3 + 1] = 1;
          } else {
            this.words[i3 + 1]++;
          }
        }
        this.length = Math.max(this.length, i3 + 1);
        return this;
      };
      BN3.prototype.isubn = function isubn(num) {
        assert2(typeof num === "number");
        assert2(num < 67108864);
        if (num < 0)
          return this.iaddn(-num);
        if (this.negative !== 0) {
          this.negative = 0;
          this.iaddn(num);
          this.negative = 1;
          return this;
        }
        this.words[0] -= num;
        if (this.length === 1 && this.words[0] < 0) {
          this.words[0] = -this.words[0];
          this.negative = 1;
        } else {
          for (var i3 = 0; i3 < this.length && this.words[i3] < 0; i3++) {
            this.words[i3] += 67108864;
            this.words[i3 + 1] -= 1;
          }
        }
        return this.strip();
      };
      BN3.prototype.addn = function addn(num) {
        return this.clone().iaddn(num);
      };
      BN3.prototype.subn = function subn(num) {
        return this.clone().isubn(num);
      };
      BN3.prototype.iabs = function iabs() {
        this.negative = 0;
        return this;
      };
      BN3.prototype.abs = function abs() {
        return this.clone().iabs();
      };
      BN3.prototype._ishlnsubmul = function _ishlnsubmul(num, mul3, shift) {
        var len = num.length + shift;
        var i3;
        this._expand(len);
        var w3;
        var carry = 0;
        for (i3 = 0; i3 < num.length; i3++) {
          w3 = (this.words[i3 + shift] | 0) + carry;
          var right = (num.words[i3] | 0) * mul3;
          w3 -= right & 67108863;
          carry = (w3 >> 26) - (right / 67108864 | 0);
          this.words[i3 + shift] = w3 & 67108863;
        }
        for (; i3 < this.length - shift; i3++) {
          w3 = (this.words[i3 + shift] | 0) + carry;
          carry = w3 >> 26;
          this.words[i3 + shift] = w3 & 67108863;
        }
        if (carry === 0)
          return this.strip();
        assert2(carry === -1);
        carry = 0;
        for (i3 = 0; i3 < this.length; i3++) {
          w3 = -(this.words[i3] | 0) + carry;
          carry = w3 >> 26;
          this.words[i3] = w3 & 67108863;
        }
        this.negative = 1;
        return this.strip();
      };
      BN3.prototype._wordDiv = function _wordDiv(num, mode) {
        var shift = this.length - num.length;
        var a3 = this.clone();
        var b3 = num;
        var bhi = b3.words[b3.length - 1] | 0;
        var bhiBits = this._countBits(bhi);
        shift = 26 - bhiBits;
        if (shift !== 0) {
          b3 = b3.ushln(shift);
          a3.iushln(shift);
          bhi = b3.words[b3.length - 1] | 0;
        }
        var m3 = a3.length - b3.length;
        var q;
        if (mode !== "mod") {
          q = new BN3(null);
          q.length = m3 + 1;
          q.words = new Array(q.length);
          for (var i3 = 0; i3 < q.length; i3++) {
            q.words[i3] = 0;
          }
        }
        var diff = a3.clone()._ishlnsubmul(b3, 1, m3);
        if (diff.negative === 0) {
          a3 = diff;
          if (q) {
            q.words[m3] = 1;
          }
        }
        for (var j3 = m3 - 1; j3 >= 0; j3--) {
          var qj = (a3.words[b3.length + j3] | 0) * 67108864 + (a3.words[b3.length + j3 - 1] | 0);
          qj = Math.min(qj / bhi | 0, 67108863);
          a3._ishlnsubmul(b3, qj, j3);
          while (a3.negative !== 0) {
            qj--;
            a3.negative = 0;
            a3._ishlnsubmul(b3, 1, j3);
            if (!a3.isZero()) {
              a3.negative ^= 1;
            }
          }
          if (q) {
            q.words[j3] = qj;
          }
        }
        if (q) {
          q.strip();
        }
        a3.strip();
        if (mode !== "div" && shift !== 0) {
          a3.iushrn(shift);
        }
        return {
          div: q || null,
          mod: a3
        };
      };
      BN3.prototype.divmod = function divmod(num, mode, positive) {
        assert2(!num.isZero());
        if (this.isZero()) {
          return {
            div: new BN3(0),
            mod: new BN3(0)
          };
        }
        var div, mod, res;
        if (this.negative !== 0 && num.negative === 0) {
          res = this.neg().divmod(num, mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.iadd(num);
            }
          }
          return {
            div,
            mod
          };
        }
        if (this.negative === 0 && num.negative !== 0) {
          res = this.divmod(num.neg(), mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          return {
            div,
            mod: res.mod
          };
        }
        if ((this.negative & num.negative) !== 0) {
          res = this.neg().divmod(num.neg(), mode);
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.isub(num);
            }
          }
          return {
            div: res.div,
            mod
          };
        }
        if (num.length > this.length || this.cmp(num) < 0) {
          return {
            div: new BN3(0),
            mod: this
          };
        }
        if (num.length === 1) {
          if (mode === "div") {
            return {
              div: this.divn(num.words[0]),
              mod: null
            };
          }
          if (mode === "mod") {
            return {
              div: null,
              mod: new BN3(this.modn(num.words[0]))
            };
          }
          return {
            div: this.divn(num.words[0]),
            mod: new BN3(this.modn(num.words[0]))
          };
        }
        return this._wordDiv(num, mode);
      };
      BN3.prototype.div = function div(num) {
        return this.divmod(num, "div", false).div;
      };
      BN3.prototype.mod = function mod(num) {
        return this.divmod(num, "mod", false).mod;
      };
      BN3.prototype.umod = function umod(num) {
        return this.divmod(num, "mod", true).mod;
      };
      BN3.prototype.divRound = function divRound(num) {
        var dm = this.divmod(num);
        if (dm.mod.isZero())
          return dm.div;
        var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
        var half = num.ushrn(1);
        var r22 = num.andln(1);
        var cmp = mod.cmp(half);
        if (cmp < 0 || r22 === 1 && cmp === 0)
          return dm.div;
        return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
      };
      BN3.prototype.modn = function modn(num) {
        assert2(num <= 67108863);
        var p2 = (1 << 26) % num;
        var acc = 0;
        for (var i3 = this.length - 1; i3 >= 0; i3--) {
          acc = (p2 * acc + (this.words[i3] | 0)) % num;
        }
        return acc;
      };
      BN3.prototype.idivn = function idivn(num) {
        assert2(num <= 67108863);
        var carry = 0;
        for (var i3 = this.length - 1; i3 >= 0; i3--) {
          var w3 = (this.words[i3] | 0) + carry * 67108864;
          this.words[i3] = w3 / num | 0;
          carry = w3 % num;
        }
        return this.strip();
      };
      BN3.prototype.divn = function divn(num) {
        return this.clone().idivn(num);
      };
      BN3.prototype.egcd = function egcd(p2) {
        assert2(p2.negative === 0);
        assert2(!p2.isZero());
        var x3 = this;
        var y3 = p2.clone();
        if (x3.negative !== 0) {
          x3 = x3.umod(p2);
        } else {
          x3 = x3.clone();
        }
        var A = new BN3(1);
        var B = new BN3(0);
        var C2 = new BN3(0);
        var D2 = new BN3(1);
        var g3 = 0;
        while (x3.isEven() && y3.isEven()) {
          x3.iushrn(1);
          y3.iushrn(1);
          ++g3;
        }
        var yp = y3.clone();
        var xp = x3.clone();
        while (!x3.isZero()) {
          for (var i3 = 0, im = 1; (x3.words[0] & im) === 0 && i3 < 26; ++i3, im <<= 1)
            ;
          if (i3 > 0) {
            x3.iushrn(i3);
            while (i3-- > 0) {
              if (A.isOdd() || B.isOdd()) {
                A.iadd(yp);
                B.isub(xp);
              }
              A.iushrn(1);
              B.iushrn(1);
            }
          }
          for (var j3 = 0, jm = 1; (y3.words[0] & jm) === 0 && j3 < 26; ++j3, jm <<= 1)
            ;
          if (j3 > 0) {
            y3.iushrn(j3);
            while (j3-- > 0) {
              if (C2.isOdd() || D2.isOdd()) {
                C2.iadd(yp);
                D2.isub(xp);
              }
              C2.iushrn(1);
              D2.iushrn(1);
            }
          }
          if (x3.cmp(y3) >= 0) {
            x3.isub(y3);
            A.isub(C2);
            B.isub(D2);
          } else {
            y3.isub(x3);
            C2.isub(A);
            D2.isub(B);
          }
        }
        return {
          a: C2,
          b: D2,
          gcd: y3.iushln(g3)
        };
      };
      BN3.prototype._invmp = function _invmp(p2) {
        assert2(p2.negative === 0);
        assert2(!p2.isZero());
        var a3 = this;
        var b3 = p2.clone();
        if (a3.negative !== 0) {
          a3 = a3.umod(p2);
        } else {
          a3 = a3.clone();
        }
        var x1 = new BN3(1);
        var x22 = new BN3(0);
        var delta = b3.clone();
        while (a3.cmpn(1) > 0 && b3.cmpn(1) > 0) {
          for (var i3 = 0, im = 1; (a3.words[0] & im) === 0 && i3 < 26; ++i3, im <<= 1)
            ;
          if (i3 > 0) {
            a3.iushrn(i3);
            while (i3-- > 0) {
              if (x1.isOdd()) {
                x1.iadd(delta);
              }
              x1.iushrn(1);
            }
          }
          for (var j3 = 0, jm = 1; (b3.words[0] & jm) === 0 && j3 < 26; ++j3, jm <<= 1)
            ;
          if (j3 > 0) {
            b3.iushrn(j3);
            while (j3-- > 0) {
              if (x22.isOdd()) {
                x22.iadd(delta);
              }
              x22.iushrn(1);
            }
          }
          if (a3.cmp(b3) >= 0) {
            a3.isub(b3);
            x1.isub(x22);
          } else {
            b3.isub(a3);
            x22.isub(x1);
          }
        }
        var res;
        if (a3.cmpn(1) === 0) {
          res = x1;
        } else {
          res = x22;
        }
        if (res.cmpn(0) < 0) {
          res.iadd(p2);
        }
        return res;
      };
      BN3.prototype.gcd = function gcd(num) {
        if (this.isZero())
          return num.abs();
        if (num.isZero())
          return this.abs();
        var a3 = this.clone();
        var b3 = num.clone();
        a3.negative = 0;
        b3.negative = 0;
        for (var shift = 0; a3.isEven() && b3.isEven(); shift++) {
          a3.iushrn(1);
          b3.iushrn(1);
        }
        do {
          while (a3.isEven()) {
            a3.iushrn(1);
          }
          while (b3.isEven()) {
            b3.iushrn(1);
          }
          var r3 = a3.cmp(b3);
          if (r3 < 0) {
            var t3 = a3;
            a3 = b3;
            b3 = t3;
          } else if (r3 === 0 || b3.cmpn(1) === 0) {
            break;
          }
          a3.isub(b3);
        } while (true);
        return b3.iushln(shift);
      };
      BN3.prototype.invm = function invm(num) {
        return this.egcd(num).a.umod(num);
      };
      BN3.prototype.isEven = function isEven() {
        return (this.words[0] & 1) === 0;
      };
      BN3.prototype.isOdd = function isOdd() {
        return (this.words[0] & 1) === 1;
      };
      BN3.prototype.andln = function andln(num) {
        return this.words[0] & num;
      };
      BN3.prototype.bincn = function bincn(bit) {
        assert2(typeof bit === "number");
        var r3 = bit % 26;
        var s2 = (bit - r3) / 26;
        var q = 1 << r3;
        if (this.length <= s2) {
          this._expand(s2 + 1);
          this.words[s2] |= q;
          return this;
        }
        var carry = q;
        for (var i3 = s2; carry !== 0 && i3 < this.length; i3++) {
          var w3 = this.words[i3] | 0;
          w3 += carry;
          carry = w3 >>> 26;
          w3 &= 67108863;
          this.words[i3] = w3;
        }
        if (carry !== 0) {
          this.words[i3] = carry;
          this.length++;
        }
        return this;
      };
      BN3.prototype.isZero = function isZero() {
        return this.length === 1 && this.words[0] === 0;
      };
      BN3.prototype.cmpn = function cmpn(num) {
        var negative = num < 0;
        if (this.negative !== 0 && !negative)
          return -1;
        if (this.negative === 0 && negative)
          return 1;
        this.strip();
        var res;
        if (this.length > 1) {
          res = 1;
        } else {
          if (negative) {
            num = -num;
          }
          assert2(num <= 67108863, "Number is too big");
          var w3 = this.words[0] | 0;
          res = w3 === num ? 0 : w3 < num ? -1 : 1;
        }
        if (this.negative !== 0)
          return -res | 0;
        return res;
      };
      BN3.prototype.cmp = function cmp(num) {
        if (this.negative !== 0 && num.negative === 0)
          return -1;
        if (this.negative === 0 && num.negative !== 0)
          return 1;
        var res = this.ucmp(num);
        if (this.negative !== 0)
          return -res | 0;
        return res;
      };
      BN3.prototype.ucmp = function ucmp(num) {
        if (this.length > num.length)
          return 1;
        if (this.length < num.length)
          return -1;
        var res = 0;
        for (var i3 = this.length - 1; i3 >= 0; i3--) {
          var a3 = this.words[i3] | 0;
          var b3 = num.words[i3] | 0;
          if (a3 === b3)
            continue;
          if (a3 < b3) {
            res = -1;
          } else if (a3 > b3) {
            res = 1;
          }
          break;
        }
        return res;
      };
      BN3.prototype.gtn = function gtn(num) {
        return this.cmpn(num) === 1;
      };
      BN3.prototype.gt = function gt(num) {
        return this.cmp(num) === 1;
      };
      BN3.prototype.gten = function gten(num) {
        return this.cmpn(num) >= 0;
      };
      BN3.prototype.gte = function gte(num) {
        return this.cmp(num) >= 0;
      };
      BN3.prototype.ltn = function ltn(num) {
        return this.cmpn(num) === -1;
      };
      BN3.prototype.lt = function lt(num) {
        return this.cmp(num) === -1;
      };
      BN3.prototype.lten = function lten(num) {
        return this.cmpn(num) <= 0;
      };
      BN3.prototype.lte = function lte(num) {
        return this.cmp(num) <= 0;
      };
      BN3.prototype.eqn = function eqn(num) {
        return this.cmpn(num) === 0;
      };
      BN3.prototype.eq = function eq4(num) {
        return this.cmp(num) === 0;
      };
      BN3.red = function red(num) {
        return new Red(num);
      };
      BN3.prototype.toRed = function toRed(ctx) {
        assert2(!this.red, "Already a number in reduction context");
        assert2(this.negative === 0, "red works only with positives");
        return ctx.convertTo(this)._forceRed(ctx);
      };
      BN3.prototype.fromRed = function fromRed() {
        assert2(this.red, "fromRed works only with numbers in reduction context");
        return this.red.convertFrom(this);
      };
      BN3.prototype._forceRed = function _forceRed(ctx) {
        this.red = ctx;
        return this;
      };
      BN3.prototype.forceRed = function forceRed(ctx) {
        assert2(!this.red, "Already a number in reduction context");
        return this._forceRed(ctx);
      };
      BN3.prototype.redAdd = function redAdd(num) {
        assert2(this.red, "redAdd works only with red numbers");
        return this.red.add(this, num);
      };
      BN3.prototype.redIAdd = function redIAdd(num) {
        assert2(this.red, "redIAdd works only with red numbers");
        return this.red.iadd(this, num);
      };
      BN3.prototype.redSub = function redSub(num) {
        assert2(this.red, "redSub works only with red numbers");
        return this.red.sub(this, num);
      };
      BN3.prototype.redISub = function redISub(num) {
        assert2(this.red, "redISub works only with red numbers");
        return this.red.isub(this, num);
      };
      BN3.prototype.redShl = function redShl(num) {
        assert2(this.red, "redShl works only with red numbers");
        return this.red.shl(this, num);
      };
      BN3.prototype.redMul = function redMul(num) {
        assert2(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.mul(this, num);
      };
      BN3.prototype.redIMul = function redIMul(num) {
        assert2(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.imul(this, num);
      };
      BN3.prototype.redSqr = function redSqr() {
        assert2(this.red, "redSqr works only with red numbers");
        this.red._verify1(this);
        return this.red.sqr(this);
      };
      BN3.prototype.redISqr = function redISqr() {
        assert2(this.red, "redISqr works only with red numbers");
        this.red._verify1(this);
        return this.red.isqr(this);
      };
      BN3.prototype.redSqrt = function redSqrt() {
        assert2(this.red, "redSqrt works only with red numbers");
        this.red._verify1(this);
        return this.red.sqrt(this);
      };
      BN3.prototype.redInvm = function redInvm() {
        assert2(this.red, "redInvm works only with red numbers");
        this.red._verify1(this);
        return this.red.invm(this);
      };
      BN3.prototype.redNeg = function redNeg() {
        assert2(this.red, "redNeg works only with red numbers");
        this.red._verify1(this);
        return this.red.neg(this);
      };
      BN3.prototype.redPow = function redPow(num) {
        assert2(this.red && !num.red, "redPow(normalNum)");
        this.red._verify1(this);
        return this.red.pow(this, num);
      };
      var primes = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function MPrime(name2, p2) {
        this.name = name2;
        this.p = new BN3(p2, 16);
        this.n = this.p.bitLength();
        this.k = new BN3(1).iushln(this.n).isub(this.p);
        this.tmp = this._tmp();
      }
      MPrime.prototype._tmp = function _tmp() {
        var tmp = new BN3(null);
        tmp.words = new Array(Math.ceil(this.n / 13));
        return tmp;
      };
      MPrime.prototype.ireduce = function ireduce(num) {
        var r3 = num;
        var rlen;
        do {
          this.split(r3, this.tmp);
          r3 = this.imulK(r3);
          r3 = r3.iadd(this.tmp);
          rlen = r3.bitLength();
        } while (rlen > this.n);
        var cmp = rlen < this.n ? -1 : r3.ucmp(this.p);
        if (cmp === 0) {
          r3.words[0] = 0;
          r3.length = 1;
        } else if (cmp > 0) {
          r3.isub(this.p);
        } else {
          if (r3.strip !== void 0) {
            r3.strip();
          } else {
            r3._strip();
          }
        }
        return r3;
      };
      MPrime.prototype.split = function split(input, out) {
        input.iushrn(this.n, 0, out);
      };
      MPrime.prototype.imulK = function imulK(num) {
        return num.imul(this.k);
      };
      function K256() {
        MPrime.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
      }
      inherits2(K256, MPrime);
      K256.prototype.split = function split(input, output) {
        var mask = 4194303;
        var outLen = Math.min(input.length, 9);
        for (var i3 = 0; i3 < outLen; i3++) {
          output.words[i3] = input.words[i3];
        }
        output.length = outLen;
        if (input.length <= 9) {
          input.words[0] = 0;
          input.length = 1;
          return;
        }
        var prev = input.words[9];
        output.words[output.length++] = prev & mask;
        for (i3 = 10; i3 < input.length; i3++) {
          var next = input.words[i3] | 0;
          input.words[i3 - 10] = (next & mask) << 4 | prev >>> 22;
          prev = next;
        }
        prev >>>= 22;
        input.words[i3 - 10] = prev;
        if (prev === 0 && input.length > 10) {
          input.length -= 10;
        } else {
          input.length -= 9;
        }
      };
      K256.prototype.imulK = function imulK(num) {
        num.words[num.length] = 0;
        num.words[num.length + 1] = 0;
        num.length += 2;
        var lo = 0;
        for (var i3 = 0; i3 < num.length; i3++) {
          var w3 = num.words[i3] | 0;
          lo += w3 * 977;
          num.words[i3] = lo & 67108863;
          lo = w3 * 64 + (lo / 67108864 | 0);
        }
        if (num.words[num.length - 1] === 0) {
          num.length--;
          if (num.words[num.length - 1] === 0) {
            num.length--;
          }
        }
        return num;
      };
      function P224() {
        MPrime.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
      }
      inherits2(P224, MPrime);
      function P192() {
        MPrime.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
      }
      inherits2(P192, MPrime);
      function P25519() {
        MPrime.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
      }
      inherits2(P25519, MPrime);
      P25519.prototype.imulK = function imulK(num) {
        var carry = 0;
        for (var i3 = 0; i3 < num.length; i3++) {
          var hi = (num.words[i3] | 0) * 19 + carry;
          var lo = hi & 67108863;
          hi >>>= 26;
          num.words[i3] = lo;
          carry = hi;
        }
        if (carry !== 0) {
          num.words[num.length++] = carry;
        }
        return num;
      };
      BN3._prime = function prime(name2) {
        if (primes[name2])
          return primes[name2];
        var prime2;
        if (name2 === "k256") {
          prime2 = new K256();
        } else if (name2 === "p224") {
          prime2 = new P224();
        } else if (name2 === "p192") {
          prime2 = new P192();
        } else if (name2 === "p25519") {
          prime2 = new P25519();
        } else {
          throw new Error("Unknown prime " + name2);
        }
        primes[name2] = prime2;
        return prime2;
      };
      function Red(m3) {
        if (typeof m3 === "string") {
          var prime = BN3._prime(m3);
          this.m = prime.p;
          this.prime = prime;
        } else {
          assert2(m3.gtn(1), "modulus must be greater than 1");
          this.m = m3;
          this.prime = null;
        }
      }
      Red.prototype._verify1 = function _verify1(a3) {
        assert2(a3.negative === 0, "red works only with positives");
        assert2(a3.red, "red works only with red numbers");
      };
      Red.prototype._verify2 = function _verify2(a3, b3) {
        assert2((a3.negative | b3.negative) === 0, "red works only with positives");
        assert2(a3.red && a3.red === b3.red, "red works only with red numbers");
      };
      Red.prototype.imod = function imod(a3) {
        if (this.prime)
          return this.prime.ireduce(a3)._forceRed(this);
        return a3.umod(this.m)._forceRed(this);
      };
      Red.prototype.neg = function neg3(a3) {
        if (a3.isZero()) {
          return a3.clone();
        }
        return this.m.sub(a3)._forceRed(this);
      };
      Red.prototype.add = function add3(a3, b3) {
        this._verify2(a3, b3);
        var res = a3.add(b3);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.iadd = function iadd(a3, b3) {
        this._verify2(a3, b3);
        var res = a3.iadd(b3);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res;
      };
      Red.prototype.sub = function sub(a3, b3) {
        this._verify2(a3, b3);
        var res = a3.sub(b3);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.isub = function isub(a3, b3) {
        this._verify2(a3, b3);
        var res = a3.isub(b3);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res;
      };
      Red.prototype.shl = function shl(a3, num) {
        this._verify1(a3);
        return this.imod(a3.ushln(num));
      };
      Red.prototype.imul = function imul(a3, b3) {
        this._verify2(a3, b3);
        return this.imod(a3.imul(b3));
      };
      Red.prototype.mul = function mul3(a3, b3) {
        this._verify2(a3, b3);
        return this.imod(a3.mul(b3));
      };
      Red.prototype.isqr = function isqr(a3) {
        return this.imul(a3, a3.clone());
      };
      Red.prototype.sqr = function sqr(a3) {
        return this.mul(a3, a3);
      };
      Red.prototype.sqrt = function sqrt(a3) {
        if (a3.isZero())
          return a3.clone();
        var mod3 = this.m.andln(3);
        assert2(mod3 % 2 === 1);
        if (mod3 === 3) {
          var pow = this.m.add(new BN3(1)).iushrn(2);
          return this.pow(a3, pow);
        }
        var q = this.m.subn(1);
        var s2 = 0;
        while (!q.isZero() && q.andln(1) === 0) {
          s2++;
          q.iushrn(1);
        }
        assert2(!q.isZero());
        var one = new BN3(1).toRed(this);
        var nOne = one.redNeg();
        var lpow = this.m.subn(1).iushrn(1);
        var z2 = this.m.bitLength();
        z2 = new BN3(2 * z2 * z2).toRed(this);
        while (this.pow(z2, lpow).cmp(nOne) !== 0) {
          z2.redIAdd(nOne);
        }
        var c3 = this.pow(z2, q);
        var r3 = this.pow(a3, q.addn(1).iushrn(1));
        var t3 = this.pow(a3, q);
        var m3 = s2;
        while (t3.cmp(one) !== 0) {
          var tmp = t3;
          for (var i3 = 0; tmp.cmp(one) !== 0; i3++) {
            tmp = tmp.redSqr();
          }
          assert2(i3 < m3);
          var b3 = this.pow(c3, new BN3(1).iushln(m3 - i3 - 1));
          r3 = r3.redMul(b3);
          c3 = b3.redSqr();
          t3 = t3.redMul(c3);
          m3 = i3;
        }
        return r3;
      };
      Red.prototype.invm = function invm(a3) {
        var inv = a3._invmp(this.m);
        if (inv.negative !== 0) {
          inv.negative = 0;
          return this.imod(inv).redNeg();
        } else {
          return this.imod(inv);
        }
      };
      Red.prototype.pow = function pow(a3, num) {
        if (num.isZero())
          return new BN3(1).toRed(this);
        if (num.cmpn(1) === 0)
          return a3.clone();
        var windowSize = 4;
        var wnd = new Array(1 << windowSize);
        wnd[0] = new BN3(1).toRed(this);
        wnd[1] = a3;
        for (var i3 = 2; i3 < wnd.length; i3++) {
          wnd[i3] = this.mul(wnd[i3 - 1], a3);
        }
        var res = wnd[0];
        var current = 0;
        var currentLen = 0;
        var start = num.bitLength() % 26;
        if (start === 0) {
          start = 26;
        }
        for (i3 = num.length - 1; i3 >= 0; i3--) {
          var word = num.words[i3];
          for (var j3 = start - 1; j3 >= 0; j3--) {
            var bit = word >> j3 & 1;
            if (res !== wnd[0]) {
              res = this.sqr(res);
            }
            if (bit === 0 && current === 0) {
              currentLen = 0;
              continue;
            }
            current <<= 1;
            current |= bit;
            currentLen++;
            if (currentLen !== windowSize && (i3 !== 0 || j3 !== 0))
              continue;
            res = this.mul(res, wnd[current]);
            currentLen = 0;
            current = 0;
          }
          start = 26;
        }
        return res;
      };
      Red.prototype.convertTo = function convertTo(num) {
        var r3 = num.umod(this.m);
        return r3 === num ? r3.clone() : r3;
      };
      Red.prototype.convertFrom = function convertFrom(num) {
        var res = num.clone();
        res.red = null;
        return res;
      };
      BN3.mont = function mont(num) {
        return new Mont(num);
      };
      function Mont(m3) {
        Red.call(this, m3);
        this.shift = this.m.bitLength();
        if (this.shift % 26 !== 0) {
          this.shift += 26 - this.shift % 26;
        }
        this.r = new BN3(1).iushln(this.shift);
        this.r2 = this.imod(this.r.sqr());
        this.rinv = this.r._invmp(this.m);
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
        this.minv = this.minv.umod(this.r);
        this.minv = this.r.sub(this.minv);
      }
      inherits2(Mont, Red);
      Mont.prototype.convertTo = function convertTo(num) {
        return this.imod(num.ushln(this.shift));
      };
      Mont.prototype.convertFrom = function convertFrom(num) {
        var r3 = this.imod(num.mul(this.rinv));
        r3.red = null;
        return r3;
      };
      Mont.prototype.imul = function imul(a3, b3) {
        if (a3.isZero() || b3.isZero()) {
          a3.words[0] = 0;
          a3.length = 1;
          return a3;
        }
        var t3 = a3.imul(b3);
        var c3 = t3.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u3 = t3.isub(c3).iushrn(this.shift);
        var res = u3;
        if (u3.cmp(this.m) >= 0) {
          res = u3.isub(this.m);
        } else if (u3.cmpn(0) < 0) {
          res = u3.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.mul = function mul3(a3, b3) {
        if (a3.isZero() || b3.isZero())
          return new BN3(0)._forceRed(this);
        var t3 = a3.mul(b3);
        var c3 = t3.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u3 = t3.isub(c3).iushrn(this.shift);
        var res = u3;
        if (u3.cmp(this.m) >= 0) {
          res = u3.isub(this.m);
        } else if (u3.cmpn(0) < 0) {
          res = u3.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.invm = function invm(a3) {
        var res = this.imod(a3._invmp(this.m).mul(this.r2));
        return res._forceRed(this);
      };
    })(typeof module2 === "undefined" || module2, exports2);
  }
});

// node_modules/js-sha3/src/sha3.js
var require_sha3 = __commonJS({
  "node_modules/js-sha3/src/sha3.js"(exports2, module2) {
    (function() {
      "use strict";
      var INPUT_ERROR = "input is invalid type";
      var FINALIZE_ERROR = "finalize already called";
      var WINDOW = typeof window === "object";
      var root = WINDOW ? window : {};
      if (root.JS_SHA3_NO_WINDOW) {
        WINDOW = false;
      }
      var WEB_WORKER = !WINDOW && typeof self === "object";
      var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
      if (NODE_JS) {
        root = global;
      } else if (WEB_WORKER) {
        root = self;
      }
      var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && typeof module2 === "object" && module2.exports;
      var AMD = typeof define === "function" && define.amd;
      var ARRAY_BUFFER = !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
      var HEX_CHARS = "0123456789abcdef".split("");
      var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
      var CSHAKE_PADDING = [4, 1024, 262144, 67108864];
      var KECCAK_PADDING = [1, 256, 65536, 16777216];
      var PADDING = [6, 1536, 393216, 100663296];
      var SHIFT = [0, 8, 16, 24];
      var RC = [
        1,
        0,
        32898,
        0,
        32906,
        2147483648,
        2147516416,
        2147483648,
        32907,
        0,
        2147483649,
        0,
        2147516545,
        2147483648,
        32777,
        2147483648,
        138,
        0,
        136,
        0,
        2147516425,
        0,
        2147483658,
        0,
        2147516555,
        0,
        139,
        2147483648,
        32905,
        2147483648,
        32771,
        2147483648,
        32770,
        2147483648,
        128,
        2147483648,
        32778,
        0,
        2147483658,
        2147483648,
        2147516545,
        2147483648,
        32896,
        2147483648,
        2147483649,
        0,
        2147516424,
        2147483648
      ];
      var BITS = [224, 256, 384, 512];
      var SHAKE_BITS = [128, 256];
      var OUTPUT_TYPES = ["hex", "buffer", "arrayBuffer", "array", "digest"];
      var CSHAKE_BYTEPAD = {
        "128": 168,
        "256": 136
      };
      if (root.JS_SHA3_NO_NODE_JS || !Array.isArray) {
        Array.isArray = function(obj2) {
          return Object.prototype.toString.call(obj2) === "[object Array]";
        };
      }
      if (ARRAY_BUFFER && (root.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
        ArrayBuffer.isView = function(obj2) {
          return typeof obj2 === "object" && obj2.buffer && obj2.buffer.constructor === ArrayBuffer;
        };
      }
      var createOutputMethod = function(bits2, padding2, outputType) {
        return function(message) {
          return new Keccak(bits2, padding2, bits2).update(message)[outputType]();
        };
      };
      var createShakeOutputMethod = function(bits2, padding2, outputType) {
        return function(message, outputBits) {
          return new Keccak(bits2, padding2, outputBits).update(message)[outputType]();
        };
      };
      var createCshakeOutputMethod = function(bits2, padding2, outputType) {
        return function(message, outputBits, n2, s2) {
          return methods["cshake" + bits2].update(message, outputBits, n2, s2)[outputType]();
        };
      };
      var createKmacOutputMethod = function(bits2, padding2, outputType) {
        return function(key2, message, outputBits, s2) {
          return methods["kmac" + bits2].update(key2, message, outputBits, s2)[outputType]();
        };
      };
      var createOutputMethods = function(method, createMethod2, bits2, padding2) {
        for (var i4 = 0; i4 < OUTPUT_TYPES.length; ++i4) {
          var type = OUTPUT_TYPES[i4];
          method[type] = createMethod2(bits2, padding2, type);
        }
        return method;
      };
      var createMethod = function(bits2, padding2) {
        var method = createOutputMethod(bits2, padding2, "hex");
        method.create = function() {
          return new Keccak(bits2, padding2, bits2);
        };
        method.update = function(message) {
          return method.create().update(message);
        };
        return createOutputMethods(method, createOutputMethod, bits2, padding2);
      };
      var createShakeMethod = function(bits2, padding2) {
        var method = createShakeOutputMethod(bits2, padding2, "hex");
        method.create = function(outputBits) {
          return new Keccak(bits2, padding2, outputBits);
        };
        method.update = function(message, outputBits) {
          return method.create(outputBits).update(message);
        };
        return createOutputMethods(method, createShakeOutputMethod, bits2, padding2);
      };
      var createCshakeMethod = function(bits2, padding2) {
        var w3 = CSHAKE_BYTEPAD[bits2];
        var method = createCshakeOutputMethod(bits2, padding2, "hex");
        method.create = function(outputBits, n2, s2) {
          if (!n2 && !s2) {
            return methods["shake" + bits2].create(outputBits);
          } else {
            return new Keccak(bits2, padding2, outputBits).bytepad([n2, s2], w3);
          }
        };
        method.update = function(message, outputBits, n2, s2) {
          return method.create(outputBits, n2, s2).update(message);
        };
        return createOutputMethods(method, createCshakeOutputMethod, bits2, padding2);
      };
      var createKmacMethod = function(bits2, padding2) {
        var w3 = CSHAKE_BYTEPAD[bits2];
        var method = createKmacOutputMethod(bits2, padding2, "hex");
        method.create = function(key2, outputBits, s2) {
          return new Kmac(bits2, padding2, outputBits).bytepad(["KMAC", s2], w3).bytepad([key2], w3);
        };
        method.update = function(key2, message, outputBits, s2) {
          return method.create(key2, outputBits, s2).update(message);
        };
        return createOutputMethods(method, createKmacOutputMethod, bits2, padding2);
      };
      var algorithms = [
        { name: "keccak", padding: KECCAK_PADDING, bits: BITS, createMethod },
        { name: "sha3", padding: PADDING, bits: BITS, createMethod },
        { name: "shake", padding: SHAKE_PADDING, bits: SHAKE_BITS, createMethod: createShakeMethod },
        { name: "cshake", padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createCshakeMethod },
        { name: "kmac", padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createKmacMethod }
      ];
      var methods = {}, methodNames = [];
      for (var i3 = 0; i3 < algorithms.length; ++i3) {
        var algorithm = algorithms[i3];
        var bits = algorithm.bits;
        for (var j3 = 0; j3 < bits.length; ++j3) {
          var methodName = algorithm.name + "_" + bits[j3];
          methodNames.push(methodName);
          methods[methodName] = algorithm.createMethod(bits[j3], algorithm.padding);
          if (algorithm.name !== "sha3") {
            var newMethodName = algorithm.name + bits[j3];
            methodNames.push(newMethodName);
            methods[newMethodName] = methods[methodName];
          }
        }
      }
      function Keccak(bits2, padding2, outputBits) {
        this.blocks = [];
        this.s = [];
        this.padding = padding2;
        this.outputBits = outputBits;
        this.reset = true;
        this.finalized = false;
        this.block = 0;
        this.start = 0;
        this.blockCount = 1600 - (bits2 << 1) >> 5;
        this.byteCount = this.blockCount << 2;
        this.outputBlocks = outputBits >> 5;
        this.extraBytes = (outputBits & 31) >> 3;
        for (var i4 = 0; i4 < 50; ++i4) {
          this.s[i4] = 0;
        }
      }
      Keccak.prototype.update = function(message) {
        if (this.finalized) {
          throw new Error(FINALIZE_ERROR);
        }
        var notString, type = typeof message;
        if (type !== "string") {
          if (type === "object") {
            if (message === null) {
              throw new Error(INPUT_ERROR);
            } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
              message = new Uint8Array(message);
            } else if (!Array.isArray(message)) {
              if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
                throw new Error(INPUT_ERROR);
              }
            }
          } else {
            throw new Error(INPUT_ERROR);
          }
          notString = true;
        }
        var blocks = this.blocks, byteCount = this.byteCount, length = message.length, blockCount = this.blockCount, index = 0, s2 = this.s, i4, code;
        while (index < length) {
          if (this.reset) {
            this.reset = false;
            blocks[0] = this.block;
            for (i4 = 1; i4 < blockCount + 1; ++i4) {
              blocks[i4] = 0;
            }
          }
          if (notString) {
            for (i4 = this.start; index < length && i4 < byteCount; ++index) {
              blocks[i4 >> 2] |= message[index] << SHIFT[i4++ & 3];
            }
          } else {
            for (i4 = this.start; index < length && i4 < byteCount; ++index) {
              code = message.charCodeAt(index);
              if (code < 128) {
                blocks[i4 >> 2] |= code << SHIFT[i4++ & 3];
              } else if (code < 2048) {
                blocks[i4 >> 2] |= (192 | code >> 6) << SHIFT[i4++ & 3];
                blocks[i4 >> 2] |= (128 | code & 63) << SHIFT[i4++ & 3];
              } else if (code < 55296 || code >= 57344) {
                blocks[i4 >> 2] |= (224 | code >> 12) << SHIFT[i4++ & 3];
                blocks[i4 >> 2] |= (128 | code >> 6 & 63) << SHIFT[i4++ & 3];
                blocks[i4 >> 2] |= (128 | code & 63) << SHIFT[i4++ & 3];
              } else {
                code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
                blocks[i4 >> 2] |= (240 | code >> 18) << SHIFT[i4++ & 3];
                blocks[i4 >> 2] |= (128 | code >> 12 & 63) << SHIFT[i4++ & 3];
                blocks[i4 >> 2] |= (128 | code >> 6 & 63) << SHIFT[i4++ & 3];
                blocks[i4 >> 2] |= (128 | code & 63) << SHIFT[i4++ & 3];
              }
            }
          }
          this.lastByteIndex = i4;
          if (i4 >= byteCount) {
            this.start = i4 - byteCount;
            this.block = blocks[blockCount];
            for (i4 = 0; i4 < blockCount; ++i4) {
              s2[i4] ^= blocks[i4];
            }
            f3(s2);
            this.reset = true;
          } else {
            this.start = i4;
          }
        }
        return this;
      };
      Keccak.prototype.encode = function(x3, right) {
        var o3 = x3 & 255, n2 = 1;
        var bytes = [o3];
        x3 = x3 >> 8;
        o3 = x3 & 255;
        while (o3 > 0) {
          bytes.unshift(o3);
          x3 = x3 >> 8;
          o3 = x3 & 255;
          ++n2;
        }
        if (right) {
          bytes.push(n2);
        } else {
          bytes.unshift(n2);
        }
        this.update(bytes);
        return bytes.length;
      };
      Keccak.prototype.encodeString = function(str) {
        var notString, type = typeof str;
        if (type !== "string") {
          if (type === "object") {
            if (str === null) {
              throw new Error(INPUT_ERROR);
            } else if (ARRAY_BUFFER && str.constructor === ArrayBuffer) {
              str = new Uint8Array(str);
            } else if (!Array.isArray(str)) {
              if (!ARRAY_BUFFER || !ArrayBuffer.isView(str)) {
                throw new Error(INPUT_ERROR);
              }
            }
          } else {
            throw new Error(INPUT_ERROR);
          }
          notString = true;
        }
        var bytes = 0, length = str.length;
        if (notString) {
          bytes = length;
        } else {
          for (var i4 = 0; i4 < str.length; ++i4) {
            var code = str.charCodeAt(i4);
            if (code < 128) {
              bytes += 1;
            } else if (code < 2048) {
              bytes += 2;
            } else if (code < 55296 || code >= 57344) {
              bytes += 3;
            } else {
              code = 65536 + ((code & 1023) << 10 | str.charCodeAt(++i4) & 1023);
              bytes += 4;
            }
          }
        }
        bytes += this.encode(bytes * 8);
        this.update(str);
        return bytes;
      };
      Keccak.prototype.bytepad = function(strs, w3) {
        var bytes = this.encode(w3);
        for (var i4 = 0; i4 < strs.length; ++i4) {
          bytes += this.encodeString(strs[i4]);
        }
        var paddingBytes = w3 - bytes % w3;
        var zeros2 = [];
        zeros2.length = paddingBytes;
        this.update(zeros2);
        return this;
      };
      Keccak.prototype.finalize = function() {
        if (this.finalized) {
          return;
        }
        this.finalized = true;
        var blocks = this.blocks, i4 = this.lastByteIndex, blockCount = this.blockCount, s2 = this.s;
        blocks[i4 >> 2] |= this.padding[i4 & 3];
        if (this.lastByteIndex === this.byteCount) {
          blocks[0] = blocks[blockCount];
          for (i4 = 1; i4 < blockCount + 1; ++i4) {
            blocks[i4] = 0;
          }
        }
        blocks[blockCount - 1] |= 2147483648;
        for (i4 = 0; i4 < blockCount; ++i4) {
          s2[i4] ^= blocks[i4];
        }
        f3(s2);
      };
      Keccak.prototype.toString = Keccak.prototype.hex = function() {
        this.finalize();
        var blockCount = this.blockCount, s2 = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i4 = 0, j4 = 0;
        var hex = "", block;
        while (j4 < outputBlocks) {
          for (i4 = 0; i4 < blockCount && j4 < outputBlocks; ++i4, ++j4) {
            block = s2[i4];
            hex += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15] + HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15] + HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15] + HEX_CHARS[block >> 28 & 15] + HEX_CHARS[block >> 24 & 15];
          }
          if (j4 % blockCount === 0) {
            f3(s2);
            i4 = 0;
          }
        }
        if (extraBytes) {
          block = s2[i4];
          hex += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15];
          if (extraBytes > 1) {
            hex += HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15];
          }
          if (extraBytes > 2) {
            hex += HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15];
          }
        }
        return hex;
      };
      Keccak.prototype.arrayBuffer = function() {
        this.finalize();
        var blockCount = this.blockCount, s2 = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i4 = 0, j4 = 0;
        var bytes = this.outputBits >> 3;
        var buffer;
        if (extraBytes) {
          buffer = new ArrayBuffer(outputBlocks + 1 << 2);
        } else {
          buffer = new ArrayBuffer(bytes);
        }
        var array = new Uint32Array(buffer);
        while (j4 < outputBlocks) {
          for (i4 = 0; i4 < blockCount && j4 < outputBlocks; ++i4, ++j4) {
            array[j4] = s2[i4];
          }
          if (j4 % blockCount === 0) {
            f3(s2);
          }
        }
        if (extraBytes) {
          array[i4] = s2[i4];
          buffer = buffer.slice(0, bytes);
        }
        return buffer;
      };
      Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;
      Keccak.prototype.digest = Keccak.prototype.array = function() {
        this.finalize();
        var blockCount = this.blockCount, s2 = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i4 = 0, j4 = 0;
        var array = [], offset, block;
        while (j4 < outputBlocks) {
          for (i4 = 0; i4 < blockCount && j4 < outputBlocks; ++i4, ++j4) {
            offset = j4 << 2;
            block = s2[i4];
            array[offset] = block & 255;
            array[offset + 1] = block >> 8 & 255;
            array[offset + 2] = block >> 16 & 255;
            array[offset + 3] = block >> 24 & 255;
          }
          if (j4 % blockCount === 0) {
            f3(s2);
          }
        }
        if (extraBytes) {
          offset = j4 << 2;
          block = s2[i4];
          array[offset] = block & 255;
          if (extraBytes > 1) {
            array[offset + 1] = block >> 8 & 255;
          }
          if (extraBytes > 2) {
            array[offset + 2] = block >> 16 & 255;
          }
        }
        return array;
      };
      function Kmac(bits2, padding2, outputBits) {
        Keccak.call(this, bits2, padding2, outputBits);
      }
      Kmac.prototype = new Keccak();
      Kmac.prototype.finalize = function() {
        this.encode(this.outputBits, true);
        return Keccak.prototype.finalize.call(this);
      };
      var f3 = function(s2) {
        var h2, l3, n2, c0, c1, c22, c3, c4, c5, c6, c7, c8, c9, b0, b1, b22, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b222, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
        for (n2 = 0; n2 < 48; n2 += 2) {
          c0 = s2[0] ^ s2[10] ^ s2[20] ^ s2[30] ^ s2[40];
          c1 = s2[1] ^ s2[11] ^ s2[21] ^ s2[31] ^ s2[41];
          c22 = s2[2] ^ s2[12] ^ s2[22] ^ s2[32] ^ s2[42];
          c3 = s2[3] ^ s2[13] ^ s2[23] ^ s2[33] ^ s2[43];
          c4 = s2[4] ^ s2[14] ^ s2[24] ^ s2[34] ^ s2[44];
          c5 = s2[5] ^ s2[15] ^ s2[25] ^ s2[35] ^ s2[45];
          c6 = s2[6] ^ s2[16] ^ s2[26] ^ s2[36] ^ s2[46];
          c7 = s2[7] ^ s2[17] ^ s2[27] ^ s2[37] ^ s2[47];
          c8 = s2[8] ^ s2[18] ^ s2[28] ^ s2[38] ^ s2[48];
          c9 = s2[9] ^ s2[19] ^ s2[29] ^ s2[39] ^ s2[49];
          h2 = c8 ^ (c22 << 1 | c3 >>> 31);
          l3 = c9 ^ (c3 << 1 | c22 >>> 31);
          s2[0] ^= h2;
          s2[1] ^= l3;
          s2[10] ^= h2;
          s2[11] ^= l3;
          s2[20] ^= h2;
          s2[21] ^= l3;
          s2[30] ^= h2;
          s2[31] ^= l3;
          s2[40] ^= h2;
          s2[41] ^= l3;
          h2 = c0 ^ (c4 << 1 | c5 >>> 31);
          l3 = c1 ^ (c5 << 1 | c4 >>> 31);
          s2[2] ^= h2;
          s2[3] ^= l3;
          s2[12] ^= h2;
          s2[13] ^= l3;
          s2[22] ^= h2;
          s2[23] ^= l3;
          s2[32] ^= h2;
          s2[33] ^= l3;
          s2[42] ^= h2;
          s2[43] ^= l3;
          h2 = c22 ^ (c6 << 1 | c7 >>> 31);
          l3 = c3 ^ (c7 << 1 | c6 >>> 31);
          s2[4] ^= h2;
          s2[5] ^= l3;
          s2[14] ^= h2;
          s2[15] ^= l3;
          s2[24] ^= h2;
          s2[25] ^= l3;
          s2[34] ^= h2;
          s2[35] ^= l3;
          s2[44] ^= h2;
          s2[45] ^= l3;
          h2 = c4 ^ (c8 << 1 | c9 >>> 31);
          l3 = c5 ^ (c9 << 1 | c8 >>> 31);
          s2[6] ^= h2;
          s2[7] ^= l3;
          s2[16] ^= h2;
          s2[17] ^= l3;
          s2[26] ^= h2;
          s2[27] ^= l3;
          s2[36] ^= h2;
          s2[37] ^= l3;
          s2[46] ^= h2;
          s2[47] ^= l3;
          h2 = c6 ^ (c0 << 1 | c1 >>> 31);
          l3 = c7 ^ (c1 << 1 | c0 >>> 31);
          s2[8] ^= h2;
          s2[9] ^= l3;
          s2[18] ^= h2;
          s2[19] ^= l3;
          s2[28] ^= h2;
          s2[29] ^= l3;
          s2[38] ^= h2;
          s2[39] ^= l3;
          s2[48] ^= h2;
          s2[49] ^= l3;
          b0 = s2[0];
          b1 = s2[1];
          b32 = s2[11] << 4 | s2[10] >>> 28;
          b33 = s2[10] << 4 | s2[11] >>> 28;
          b14 = s2[20] << 3 | s2[21] >>> 29;
          b15 = s2[21] << 3 | s2[20] >>> 29;
          b46 = s2[31] << 9 | s2[30] >>> 23;
          b47 = s2[30] << 9 | s2[31] >>> 23;
          b28 = s2[40] << 18 | s2[41] >>> 14;
          b29 = s2[41] << 18 | s2[40] >>> 14;
          b20 = s2[2] << 1 | s2[3] >>> 31;
          b21 = s2[3] << 1 | s2[2] >>> 31;
          b22 = s2[13] << 12 | s2[12] >>> 20;
          b3 = s2[12] << 12 | s2[13] >>> 20;
          b34 = s2[22] << 10 | s2[23] >>> 22;
          b35 = s2[23] << 10 | s2[22] >>> 22;
          b16 = s2[33] << 13 | s2[32] >>> 19;
          b17 = s2[32] << 13 | s2[33] >>> 19;
          b48 = s2[42] << 2 | s2[43] >>> 30;
          b49 = s2[43] << 2 | s2[42] >>> 30;
          b40 = s2[5] << 30 | s2[4] >>> 2;
          b41 = s2[4] << 30 | s2[5] >>> 2;
          b222 = s2[14] << 6 | s2[15] >>> 26;
          b23 = s2[15] << 6 | s2[14] >>> 26;
          b4 = s2[25] << 11 | s2[24] >>> 21;
          b5 = s2[24] << 11 | s2[25] >>> 21;
          b36 = s2[34] << 15 | s2[35] >>> 17;
          b37 = s2[35] << 15 | s2[34] >>> 17;
          b18 = s2[45] << 29 | s2[44] >>> 3;
          b19 = s2[44] << 29 | s2[45] >>> 3;
          b10 = s2[6] << 28 | s2[7] >>> 4;
          b11 = s2[7] << 28 | s2[6] >>> 4;
          b42 = s2[17] << 23 | s2[16] >>> 9;
          b43 = s2[16] << 23 | s2[17] >>> 9;
          b24 = s2[26] << 25 | s2[27] >>> 7;
          b25 = s2[27] << 25 | s2[26] >>> 7;
          b6 = s2[36] << 21 | s2[37] >>> 11;
          b7 = s2[37] << 21 | s2[36] >>> 11;
          b38 = s2[47] << 24 | s2[46] >>> 8;
          b39 = s2[46] << 24 | s2[47] >>> 8;
          b30 = s2[8] << 27 | s2[9] >>> 5;
          b31 = s2[9] << 27 | s2[8] >>> 5;
          b12 = s2[18] << 20 | s2[19] >>> 12;
          b13 = s2[19] << 20 | s2[18] >>> 12;
          b44 = s2[29] << 7 | s2[28] >>> 25;
          b45 = s2[28] << 7 | s2[29] >>> 25;
          b26 = s2[38] << 8 | s2[39] >>> 24;
          b27 = s2[39] << 8 | s2[38] >>> 24;
          b8 = s2[48] << 14 | s2[49] >>> 18;
          b9 = s2[49] << 14 | s2[48] >>> 18;
          s2[0] = b0 ^ ~b22 & b4;
          s2[1] = b1 ^ ~b3 & b5;
          s2[10] = b10 ^ ~b12 & b14;
          s2[11] = b11 ^ ~b13 & b15;
          s2[20] = b20 ^ ~b222 & b24;
          s2[21] = b21 ^ ~b23 & b25;
          s2[30] = b30 ^ ~b32 & b34;
          s2[31] = b31 ^ ~b33 & b35;
          s2[40] = b40 ^ ~b42 & b44;
          s2[41] = b41 ^ ~b43 & b45;
          s2[2] = b22 ^ ~b4 & b6;
          s2[3] = b3 ^ ~b5 & b7;
          s2[12] = b12 ^ ~b14 & b16;
          s2[13] = b13 ^ ~b15 & b17;
          s2[22] = b222 ^ ~b24 & b26;
          s2[23] = b23 ^ ~b25 & b27;
          s2[32] = b32 ^ ~b34 & b36;
          s2[33] = b33 ^ ~b35 & b37;
          s2[42] = b42 ^ ~b44 & b46;
          s2[43] = b43 ^ ~b45 & b47;
          s2[4] = b4 ^ ~b6 & b8;
          s2[5] = b5 ^ ~b7 & b9;
          s2[14] = b14 ^ ~b16 & b18;
          s2[15] = b15 ^ ~b17 & b19;
          s2[24] = b24 ^ ~b26 & b28;
          s2[25] = b25 ^ ~b27 & b29;
          s2[34] = b34 ^ ~b36 & b38;
          s2[35] = b35 ^ ~b37 & b39;
          s2[44] = b44 ^ ~b46 & b48;
          s2[45] = b45 ^ ~b47 & b49;
          s2[6] = b6 ^ ~b8 & b0;
          s2[7] = b7 ^ ~b9 & b1;
          s2[16] = b16 ^ ~b18 & b10;
          s2[17] = b17 ^ ~b19 & b11;
          s2[26] = b26 ^ ~b28 & b20;
          s2[27] = b27 ^ ~b29 & b21;
          s2[36] = b36 ^ ~b38 & b30;
          s2[37] = b37 ^ ~b39 & b31;
          s2[46] = b46 ^ ~b48 & b40;
          s2[47] = b47 ^ ~b49 & b41;
          s2[8] = b8 ^ ~b0 & b22;
          s2[9] = b9 ^ ~b1 & b3;
          s2[18] = b18 ^ ~b10 & b12;
          s2[19] = b19 ^ ~b11 & b13;
          s2[28] = b28 ^ ~b20 & b222;
          s2[29] = b29 ^ ~b21 & b23;
          s2[38] = b38 ^ ~b30 & b32;
          s2[39] = b39 ^ ~b31 & b33;
          s2[48] = b48 ^ ~b40 & b42;
          s2[49] = b49 ^ ~b41 & b43;
          s2[0] ^= RC[n2];
          s2[1] ^= RC[n2 + 1];
        }
      };
      if (COMMON_JS) {
        module2.exports = methods;
      } else {
        for (i3 = 0; i3 < methodNames.length; ++i3) {
          root[methodNames[i3]] = methods[methodNames[i3]];
        }
        if (AMD) {
          define(function() {
            return methods;
          });
        }
      }
    })();
  }
});

// node_modules/minimalistic-assert/index.js
var require_minimalistic_assert = __commonJS({
  "node_modules/minimalistic-assert/index.js"(exports2, module2) {
    module2.exports = assert2;
    function assert2(val, msg) {
      if (!val)
        throw new Error(msg || "Assertion failed");
    }
    assert2.equal = function assertEqual2(l3, r3, msg) {
      if (l3 != r3)
        throw new Error(msg || "Assertion failed: " + l3 + " != " + r3);
    };
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports2, module2) {
    if (typeof Object.create === "function") {
      module2.exports = function inherits2(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module2.exports = function inherits2(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/hash.js/lib/hash/utils.js
var require_utils = __commonJS({
  "node_modules/hash.js/lib/hash/utils.js"(exports2) {
    "use strict";
    var assert2 = require_minimalistic_assert();
    var inherits2 = require_inherits_browser();
    exports2.inherits = inherits2;
    function isSurrogatePair(msg, i3) {
      if ((msg.charCodeAt(i3) & 64512) !== 55296) {
        return false;
      }
      if (i3 < 0 || i3 + 1 >= msg.length) {
        return false;
      }
      return (msg.charCodeAt(i3 + 1) & 64512) === 56320;
    }
    function toArray(msg, enc) {
      if (Array.isArray(msg))
        return msg.slice();
      if (!msg)
        return [];
      var res = [];
      if (typeof msg === "string") {
        if (!enc) {
          var p2 = 0;
          for (var i3 = 0; i3 < msg.length; i3++) {
            var c3 = msg.charCodeAt(i3);
            if (c3 < 128) {
              res[p2++] = c3;
            } else if (c3 < 2048) {
              res[p2++] = c3 >> 6 | 192;
              res[p2++] = c3 & 63 | 128;
            } else if (isSurrogatePair(msg, i3)) {
              c3 = 65536 + ((c3 & 1023) << 10) + (msg.charCodeAt(++i3) & 1023);
              res[p2++] = c3 >> 18 | 240;
              res[p2++] = c3 >> 12 & 63 | 128;
              res[p2++] = c3 >> 6 & 63 | 128;
              res[p2++] = c3 & 63 | 128;
            } else {
              res[p2++] = c3 >> 12 | 224;
              res[p2++] = c3 >> 6 & 63 | 128;
              res[p2++] = c3 & 63 | 128;
            }
          }
        } else if (enc === "hex") {
          msg = msg.replace(/[^a-z0-9]+/ig, "");
          if (msg.length % 2 !== 0)
            msg = "0" + msg;
          for (i3 = 0; i3 < msg.length; i3 += 2)
            res.push(parseInt(msg[i3] + msg[i3 + 1], 16));
        }
      } else {
        for (i3 = 0; i3 < msg.length; i3++)
          res[i3] = msg[i3] | 0;
      }
      return res;
    }
    exports2.toArray = toArray;
    function toHex2(msg) {
      var res = "";
      for (var i3 = 0; i3 < msg.length; i3++)
        res += zero2(msg[i3].toString(16));
      return res;
    }
    exports2.toHex = toHex2;
    function htonl(w3) {
      var res = w3 >>> 24 | w3 >>> 8 & 65280 | w3 << 8 & 16711680 | (w3 & 255) << 24;
      return res >>> 0;
    }
    exports2.htonl = htonl;
    function toHex32(msg, endian) {
      var res = "";
      for (var i3 = 0; i3 < msg.length; i3++) {
        var w3 = msg[i3];
        if (endian === "little")
          w3 = htonl(w3);
        res += zero8(w3.toString(16));
      }
      return res;
    }
    exports2.toHex32 = toHex32;
    function zero2(word) {
      if (word.length === 1)
        return "0" + word;
      else
        return word;
    }
    exports2.zero2 = zero2;
    function zero8(word) {
      if (word.length === 7)
        return "0" + word;
      else if (word.length === 6)
        return "00" + word;
      else if (word.length === 5)
        return "000" + word;
      else if (word.length === 4)
        return "0000" + word;
      else if (word.length === 3)
        return "00000" + word;
      else if (word.length === 2)
        return "000000" + word;
      else if (word.length === 1)
        return "0000000" + word;
      else
        return word;
    }
    exports2.zero8 = zero8;
    function join32(msg, start, end, endian) {
      var len = end - start;
      assert2(len % 4 === 0);
      var res = new Array(len / 4);
      for (var i3 = 0, k3 = start; i3 < res.length; i3++, k3 += 4) {
        var w3;
        if (endian === "big")
          w3 = msg[k3] << 24 | msg[k3 + 1] << 16 | msg[k3 + 2] << 8 | msg[k3 + 3];
        else
          w3 = msg[k3 + 3] << 24 | msg[k3 + 2] << 16 | msg[k3 + 1] << 8 | msg[k3];
        res[i3] = w3 >>> 0;
      }
      return res;
    }
    exports2.join32 = join32;
    function split32(msg, endian) {
      var res = new Array(msg.length * 4);
      for (var i3 = 0, k3 = 0; i3 < msg.length; i3++, k3 += 4) {
        var m3 = msg[i3];
        if (endian === "big") {
          res[k3] = m3 >>> 24;
          res[k3 + 1] = m3 >>> 16 & 255;
          res[k3 + 2] = m3 >>> 8 & 255;
          res[k3 + 3] = m3 & 255;
        } else {
          res[k3 + 3] = m3 >>> 24;
          res[k3 + 2] = m3 >>> 16 & 255;
          res[k3 + 1] = m3 >>> 8 & 255;
          res[k3] = m3 & 255;
        }
      }
      return res;
    }
    exports2.split32 = split32;
    function rotr32(w3, b3) {
      return w3 >>> b3 | w3 << 32 - b3;
    }
    exports2.rotr32 = rotr32;
    function rotl32(w3, b3) {
      return w3 << b3 | w3 >>> 32 - b3;
    }
    exports2.rotl32 = rotl32;
    function sum32(a3, b3) {
      return a3 + b3 >>> 0;
    }
    exports2.sum32 = sum32;
    function sum32_3(a3, b3, c3) {
      return a3 + b3 + c3 >>> 0;
    }
    exports2.sum32_3 = sum32_3;
    function sum32_4(a3, b3, c3, d2) {
      return a3 + b3 + c3 + d2 >>> 0;
    }
    exports2.sum32_4 = sum32_4;
    function sum32_5(a3, b3, c3, d2, e3) {
      return a3 + b3 + c3 + d2 + e3 >>> 0;
    }
    exports2.sum32_5 = sum32_5;
    function sum64(buf, pos, ah, al) {
      var bh = buf[pos];
      var bl = buf[pos + 1];
      var lo = al + bl >>> 0;
      var hi = (lo < al ? 1 : 0) + ah + bh;
      buf[pos] = hi >>> 0;
      buf[pos + 1] = lo;
    }
    exports2.sum64 = sum64;
    function sum64_hi(ah, al, bh, bl) {
      var lo = al + bl >>> 0;
      var hi = (lo < al ? 1 : 0) + ah + bh;
      return hi >>> 0;
    }
    exports2.sum64_hi = sum64_hi;
    function sum64_lo(ah, al, bh, bl) {
      var lo = al + bl;
      return lo >>> 0;
    }
    exports2.sum64_lo = sum64_lo;
    function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
      var carry = 0;
      var lo = al;
      lo = lo + bl >>> 0;
      carry += lo < al ? 1 : 0;
      lo = lo + cl >>> 0;
      carry += lo < cl ? 1 : 0;
      lo = lo + dl >>> 0;
      carry += lo < dl ? 1 : 0;
      var hi = ah + bh + ch + dh + carry;
      return hi >>> 0;
    }
    exports2.sum64_4_hi = sum64_4_hi;
    function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
      var lo = al + bl + cl + dl;
      return lo >>> 0;
    }
    exports2.sum64_4_lo = sum64_4_lo;
    function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
      var carry = 0;
      var lo = al;
      lo = lo + bl >>> 0;
      carry += lo < al ? 1 : 0;
      lo = lo + cl >>> 0;
      carry += lo < cl ? 1 : 0;
      lo = lo + dl >>> 0;
      carry += lo < dl ? 1 : 0;
      lo = lo + el >>> 0;
      carry += lo < el ? 1 : 0;
      var hi = ah + bh + ch + dh + eh + carry;
      return hi >>> 0;
    }
    exports2.sum64_5_hi = sum64_5_hi;
    function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
      var lo = al + bl + cl + dl + el;
      return lo >>> 0;
    }
    exports2.sum64_5_lo = sum64_5_lo;
    function rotr64_hi(ah, al, num) {
      var r3 = al << 32 - num | ah >>> num;
      return r3 >>> 0;
    }
    exports2.rotr64_hi = rotr64_hi;
    function rotr64_lo(ah, al, num) {
      var r3 = ah << 32 - num | al >>> num;
      return r3 >>> 0;
    }
    exports2.rotr64_lo = rotr64_lo;
    function shr64_hi(ah, al, num) {
      return ah >>> num;
    }
    exports2.shr64_hi = shr64_hi;
    function shr64_lo(ah, al, num) {
      var r3 = ah << 32 - num | al >>> num;
      return r3 >>> 0;
    }
    exports2.shr64_lo = shr64_lo;
  }
});

// node_modules/hash.js/lib/hash/common.js
var require_common = __commonJS({
  "node_modules/hash.js/lib/hash/common.js"(exports2) {
    "use strict";
    var utils = require_utils();
    var assert2 = require_minimalistic_assert();
    function BlockHash() {
      this.pending = null;
      this.pendingTotal = 0;
      this.blockSize = this.constructor.blockSize;
      this.outSize = this.constructor.outSize;
      this.hmacStrength = this.constructor.hmacStrength;
      this.padLength = this.constructor.padLength / 8;
      this.endian = "big";
      this._delta8 = this.blockSize / 8;
      this._delta32 = this.blockSize / 32;
    }
    exports2.BlockHash = BlockHash;
    BlockHash.prototype.update = function update2(msg, enc) {
      msg = utils.toArray(msg, enc);
      if (!this.pending)
        this.pending = msg;
      else
        this.pending = this.pending.concat(msg);
      this.pendingTotal += msg.length;
      if (this.pending.length >= this._delta8) {
        msg = this.pending;
        var r3 = msg.length % this._delta8;
        this.pending = msg.slice(msg.length - r3, msg.length);
        if (this.pending.length === 0)
          this.pending = null;
        msg = utils.join32(msg, 0, msg.length - r3, this.endian);
        for (var i3 = 0; i3 < msg.length; i3 += this._delta32)
          this._update(msg, i3, i3 + this._delta32);
      }
      return this;
    };
    BlockHash.prototype.digest = function digest(enc) {
      this.update(this._pad());
      assert2(this.pending === null);
      return this._digest(enc);
    };
    BlockHash.prototype._pad = function pad() {
      var len = this.pendingTotal;
      var bytes = this._delta8;
      var k3 = bytes - (len + this.padLength) % bytes;
      var res = new Array(k3 + this.padLength);
      res[0] = 128;
      for (var i3 = 1; i3 < k3; i3++)
        res[i3] = 0;
      len <<= 3;
      if (this.endian === "big") {
        for (var t3 = 8; t3 < this.padLength; t3++)
          res[i3++] = 0;
        res[i3++] = 0;
        res[i3++] = 0;
        res[i3++] = 0;
        res[i3++] = 0;
        res[i3++] = len >>> 24 & 255;
        res[i3++] = len >>> 16 & 255;
        res[i3++] = len >>> 8 & 255;
        res[i3++] = len & 255;
      } else {
        res[i3++] = len & 255;
        res[i3++] = len >>> 8 & 255;
        res[i3++] = len >>> 16 & 255;
        res[i3++] = len >>> 24 & 255;
        res[i3++] = 0;
        res[i3++] = 0;
        res[i3++] = 0;
        res[i3++] = 0;
        for (t3 = 8; t3 < this.padLength; t3++)
          res[i3++] = 0;
      }
      return res;
    };
  }
});

// node_modules/hash.js/lib/hash/sha/common.js
var require_common2 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/common.js"(exports2) {
    "use strict";
    var utils = require_utils();
    var rotr32 = utils.rotr32;
    function ft_1(s2, x3, y3, z2) {
      if (s2 === 0)
        return ch32(x3, y3, z2);
      if (s2 === 1 || s2 === 3)
        return p32(x3, y3, z2);
      if (s2 === 2)
        return maj32(x3, y3, z2);
    }
    exports2.ft_1 = ft_1;
    function ch32(x3, y3, z2) {
      return x3 & y3 ^ ~x3 & z2;
    }
    exports2.ch32 = ch32;
    function maj32(x3, y3, z2) {
      return x3 & y3 ^ x3 & z2 ^ y3 & z2;
    }
    exports2.maj32 = maj32;
    function p32(x3, y3, z2) {
      return x3 ^ y3 ^ z2;
    }
    exports2.p32 = p32;
    function s0_256(x3) {
      return rotr32(x3, 2) ^ rotr32(x3, 13) ^ rotr32(x3, 22);
    }
    exports2.s0_256 = s0_256;
    function s1_256(x3) {
      return rotr32(x3, 6) ^ rotr32(x3, 11) ^ rotr32(x3, 25);
    }
    exports2.s1_256 = s1_256;
    function g0_256(x3) {
      return rotr32(x3, 7) ^ rotr32(x3, 18) ^ x3 >>> 3;
    }
    exports2.g0_256 = g0_256;
    function g1_256(x3) {
      return rotr32(x3, 17) ^ rotr32(x3, 19) ^ x3 >>> 10;
    }
    exports2.g1_256 = g1_256;
  }
});

// node_modules/hash.js/lib/hash/sha/1.js
var require__ = __commonJS({
  "node_modules/hash.js/lib/hash/sha/1.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var common = require_common();
    var shaCommon = require_common2();
    var rotl32 = utils.rotl32;
    var sum32 = utils.sum32;
    var sum32_5 = utils.sum32_5;
    var ft_1 = shaCommon.ft_1;
    var BlockHash = common.BlockHash;
    var sha1_K = [
      1518500249,
      1859775393,
      2400959708,
      3395469782
    ];
    function SHA1() {
      if (!(this instanceof SHA1))
        return new SHA1();
      BlockHash.call(this);
      this.h = [
        1732584193,
        4023233417,
        2562383102,
        271733878,
        3285377520
      ];
      this.W = new Array(80);
    }
    utils.inherits(SHA1, BlockHash);
    module2.exports = SHA1;
    SHA1.blockSize = 512;
    SHA1.outSize = 160;
    SHA1.hmacStrength = 80;
    SHA1.padLength = 64;
    SHA1.prototype._update = function _update(msg, start) {
      var W = this.W;
      for (var i3 = 0; i3 < 16; i3++)
        W[i3] = msg[start + i3];
      for (; i3 < W.length; i3++)
        W[i3] = rotl32(W[i3 - 3] ^ W[i3 - 8] ^ W[i3 - 14] ^ W[i3 - 16], 1);
      var a3 = this.h[0];
      var b3 = this.h[1];
      var c3 = this.h[2];
      var d2 = this.h[3];
      var e3 = this.h[4];
      for (i3 = 0; i3 < W.length; i3++) {
        var s2 = ~~(i3 / 20);
        var t3 = sum32_5(rotl32(a3, 5), ft_1(s2, b3, c3, d2), e3, W[i3], sha1_K[s2]);
        e3 = d2;
        d2 = c3;
        c3 = rotl32(b3, 30);
        b3 = a3;
        a3 = t3;
      }
      this.h[0] = sum32(this.h[0], a3);
      this.h[1] = sum32(this.h[1], b3);
      this.h[2] = sum32(this.h[2], c3);
      this.h[3] = sum32(this.h[3], d2);
      this.h[4] = sum32(this.h[4], e3);
    };
    SHA1.prototype._digest = function digest(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h, "big");
      else
        return utils.split32(this.h, "big");
    };
  }
});

// node_modules/hash.js/lib/hash/sha/256.js
var require__2 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/256.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var common = require_common();
    var shaCommon = require_common2();
    var assert2 = require_minimalistic_assert();
    var sum32 = utils.sum32;
    var sum32_4 = utils.sum32_4;
    var sum32_5 = utils.sum32_5;
    var ch32 = shaCommon.ch32;
    var maj32 = shaCommon.maj32;
    var s0_256 = shaCommon.s0_256;
    var s1_256 = shaCommon.s1_256;
    var g0_256 = shaCommon.g0_256;
    var g1_256 = shaCommon.g1_256;
    var BlockHash = common.BlockHash;
    var sha256_K = [
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ];
    function SHA256() {
      if (!(this instanceof SHA256))
        return new SHA256();
      BlockHash.call(this);
      this.h = [
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225
      ];
      this.k = sha256_K;
      this.W = new Array(64);
    }
    utils.inherits(SHA256, BlockHash);
    module2.exports = SHA256;
    SHA256.blockSize = 512;
    SHA256.outSize = 256;
    SHA256.hmacStrength = 192;
    SHA256.padLength = 64;
    SHA256.prototype._update = function _update(msg, start) {
      var W = this.W;
      for (var i3 = 0; i3 < 16; i3++)
        W[i3] = msg[start + i3];
      for (; i3 < W.length; i3++)
        W[i3] = sum32_4(g1_256(W[i3 - 2]), W[i3 - 7], g0_256(W[i3 - 15]), W[i3 - 16]);
      var a3 = this.h[0];
      var b3 = this.h[1];
      var c3 = this.h[2];
      var d2 = this.h[3];
      var e3 = this.h[4];
      var f3 = this.h[5];
      var g3 = this.h[6];
      var h2 = this.h[7];
      assert2(this.k.length === W.length);
      for (i3 = 0; i3 < W.length; i3++) {
        var T1 = sum32_5(h2, s1_256(e3), ch32(e3, f3, g3), this.k[i3], W[i3]);
        var T22 = sum32(s0_256(a3), maj32(a3, b3, c3));
        h2 = g3;
        g3 = f3;
        f3 = e3;
        e3 = sum32(d2, T1);
        d2 = c3;
        c3 = b3;
        b3 = a3;
        a3 = sum32(T1, T22);
      }
      this.h[0] = sum32(this.h[0], a3);
      this.h[1] = sum32(this.h[1], b3);
      this.h[2] = sum32(this.h[2], c3);
      this.h[3] = sum32(this.h[3], d2);
      this.h[4] = sum32(this.h[4], e3);
      this.h[5] = sum32(this.h[5], f3);
      this.h[6] = sum32(this.h[6], g3);
      this.h[7] = sum32(this.h[7], h2);
    };
    SHA256.prototype._digest = function digest(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h, "big");
      else
        return utils.split32(this.h, "big");
    };
  }
});

// node_modules/hash.js/lib/hash/sha/224.js
var require__3 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/224.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var SHA256 = require__2();
    function SHA224() {
      if (!(this instanceof SHA224))
        return new SHA224();
      SHA256.call(this);
      this.h = [
        3238371032,
        914150663,
        812702999,
        4144912697,
        4290775857,
        1750603025,
        1694076839,
        3204075428
      ];
    }
    utils.inherits(SHA224, SHA256);
    module2.exports = SHA224;
    SHA224.blockSize = 512;
    SHA224.outSize = 224;
    SHA224.hmacStrength = 192;
    SHA224.padLength = 64;
    SHA224.prototype._digest = function digest(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h.slice(0, 7), "big");
      else
        return utils.split32(this.h.slice(0, 7), "big");
    };
  }
});

// node_modules/hash.js/lib/hash/sha/512.js
var require__4 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/512.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var common = require_common();
    var assert2 = require_minimalistic_assert();
    var rotr64_hi = utils.rotr64_hi;
    var rotr64_lo = utils.rotr64_lo;
    var shr64_hi = utils.shr64_hi;
    var shr64_lo = utils.shr64_lo;
    var sum64 = utils.sum64;
    var sum64_hi = utils.sum64_hi;
    var sum64_lo = utils.sum64_lo;
    var sum64_4_hi = utils.sum64_4_hi;
    var sum64_4_lo = utils.sum64_4_lo;
    var sum64_5_hi = utils.sum64_5_hi;
    var sum64_5_lo = utils.sum64_5_lo;
    var BlockHash = common.BlockHash;
    var sha512_K = [
      1116352408,
      3609767458,
      1899447441,
      602891725,
      3049323471,
      3964484399,
      3921009573,
      2173295548,
      961987163,
      4081628472,
      1508970993,
      3053834265,
      2453635748,
      2937671579,
      2870763221,
      3664609560,
      3624381080,
      2734883394,
      310598401,
      1164996542,
      607225278,
      1323610764,
      1426881987,
      3590304994,
      1925078388,
      4068182383,
      2162078206,
      991336113,
      2614888103,
      633803317,
      3248222580,
      3479774868,
      3835390401,
      2666613458,
      4022224774,
      944711139,
      264347078,
      2341262773,
      604807628,
      2007800933,
      770255983,
      1495990901,
      1249150122,
      1856431235,
      1555081692,
      3175218132,
      1996064986,
      2198950837,
      2554220882,
      3999719339,
      2821834349,
      766784016,
      2952996808,
      2566594879,
      3210313671,
      3203337956,
      3336571891,
      1034457026,
      3584528711,
      2466948901,
      113926993,
      3758326383,
      338241895,
      168717936,
      666307205,
      1188179964,
      773529912,
      1546045734,
      1294757372,
      1522805485,
      1396182291,
      2643833823,
      1695183700,
      2343527390,
      1986661051,
      1014477480,
      2177026350,
      1206759142,
      2456956037,
      344077627,
      2730485921,
      1290863460,
      2820302411,
      3158454273,
      3259730800,
      3505952657,
      3345764771,
      106217008,
      3516065817,
      3606008344,
      3600352804,
      1432725776,
      4094571909,
      1467031594,
      275423344,
      851169720,
      430227734,
      3100823752,
      506948616,
      1363258195,
      659060556,
      3750685593,
      883997877,
      3785050280,
      958139571,
      3318307427,
      1322822218,
      3812723403,
      1537002063,
      2003034995,
      1747873779,
      3602036899,
      1955562222,
      1575990012,
      2024104815,
      1125592928,
      2227730452,
      2716904306,
      2361852424,
      442776044,
      2428436474,
      593698344,
      2756734187,
      3733110249,
      3204031479,
      2999351573,
      3329325298,
      3815920427,
      3391569614,
      3928383900,
      3515267271,
      566280711,
      3940187606,
      3454069534,
      4118630271,
      4000239992,
      116418474,
      1914138554,
      174292421,
      2731055270,
      289380356,
      3203993006,
      460393269,
      320620315,
      685471733,
      587496836,
      852142971,
      1086792851,
      1017036298,
      365543100,
      1126000580,
      2618297676,
      1288033470,
      3409855158,
      1501505948,
      4234509866,
      1607167915,
      987167468,
      1816402316,
      1246189591
    ];
    function SHA512() {
      if (!(this instanceof SHA512))
        return new SHA512();
      BlockHash.call(this);
      this.h = [
        1779033703,
        4089235720,
        3144134277,
        2227873595,
        1013904242,
        4271175723,
        2773480762,
        1595750129,
        1359893119,
        2917565137,
        2600822924,
        725511199,
        528734635,
        4215389547,
        1541459225,
        327033209
      ];
      this.k = sha512_K;
      this.W = new Array(160);
    }
    utils.inherits(SHA512, BlockHash);
    module2.exports = SHA512;
    SHA512.blockSize = 1024;
    SHA512.outSize = 512;
    SHA512.hmacStrength = 192;
    SHA512.padLength = 128;
    SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
      var W = this.W;
      for (var i3 = 0; i3 < 32; i3++)
        W[i3] = msg[start + i3];
      for (; i3 < W.length; i3 += 2) {
        var c0_hi = g1_512_hi(W[i3 - 4], W[i3 - 3]);
        var c0_lo = g1_512_lo(W[i3 - 4], W[i3 - 3]);
        var c1_hi = W[i3 - 14];
        var c1_lo = W[i3 - 13];
        var c2_hi = g0_512_hi(W[i3 - 30], W[i3 - 29]);
        var c2_lo = g0_512_lo(W[i3 - 30], W[i3 - 29]);
        var c3_hi = W[i3 - 32];
        var c3_lo = W[i3 - 31];
        W[i3] = sum64_4_hi(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
        W[i3 + 1] = sum64_4_lo(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
      }
    };
    SHA512.prototype._update = function _update(msg, start) {
      this._prepareBlock(msg, start);
      var W = this.W;
      var ah = this.h[0];
      var al = this.h[1];
      var bh = this.h[2];
      var bl = this.h[3];
      var ch = this.h[4];
      var cl = this.h[5];
      var dh = this.h[6];
      var dl = this.h[7];
      var eh = this.h[8];
      var el = this.h[9];
      var fh = this.h[10];
      var fl = this.h[11];
      var gh = this.h[12];
      var gl = this.h[13];
      var hh = this.h[14];
      var hl = this.h[15];
      assert2(this.k.length === W.length);
      for (var i3 = 0; i3 < W.length; i3 += 2) {
        var c0_hi = hh;
        var c0_lo = hl;
        var c1_hi = s1_512_hi(eh, el);
        var c1_lo = s1_512_lo(eh, el);
        var c2_hi = ch64_hi(eh, el, fh, fl, gh, gl);
        var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
        var c3_hi = this.k[i3];
        var c3_lo = this.k[i3 + 1];
        var c4_hi = W[i3];
        var c4_lo = W[i3 + 1];
        var T1_hi = sum64_5_hi(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
        var T1_lo = sum64_5_lo(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
        c0_hi = s0_512_hi(ah, al);
        c0_lo = s0_512_lo(ah, al);
        c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
        c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);
        var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
        var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);
        hh = gh;
        hl = gl;
        gh = fh;
        gl = fl;
        fh = eh;
        fl = el;
        eh = sum64_hi(dh, dl, T1_hi, T1_lo);
        el = sum64_lo(dl, dl, T1_hi, T1_lo);
        dh = ch;
        dl = cl;
        ch = bh;
        cl = bl;
        bh = ah;
        bl = al;
        ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
        al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
      }
      sum64(this.h, 0, ah, al);
      sum64(this.h, 2, bh, bl);
      sum64(this.h, 4, ch, cl);
      sum64(this.h, 6, dh, dl);
      sum64(this.h, 8, eh, el);
      sum64(this.h, 10, fh, fl);
      sum64(this.h, 12, gh, gl);
      sum64(this.h, 14, hh, hl);
    };
    SHA512.prototype._digest = function digest(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h, "big");
      else
        return utils.split32(this.h, "big");
    };
    function ch64_hi(xh, xl, yh, yl, zh) {
      var r3 = xh & yh ^ ~xh & zh;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function ch64_lo(xh, xl, yh, yl, zh, zl) {
      var r3 = xl & yl ^ ~xl & zl;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function maj64_hi(xh, xl, yh, yl, zh) {
      var r3 = xh & yh ^ xh & zh ^ yh & zh;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function maj64_lo(xh, xl, yh, yl, zh, zl) {
      var r3 = xl & yl ^ xl & zl ^ yl & zl;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function s0_512_hi(xh, xl) {
      var c0_hi = rotr64_hi(xh, xl, 28);
      var c1_hi = rotr64_hi(xl, xh, 2);
      var c2_hi = rotr64_hi(xl, xh, 7);
      var r3 = c0_hi ^ c1_hi ^ c2_hi;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function s0_512_lo(xh, xl) {
      var c0_lo = rotr64_lo(xh, xl, 28);
      var c1_lo = rotr64_lo(xl, xh, 2);
      var c2_lo = rotr64_lo(xl, xh, 7);
      var r3 = c0_lo ^ c1_lo ^ c2_lo;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function s1_512_hi(xh, xl) {
      var c0_hi = rotr64_hi(xh, xl, 14);
      var c1_hi = rotr64_hi(xh, xl, 18);
      var c2_hi = rotr64_hi(xl, xh, 9);
      var r3 = c0_hi ^ c1_hi ^ c2_hi;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function s1_512_lo(xh, xl) {
      var c0_lo = rotr64_lo(xh, xl, 14);
      var c1_lo = rotr64_lo(xh, xl, 18);
      var c2_lo = rotr64_lo(xl, xh, 9);
      var r3 = c0_lo ^ c1_lo ^ c2_lo;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function g0_512_hi(xh, xl) {
      var c0_hi = rotr64_hi(xh, xl, 1);
      var c1_hi = rotr64_hi(xh, xl, 8);
      var c2_hi = shr64_hi(xh, xl, 7);
      var r3 = c0_hi ^ c1_hi ^ c2_hi;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function g0_512_lo(xh, xl) {
      var c0_lo = rotr64_lo(xh, xl, 1);
      var c1_lo = rotr64_lo(xh, xl, 8);
      var c2_lo = shr64_lo(xh, xl, 7);
      var r3 = c0_lo ^ c1_lo ^ c2_lo;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function g1_512_hi(xh, xl) {
      var c0_hi = rotr64_hi(xh, xl, 19);
      var c1_hi = rotr64_hi(xl, xh, 29);
      var c2_hi = shr64_hi(xh, xl, 6);
      var r3 = c0_hi ^ c1_hi ^ c2_hi;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function g1_512_lo(xh, xl) {
      var c0_lo = rotr64_lo(xh, xl, 19);
      var c1_lo = rotr64_lo(xl, xh, 29);
      var c2_lo = shr64_lo(xh, xl, 6);
      var r3 = c0_lo ^ c1_lo ^ c2_lo;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
  }
});

// node_modules/hash.js/lib/hash/sha/384.js
var require__5 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/384.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var SHA512 = require__4();
    function SHA384() {
      if (!(this instanceof SHA384))
        return new SHA384();
      SHA512.call(this);
      this.h = [
        3418070365,
        3238371032,
        1654270250,
        914150663,
        2438529370,
        812702999,
        355462360,
        4144912697,
        1731405415,
        4290775857,
        2394180231,
        1750603025,
        3675008525,
        1694076839,
        1203062813,
        3204075428
      ];
    }
    utils.inherits(SHA384, SHA512);
    module2.exports = SHA384;
    SHA384.blockSize = 1024;
    SHA384.outSize = 384;
    SHA384.hmacStrength = 192;
    SHA384.padLength = 128;
    SHA384.prototype._digest = function digest(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h.slice(0, 12), "big");
      else
        return utils.split32(this.h.slice(0, 12), "big");
    };
  }
});

// node_modules/hash.js/lib/hash/sha.js
var require_sha = __commonJS({
  "node_modules/hash.js/lib/hash/sha.js"(exports2) {
    "use strict";
    exports2.sha1 = require__();
    exports2.sha224 = require__3();
    exports2.sha256 = require__2();
    exports2.sha384 = require__5();
    exports2.sha512 = require__4();
  }
});

// node_modules/hash.js/lib/hash/ripemd.js
var require_ripemd = __commonJS({
  "node_modules/hash.js/lib/hash/ripemd.js"(exports2) {
    "use strict";
    var utils = require_utils();
    var common = require_common();
    var rotl32 = utils.rotl32;
    var sum32 = utils.sum32;
    var sum32_3 = utils.sum32_3;
    var sum32_4 = utils.sum32_4;
    var BlockHash = common.BlockHash;
    function RIPEMD160() {
      if (!(this instanceof RIPEMD160))
        return new RIPEMD160();
      BlockHash.call(this);
      this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
      this.endian = "little";
    }
    utils.inherits(RIPEMD160, BlockHash);
    exports2.ripemd160 = RIPEMD160;
    RIPEMD160.blockSize = 512;
    RIPEMD160.outSize = 160;
    RIPEMD160.hmacStrength = 192;
    RIPEMD160.padLength = 64;
    RIPEMD160.prototype._update = function update2(msg, start) {
      var A = this.h[0];
      var B = this.h[1];
      var C2 = this.h[2];
      var D2 = this.h[3];
      var E = this.h[4];
      var Ah = A;
      var Bh = B;
      var Ch = C2;
      var Dh = D2;
      var Eh = E;
      for (var j3 = 0; j3 < 80; j3++) {
        var T3 = sum32(rotl32(sum32_4(A, f3(j3, B, C2, D2), msg[r3[j3] + start], K(j3)), s2[j3]), E);
        A = E;
        E = D2;
        D2 = rotl32(C2, 10);
        C2 = B;
        B = T3;
        T3 = sum32(rotl32(sum32_4(Ah, f3(79 - j3, Bh, Ch, Dh), msg[rh[j3] + start], Kh(j3)), sh[j3]), Eh);
        Ah = Eh;
        Eh = Dh;
        Dh = rotl32(Ch, 10);
        Ch = Bh;
        Bh = T3;
      }
      T3 = sum32_3(this.h[1], C2, Dh);
      this.h[1] = sum32_3(this.h[2], D2, Eh);
      this.h[2] = sum32_3(this.h[3], E, Ah);
      this.h[3] = sum32_3(this.h[4], A, Bh);
      this.h[4] = sum32_3(this.h[0], B, Ch);
      this.h[0] = T3;
    };
    RIPEMD160.prototype._digest = function digest(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h, "little");
      else
        return utils.split32(this.h, "little");
    };
    function f3(j3, x3, y3, z2) {
      if (j3 <= 15)
        return x3 ^ y3 ^ z2;
      else if (j3 <= 31)
        return x3 & y3 | ~x3 & z2;
      else if (j3 <= 47)
        return (x3 | ~y3) ^ z2;
      else if (j3 <= 63)
        return x3 & z2 | y3 & ~z2;
      else
        return x3 ^ (y3 | ~z2);
    }
    function K(j3) {
      if (j3 <= 15)
        return 0;
      else if (j3 <= 31)
        return 1518500249;
      else if (j3 <= 47)
        return 1859775393;
      else if (j3 <= 63)
        return 2400959708;
      else
        return 2840853838;
    }
    function Kh(j3) {
      if (j3 <= 15)
        return 1352829926;
      else if (j3 <= 31)
        return 1548603684;
      else if (j3 <= 47)
        return 1836072691;
      else if (j3 <= 63)
        return 2053994217;
      else
        return 0;
    }
    var r3 = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      7,
      4,
      13,
      1,
      10,
      6,
      15,
      3,
      12,
      0,
      9,
      5,
      2,
      14,
      11,
      8,
      3,
      10,
      14,
      4,
      9,
      15,
      8,
      1,
      2,
      7,
      0,
      6,
      13,
      11,
      5,
      12,
      1,
      9,
      11,
      10,
      0,
      8,
      12,
      4,
      13,
      3,
      7,
      15,
      14,
      5,
      6,
      2,
      4,
      0,
      5,
      9,
      7,
      12,
      2,
      10,
      14,
      1,
      3,
      8,
      11,
      6,
      15,
      13
    ];
    var rh = [
      5,
      14,
      7,
      0,
      9,
      2,
      11,
      4,
      13,
      6,
      15,
      8,
      1,
      10,
      3,
      12,
      6,
      11,
      3,
      7,
      0,
      13,
      5,
      10,
      14,
      15,
      8,
      12,
      4,
      9,
      1,
      2,
      15,
      5,
      1,
      3,
      7,
      14,
      6,
      9,
      11,
      8,
      12,
      2,
      10,
      0,
      4,
      13,
      8,
      6,
      4,
      1,
      3,
      11,
      15,
      0,
      5,
      12,
      2,
      13,
      9,
      7,
      10,
      14,
      12,
      15,
      10,
      4,
      1,
      5,
      8,
      7,
      6,
      2,
      13,
      14,
      0,
      3,
      9,
      11
    ];
    var s2 = [
      11,
      14,
      15,
      12,
      5,
      8,
      7,
      9,
      11,
      13,
      14,
      15,
      6,
      7,
      9,
      8,
      7,
      6,
      8,
      13,
      11,
      9,
      7,
      15,
      7,
      12,
      15,
      9,
      11,
      7,
      13,
      12,
      11,
      13,
      6,
      7,
      14,
      9,
      13,
      15,
      14,
      8,
      13,
      6,
      5,
      12,
      7,
      5,
      11,
      12,
      14,
      15,
      14,
      15,
      9,
      8,
      9,
      14,
      5,
      6,
      8,
      6,
      5,
      12,
      9,
      15,
      5,
      11,
      6,
      8,
      13,
      12,
      5,
      12,
      13,
      14,
      11,
      8,
      5,
      6
    ];
    var sh = [
      8,
      9,
      9,
      11,
      13,
      15,
      15,
      5,
      7,
      7,
      8,
      11,
      14,
      14,
      12,
      6,
      9,
      13,
      15,
      7,
      12,
      8,
      9,
      11,
      7,
      7,
      12,
      7,
      6,
      15,
      13,
      11,
      9,
      7,
      15,
      11,
      8,
      6,
      6,
      14,
      12,
      13,
      5,
      14,
      13,
      13,
      7,
      5,
      15,
      5,
      8,
      11,
      14,
      14,
      6,
      14,
      6,
      9,
      12,
      9,
      12,
      5,
      15,
      8,
      8,
      5,
      12,
      9,
      12,
      5,
      14,
      6,
      8,
      13,
      6,
      5,
      15,
      13,
      11,
      11
    ];
  }
});

// node_modules/hash.js/lib/hash/hmac.js
var require_hmac = __commonJS({
  "node_modules/hash.js/lib/hash/hmac.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var assert2 = require_minimalistic_assert();
    function Hmac(hash3, key2, enc) {
      if (!(this instanceof Hmac))
        return new Hmac(hash3, key2, enc);
      this.Hash = hash3;
      this.blockSize = hash3.blockSize / 8;
      this.outSize = hash3.outSize / 8;
      this.inner = null;
      this.outer = null;
      this._init(utils.toArray(key2, enc));
    }
    module2.exports = Hmac;
    Hmac.prototype._init = function init2(key2) {
      if (key2.length > this.blockSize)
        key2 = new this.Hash().update(key2).digest();
      assert2(key2.length <= this.blockSize);
      for (var i3 = key2.length; i3 < this.blockSize; i3++)
        key2.push(0);
      for (i3 = 0; i3 < key2.length; i3++)
        key2[i3] ^= 54;
      this.inner = new this.Hash().update(key2);
      for (i3 = 0; i3 < key2.length; i3++)
        key2[i3] ^= 106;
      this.outer = new this.Hash().update(key2);
    };
    Hmac.prototype.update = function update2(msg, enc) {
      this.inner.update(msg, enc);
      return this;
    };
    Hmac.prototype.digest = function digest(enc) {
      this.outer.update(this.inner.digest());
      return this.outer.digest(enc);
    };
  }
});

// node_modules/hash.js/lib/hash.js
var require_hash = __commonJS({
  "node_modules/hash.js/lib/hash.js"(exports2) {
    var hash3 = exports2;
    hash3.utils = require_utils();
    hash3.common = require_common();
    hash3.sha = require_sha();
    hash3.ripemd = require_ripemd();
    hash3.hmac = require_hmac();
    hash3.sha1 = hash3.sha.sha1;
    hash3.sha256 = hash3.sha.sha256;
    hash3.sha224 = hash3.sha.sha224;
    hash3.sha384 = hash3.sha.sha384;
    hash3.sha512 = hash3.sha.sha512;
    hash3.ripemd160 = hash3.ripemd.ripemd160;
  }
});

// node_modules/aes-js/index.js
var require_aes_js = __commonJS({
  "node_modules/aes-js/index.js"(exports2, module2) {
    "use strict";
    (function(root) {
      function checkInt(value) {
        return parseInt(value) === value;
      }
      function checkInts(arrayish) {
        if (!checkInt(arrayish.length)) {
          return false;
        }
        for (var i3 = 0; i3 < arrayish.length; i3++) {
          if (!checkInt(arrayish[i3]) || arrayish[i3] < 0 || arrayish[i3] > 255) {
            return false;
          }
        }
        return true;
      }
      function coerceArray(arg, copy) {
        if (arg.buffer && ArrayBuffer.isView(arg) && arg.name === "Uint8Array") {
          if (copy) {
            if (arg.slice) {
              arg = arg.slice();
            } else {
              arg = Array.prototype.slice.call(arg);
            }
          }
          return arg;
        }
        if (Array.isArray(arg)) {
          if (!checkInts(arg)) {
            throw new Error("Array contains invalid value: " + arg);
          }
          return new Uint8Array(arg);
        }
        if (checkInt(arg.length) && checkInts(arg)) {
          return new Uint8Array(arg);
        }
        throw new Error("unsupported array-like object");
      }
      function createArray(length) {
        return new Uint8Array(length);
      }
      function copyArray(sourceArray, targetArray, targetStart, sourceStart, sourceEnd) {
        if (sourceStart != null || sourceEnd != null) {
          if (sourceArray.slice) {
            sourceArray = sourceArray.slice(sourceStart, sourceEnd);
          } else {
            sourceArray = Array.prototype.slice.call(sourceArray, sourceStart, sourceEnd);
          }
        }
        targetArray.set(sourceArray, targetStart);
      }
      var convertUtf8 = function() {
        function toBytes(text) {
          var result = [], i3 = 0;
          text = encodeURI(text);
          while (i3 < text.length) {
            var c3 = text.charCodeAt(i3++);
            if (c3 === 37) {
              result.push(parseInt(text.substr(i3, 2), 16));
              i3 += 2;
            } else {
              result.push(c3);
            }
          }
          return coerceArray(result);
        }
        function fromBytes(bytes) {
          var result = [], i3 = 0;
          while (i3 < bytes.length) {
            var c3 = bytes[i3];
            if (c3 < 128) {
              result.push(String.fromCharCode(c3));
              i3++;
            } else if (c3 > 191 && c3 < 224) {
              result.push(String.fromCharCode((c3 & 31) << 6 | bytes[i3 + 1] & 63));
              i3 += 2;
            } else {
              result.push(String.fromCharCode((c3 & 15) << 12 | (bytes[i3 + 1] & 63) << 6 | bytes[i3 + 2] & 63));
              i3 += 3;
            }
          }
          return result.join("");
        }
        return {
          toBytes,
          fromBytes
        };
      }();
      var convertHex = function() {
        function toBytes(text) {
          var result = [];
          for (var i3 = 0; i3 < text.length; i3 += 2) {
            result.push(parseInt(text.substr(i3, 2), 16));
          }
          return result;
        }
        var Hex = "0123456789abcdef";
        function fromBytes(bytes) {
          var result = [];
          for (var i3 = 0; i3 < bytes.length; i3++) {
            var v3 = bytes[i3];
            result.push(Hex[(v3 & 240) >> 4] + Hex[v3 & 15]);
          }
          return result.join("");
        }
        return {
          toBytes,
          fromBytes
        };
      }();
      var numberOfRounds = { 16: 10, 24: 12, 32: 14 };
      var rcon = [1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145];
      var S2 = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22];
      var Si = [82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125];
      var T1 = [3328402341, 4168907908, 4000806809, 4135287693, 4294111757, 3597364157, 3731845041, 2445657428, 1613770832, 33620227, 3462883241, 1445669757, 3892248089, 3050821474, 1303096294, 3967186586, 2412431941, 528646813, 2311702848, 4202528135, 4026202645, 2992200171, 2387036105, 4226871307, 1101901292, 3017069671, 1604494077, 1169141738, 597466303, 1403299063, 3832705686, 2613100635, 1974974402, 3791519004, 1033081774, 1277568618, 1815492186, 2118074177, 4126668546, 2211236943, 1748251740, 1369810420, 3521504564, 4193382664, 3799085459, 2883115123, 1647391059, 706024767, 134480908, 2512897874, 1176707941, 2646852446, 806885416, 932615841, 168101135, 798661301, 235341577, 605164086, 461406363, 3756188221, 3454790438, 1311188841, 2142417613, 3933566367, 302582043, 495158174, 1479289972, 874125870, 907746093, 3698224818, 3025820398, 1537253627, 2756858614, 1983593293, 3084310113, 2108928974, 1378429307, 3722699582, 1580150641, 327451799, 2790478837, 3117535592, 0, 3253595436, 1075847264, 3825007647, 2041688520, 3059440621, 3563743934, 2378943302, 1740553945, 1916352843, 2487896798, 2555137236, 2958579944, 2244988746, 3151024235, 3320835882, 1336584933, 3992714006, 2252555205, 2588757463, 1714631509, 293963156, 2319795663, 3925473552, 67240454, 4269768577, 2689618160, 2017213508, 631218106, 1269344483, 2723238387, 1571005438, 2151694528, 93294474, 1066570413, 563977660, 1882732616, 4059428100, 1673313503, 2008463041, 2950355573, 1109467491, 537923632, 3858759450, 4260623118, 3218264685, 2177748300, 403442708, 638784309, 3287084079, 3193921505, 899127202, 2286175436, 773265209, 2479146071, 1437050866, 4236148354, 2050833735, 3362022572, 3126681063, 840505643, 3866325909, 3227541664, 427917720, 2655997905, 2749160575, 1143087718, 1412049534, 999329963, 193497219, 2353415882, 3354324521, 1807268051, 672404540, 2816401017, 3160301282, 369822493, 2916866934, 3688947771, 1681011286, 1949973070, 336202270, 2454276571, 201721354, 1210328172, 3093060836, 2680341085, 3184776046, 1135389935, 3294782118, 965841320, 831886756, 3554993207, 4068047243, 3588745010, 2345191491, 1849112409, 3664604599, 26054028, 2983581028, 2622377682, 1235855840, 3630984372, 2891339514, 4092916743, 3488279077, 3395642799, 4101667470, 1202630377, 268961816, 1874508501, 4034427016, 1243948399, 1546530418, 941366308, 1470539505, 1941222599, 2546386513, 3421038627, 2715671932, 3899946140, 1042226977, 2521517021, 1639824860, 227249030, 260737669, 3765465232, 2084453954, 1907733956, 3429263018, 2420656344, 100860677, 4160157185, 470683154, 3261161891, 1781871967, 2924959737, 1773779408, 394692241, 2579611992, 974986535, 664706745, 3655459128, 3958962195, 731420851, 571543859, 3530123707, 2849626480, 126783113, 865375399, 765172662, 1008606754, 361203602, 3387549984, 2278477385, 2857719295, 1344809080, 2782912378, 59542671, 1503764984, 160008576, 437062935, 1707065306, 3622233649, 2218934982, 3496503480, 2185314755, 697932208, 1512910199, 504303377, 2075177163, 2824099068, 1841019862, 739644986];
      var T22 = [2781242211, 2230877308, 2582542199, 2381740923, 234877682, 3184946027, 2984144751, 1418839493, 1348481072, 50462977, 2848876391, 2102799147, 434634494, 1656084439, 3863849899, 2599188086, 1167051466, 2636087938, 1082771913, 2281340285, 368048890, 3954334041, 3381544775, 201060592, 3963727277, 1739838676, 4250903202, 3930435503, 3206782108, 4149453988, 2531553906, 1536934080, 3262494647, 484572669, 2923271059, 1783375398, 1517041206, 1098792767, 49674231, 1334037708, 1550332980, 4098991525, 886171109, 150598129, 2481090929, 1940642008, 1398944049, 1059722517, 201851908, 1385547719, 1699095331, 1587397571, 674240536, 2704774806, 252314885, 3039795866, 151914247, 908333586, 2602270848, 1038082786, 651029483, 1766729511, 3447698098, 2682942837, 454166793, 2652734339, 1951935532, 775166490, 758520603, 3000790638, 4004797018, 4217086112, 4137964114, 1299594043, 1639438038, 3464344499, 2068982057, 1054729187, 1901997871, 2534638724, 4121318227, 1757008337, 0, 750906861, 1614815264, 535035132, 3363418545, 3988151131, 3201591914, 1183697867, 3647454910, 1265776953, 3734260298, 3566750796, 3903871064, 1250283471, 1807470800, 717615087, 3847203498, 384695291, 3313910595, 3617213773, 1432761139, 2484176261, 3481945413, 283769337, 100925954, 2180939647, 4037038160, 1148730428, 3123027871, 3813386408, 4087501137, 4267549603, 3229630528, 2315620239, 2906624658, 3156319645, 1215313976, 82966005, 3747855548, 3245848246, 1974459098, 1665278241, 807407632, 451280895, 251524083, 1841287890, 1283575245, 337120268, 891687699, 801369324, 3787349855, 2721421207, 3431482436, 959321879, 1469301956, 4065699751, 2197585534, 1199193405, 2898814052, 3887750493, 724703513, 2514908019, 2696962144, 2551808385, 3516813135, 2141445340, 1715741218, 2119445034, 2872807568, 2198571144, 3398190662, 700968686, 3547052216, 1009259540, 2041044702, 3803995742, 487983883, 1991105499, 1004265696, 1449407026, 1316239930, 504629770, 3683797321, 168560134, 1816667172, 3837287516, 1570751170, 1857934291, 4014189740, 2797888098, 2822345105, 2754712981, 936633572, 2347923833, 852879335, 1133234376, 1500395319, 3084545389, 2348912013, 1689376213, 3533459022, 3762923945, 3034082412, 4205598294, 133428468, 634383082, 2949277029, 2398386810, 3913789102, 403703816, 3580869306, 2297460856, 1867130149, 1918643758, 607656988, 4049053350, 3346248884, 1368901318, 600565992, 2090982877, 2632479860, 557719327, 3717614411, 3697393085, 2249034635, 2232388234, 2430627952, 1115438654, 3295786421, 2865522278, 3633334344, 84280067, 33027830, 303828494, 2747425121, 1600795957, 4188952407, 3496589753, 2434238086, 1486471617, 658119965, 3106381470, 953803233, 334231800, 3005978776, 857870609, 3151128937, 1890179545, 2298973838, 2805175444, 3056442267, 574365214, 2450884487, 550103529, 1233637070, 4289353045, 2018519080, 2057691103, 2399374476, 4166623649, 2148108681, 387583245, 3664101311, 836232934, 3330556482, 3100665960, 3280093505, 2955516313, 2002398509, 287182607, 3413881008, 4238890068, 3597515707, 975967766];
      var T3 = [1671808611, 2089089148, 2006576759, 2072901243, 4061003762, 1807603307, 1873927791, 3310653893, 810573872, 16974337, 1739181671, 729634347, 4263110654, 3613570519, 2883997099, 1989864566, 3393556426, 2191335298, 3376449993, 2106063485, 4195741690, 1508618841, 1204391495, 4027317232, 2917941677, 3563566036, 2734514082, 2951366063, 2629772188, 2767672228, 1922491506, 3227229120, 3082974647, 4246528509, 2477669779, 644500518, 911895606, 1061256767, 4144166391, 3427763148, 878471220, 2784252325, 3845444069, 4043897329, 1905517169, 3631459288, 827548209, 356461077, 67897348, 3344078279, 593839651, 3277757891, 405286936, 2527147926, 84871685, 2595565466, 118033927, 305538066, 2157648768, 3795705826, 3945188843, 661212711, 2999812018, 1973414517, 152769033, 2208177539, 745822252, 439235610, 455947803, 1857215598, 1525593178, 2700827552, 1391895634, 994932283, 3596728278, 3016654259, 695947817, 3812548067, 795958831, 2224493444, 1408607827, 3513301457, 0, 3979133421, 543178784, 4229948412, 2982705585, 1542305371, 1790891114, 3410398667, 3201918910, 961245753, 1256100938, 1289001036, 1491644504, 3477767631, 3496721360, 4012557807, 2867154858, 4212583931, 1137018435, 1305975373, 861234739, 2241073541, 1171229253, 4178635257, 33948674, 2139225727, 1357946960, 1011120188, 2679776671, 2833468328, 1374921297, 2751356323, 1086357568, 2408187279, 2460827538, 2646352285, 944271416, 4110742005, 3168756668, 3066132406, 3665145818, 560153121, 271589392, 4279952895, 4077846003, 3530407890, 3444343245, 202643468, 322250259, 3962553324, 1608629855, 2543990167, 1154254916, 389623319, 3294073796, 2817676711, 2122513534, 1028094525, 1689045092, 1575467613, 422261273, 1939203699, 1621147744, 2174228865, 1339137615, 3699352540, 577127458, 712922154, 2427141008, 2290289544, 1187679302, 3995715566, 3100863416, 339486740, 3732514782, 1591917662, 186455563, 3681988059, 3762019296, 844522546, 978220090, 169743370, 1239126601, 101321734, 611076132, 1558493276, 3260915650, 3547250131, 2901361580, 1655096418, 2443721105, 2510565781, 3828863972, 2039214713, 3878868455, 3359869896, 928607799, 1840765549, 2374762893, 3580146133, 1322425422, 2850048425, 1823791212, 1459268694, 4094161908, 3928346602, 1706019429, 2056189050, 2934523822, 135794696, 3134549946, 2022240376, 628050469, 779246638, 472135708, 2800834470, 3032970164, 3327236038, 3894660072, 3715932637, 1956440180, 522272287, 1272813131, 3185336765, 2340818315, 2323976074, 1888542832, 1044544574, 3049550261, 1722469478, 1222152264, 50660867, 4127324150, 236067854, 1638122081, 895445557, 1475980887, 3117443513, 2257655686, 3243809217, 489110045, 2662934430, 3778599393, 4162055160, 2561878936, 288563729, 1773916777, 3648039385, 2391345038, 2493985684, 2612407707, 505560094, 2274497927, 3911240169, 3460925390, 1442818645, 678973480, 3749357023, 2358182796, 2717407649, 2306869641, 219617805, 3218761151, 3862026214, 1120306242, 1756942440, 1103331905, 2578459033, 762796589, 252780047, 2966125488, 1425844308, 3151392187, 372911126];
      var T4 = [1667474886, 2088535288, 2004326894, 2071694838, 4075949567, 1802223062, 1869591006, 3318043793, 808472672, 16843522, 1734846926, 724270422, 4278065639, 3621216949, 2880169549, 1987484396, 3402253711, 2189597983, 3385409673, 2105378810, 4210693615, 1499065266, 1195886990, 4042263547, 2913856577, 3570689971, 2728590687, 2947541573, 2627518243, 2762274643, 1920112356, 3233831835, 3082273397, 4261223649, 2475929149, 640051788, 909531756, 1061110142, 4160160501, 3435941763, 875846760, 2779116625, 3857003729, 4059105529, 1903268834, 3638064043, 825316194, 353713962, 67374088, 3351728789, 589522246, 3284360861, 404236336, 2526454071, 84217610, 2593830191, 117901582, 303183396, 2155911963, 3806477791, 3958056653, 656894286, 2998062463, 1970642922, 151591698, 2206440989, 741110872, 437923380, 454765878, 1852748508, 1515908788, 2694904667, 1381168804, 993742198, 3604373943, 3014905469, 690584402, 3823320797, 791638366, 2223281939, 1398011302, 3520161977, 0, 3991743681, 538992704, 4244381667, 2981218425, 1532751286, 1785380564, 3419096717, 3200178535, 960056178, 1246420628, 1280103576, 1482221744, 3486468741, 3503319995, 4025428677, 2863326543, 4227536621, 1128514950, 1296947098, 859002214, 2240123921, 1162203018, 4193849577, 33687044, 2139062782, 1347481760, 1010582648, 2678045221, 2829640523, 1364325282, 2745433693, 1077985408, 2408548869, 2459086143, 2644360225, 943212656, 4126475505, 3166494563, 3065430391, 3671750063, 555836226, 269496352, 4294908645, 4092792573, 3537006015, 3452783745, 202118168, 320025894, 3974901699, 1600119230, 2543297077, 1145359496, 387397934, 3301201811, 2812801621, 2122220284, 1027426170, 1684319432, 1566435258, 421079858, 1936954854, 1616945344, 2172753945, 1330631070, 3705438115, 572679748, 707427924, 2425400123, 2290647819, 1179044492, 4008585671, 3099120491, 336870440, 3739122087, 1583276732, 185277718, 3688593069, 3772791771, 842159716, 976899700, 168435220, 1229577106, 101059084, 606366792, 1549591736, 3267517855, 3553849021, 2897014595, 1650632388, 2442242105, 2509612081, 3840161747, 2038008818, 3890688725, 3368567691, 926374254, 1835907034, 2374863873, 3587531953, 1313788572, 2846482505, 1819063512, 1448540844, 4109633523, 3941213647, 1701162954, 2054852340, 2930698567, 134748176, 3132806511, 2021165296, 623210314, 774795868, 471606328, 2795958615, 3031746419, 3334885783, 3907527627, 3722280097, 1953799400, 522133822, 1263263126, 3183336545, 2341176845, 2324333839, 1886425312, 1044267644, 3048588401, 1718004428, 1212733584, 50529542, 4143317495, 235803164, 1633788866, 892690282, 1465383342, 3115962473, 2256965911, 3250673817, 488449850, 2661202215, 3789633753, 4177007595, 2560144171, 286339874, 1768537042, 3654906025, 2391705863, 2492770099, 2610673197, 505291324, 2273808917, 3924369609, 3469625735, 1431699370, 673740880, 3755965093, 2358021891, 2711746649, 2307489801, 218961690, 3217021541, 3873845719, 1111672452, 1751693520, 1094828930, 2576986153, 757954394, 252645662, 2964376443, 1414855848, 3149649517, 370555436];
      var T5 = [1374988112, 2118214995, 437757123, 975658646, 1001089995, 530400753, 2902087851, 1273168787, 540080725, 2910219766, 2295101073, 4110568485, 1340463100, 3307916247, 641025152, 3043140495, 3736164937, 632953703, 1172967064, 1576976609, 3274667266, 2169303058, 2370213795, 1809054150, 59727847, 361929877, 3211623147, 2505202138, 3569255213, 1484005843, 1239443753, 2395588676, 1975683434, 4102977912, 2572697195, 666464733, 3202437046, 4035489047, 3374361702, 2110667444, 1675577880, 3843699074, 2538681184, 1649639237, 2976151520, 3144396420, 4269907996, 4178062228, 1883793496, 2403728665, 2497604743, 1383856311, 2876494627, 1917518562, 3810496343, 1716890410, 3001755655, 800440835, 2261089178, 3543599269, 807962610, 599762354, 33778362, 3977675356, 2328828971, 2809771154, 4077384432, 1315562145, 1708848333, 101039829, 3509871135, 3299278474, 875451293, 2733856160, 92987698, 2767645557, 193195065, 1080094634, 1584504582, 3178106961, 1042385657, 2531067453, 3711829422, 1306967366, 2438237621, 1908694277, 67556463, 1615861247, 429456164, 3602770327, 2302690252, 1742315127, 2968011453, 126454664, 3877198648, 2043211483, 2709260871, 2084704233, 4169408201, 0, 159417987, 841739592, 504459436, 1817866830, 4245618683, 260388950, 1034867998, 908933415, 168810852, 1750902305, 2606453969, 607530554, 202008497, 2472011535, 3035535058, 463180190, 2160117071, 1641816226, 1517767529, 470948374, 3801332234, 3231722213, 1008918595, 303765277, 235474187, 4069246893, 766945465, 337553864, 1475418501, 2943682380, 4003061179, 2743034109, 4144047775, 1551037884, 1147550661, 1543208500, 2336434550, 3408119516, 3069049960, 3102011747, 3610369226, 1113818384, 328671808, 2227573024, 2236228733, 3535486456, 2935566865, 3341394285, 496906059, 3702665459, 226906860, 2009195472, 733156972, 2842737049, 294930682, 1206477858, 2835123396, 2700099354, 1451044056, 573804783, 2269728455, 3644379585, 2362090238, 2564033334, 2801107407, 2776292904, 3669462566, 1068351396, 742039012, 1350078989, 1784663195, 1417561698, 4136440770, 2430122216, 775550814, 2193862645, 2673705150, 1775276924, 1876241833, 3475313331, 3366754619, 270040487, 3902563182, 3678124923, 3441850377, 1851332852, 3969562369, 2203032232, 3868552805, 2868897406, 566021896, 4011190502, 3135740889, 1248802510, 3936291284, 699432150, 832877231, 708780849, 3332740144, 899835584, 1951317047, 4236429990, 3767586992, 866637845, 4043610186, 1106041591, 2144161806, 395441711, 1984812685, 1139781709, 3433712980, 3835036895, 2664543715, 1282050075, 3240894392, 1181045119, 2640243204, 25965917, 4203181171, 4211818798, 3009879386, 2463879762, 3910161971, 1842759443, 2597806476, 933301370, 1509430414, 3943906441, 3467192302, 3076639029, 3776767469, 2051518780, 2631065433, 1441952575, 404016761, 1942435775, 1408749034, 1610459739, 3745345300, 2017778566, 3400528769, 3110650942, 941896748, 3265478751, 371049330, 3168937228, 675039627, 4279080257, 967311729, 135050206, 3635733660, 1683407248, 2076935265, 3576870512, 1215061108, 3501741890];
      var T6 = [1347548327, 1400783205, 3273267108, 2520393566, 3409685355, 4045380933, 2880240216, 2471224067, 1428173050, 4138563181, 2441661558, 636813900, 4233094615, 3620022987, 2149987652, 2411029155, 1239331162, 1730525723, 2554718734, 3781033664, 46346101, 310463728, 2743944855, 3328955385, 3875770207, 2501218972, 3955191162, 3667219033, 768917123, 3545789473, 692707433, 1150208456, 1786102409, 2029293177, 1805211710, 3710368113, 3065962831, 401639597, 1724457132, 3028143674, 409198410, 2196052529, 1620529459, 1164071807, 3769721975, 2226875310, 486441376, 2499348523, 1483753576, 428819965, 2274680428, 3075636216, 598438867, 3799141122, 1474502543, 711349675, 129166120, 53458370, 2592523643, 2782082824, 4063242375, 2988687269, 3120694122, 1559041666, 730517276, 2460449204, 4042459122, 2706270690, 3446004468, 3573941694, 533804130, 2328143614, 2637442643, 2695033685, 839224033, 1973745387, 957055980, 2856345839, 106852767, 1371368976, 4181598602, 1033297158, 2933734917, 1179510461, 3046200461, 91341917, 1862534868, 4284502037, 605657339, 2547432937, 3431546947, 2003294622, 3182487618, 2282195339, 954669403, 3682191598, 1201765386, 3917234703, 3388507166, 0, 2198438022, 1211247597, 2887651696, 1315723890, 4227665663, 1443857720, 507358933, 657861945, 1678381017, 560487590, 3516619604, 975451694, 2970356327, 261314535, 3535072918, 2652609425, 1333838021, 2724322336, 1767536459, 370938394, 182621114, 3854606378, 1128014560, 487725847, 185469197, 2918353863, 3106780840, 3356761769, 2237133081, 1286567175, 3152976349, 4255350624, 2683765030, 3160175349, 3309594171, 878443390, 1988838185, 3704300486, 1756818940, 1673061617, 3403100636, 272786309, 1075025698, 545572369, 2105887268, 4174560061, 296679730, 1841768865, 1260232239, 4091327024, 3960309330, 3497509347, 1814803222, 2578018489, 4195456072, 575138148, 3299409036, 446754879, 3629546796, 4011996048, 3347532110, 3252238545, 4270639778, 915985419, 3483825537, 681933534, 651868046, 2755636671, 3828103837, 223377554, 2607439820, 1649704518, 3270937875, 3901806776, 1580087799, 4118987695, 3198115200, 2087309459, 2842678573, 3016697106, 1003007129, 2802849917, 1860738147, 2077965243, 164439672, 4100872472, 32283319, 2827177882, 1709610350, 2125135846, 136428751, 3874428392, 3652904859, 3460984630, 3572145929, 3593056380, 2939266226, 824852259, 818324884, 3224740454, 930369212, 2801566410, 2967507152, 355706840, 1257309336, 4148292826, 243256656, 790073846, 2373340630, 1296297904, 1422699085, 3756299780, 3818836405, 457992840, 3099667487, 2135319889, 77422314, 1560382517, 1945798516, 788204353, 1521706781, 1385356242, 870912086, 325965383, 2358957921, 2050466060, 2388260884, 2313884476, 4006521127, 901210569, 3990953189, 1014646705, 1503449823, 1062597235, 2031621326, 3212035895, 3931371469, 1533017514, 350174575, 2256028891, 2177544179, 1052338372, 741876788, 1606591296, 1914052035, 213705253, 2334669897, 1107234197, 1899603969, 3725069491, 2631447780, 2422494913, 1635502980, 1893020342, 1950903388, 1120974935];
      var T7 = [2807058932, 1699970625, 2764249623, 1586903591, 1808481195, 1173430173, 1487645946, 59984867, 4199882800, 1844882806, 1989249228, 1277555970, 3623636965, 3419915562, 1149249077, 2744104290, 1514790577, 459744698, 244860394, 3235995134, 1963115311, 4027744588, 2544078150, 4190530515, 1608975247, 2627016082, 2062270317, 1507497298, 2200818878, 567498868, 1764313568, 3359936201, 2305455554, 2037970062, 1047239e3, 1910319033, 1337376481, 2904027272, 2892417312, 984907214, 1243112415, 830661914, 861968209, 2135253587, 2011214180, 2927934315, 2686254721, 731183368, 1750626376, 4246310725, 1820824798, 4172763771, 3542330227, 48394827, 2404901663, 2871682645, 671593195, 3254988725, 2073724613, 145085239, 2280796200, 2779915199, 1790575107, 2187128086, 472615631, 3029510009, 4075877127, 3802222185, 4107101658, 3201631749, 1646252340, 4270507174, 1402811438, 1436590835, 3778151818, 3950355702, 3963161475, 4020912224, 2667994737, 273792366, 2331590177, 104699613, 95345982, 3175501286, 2377486676, 1560637892, 3564045318, 369057872, 4213447064, 3919042237, 1137477952, 2658625497, 1119727848, 2340947849, 1530455833, 4007360968, 172466556, 266959938, 516552836, 0, 2256734592, 3980931627, 1890328081, 1917742170, 4294704398, 945164165, 3575528878, 958871085, 3647212047, 2787207260, 1423022939, 775562294, 1739656202, 3876557655, 2530391278, 2443058075, 3310321856, 547512796, 1265195639, 437656594, 3121275539, 719700128, 3762502690, 387781147, 218828297, 3350065803, 2830708150, 2848461854, 428169201, 122466165, 3720081049, 1627235199, 648017665, 4122762354, 1002783846, 2117360635, 695634755, 3336358691, 4234721005, 4049844452, 3704280881, 2232435299, 574624663, 287343814, 612205898, 1039717051, 840019705, 2708326185, 793451934, 821288114, 1391201670, 3822090177, 376187827, 3113855344, 1224348052, 1679968233, 2361698556, 1058709744, 752375421, 2431590963, 1321699145, 3519142200, 2734591178, 188127444, 2177869557, 3727205754, 2384911031, 3215212461, 2648976442, 2450346104, 3432737375, 1180849278, 331544205, 3102249176, 4150144569, 2952102595, 2159976285, 2474404304, 766078933, 313773861, 2570832044, 2108100632, 1668212892, 3145456443, 2013908262, 418672217, 3070356634, 2594734927, 1852171925, 3867060991, 3473416636, 3907448597, 2614737639, 919489135, 164948639, 2094410160, 2997825956, 590424639, 2486224549, 1723872674, 3157750862, 3399941250, 3501252752, 3625268135, 2555048196, 3673637356, 1343127501, 4130281361, 3599595085, 2957853679, 1297403050, 81781910, 3051593425, 2283490410, 532201772, 1367295589, 3926170974, 895287692, 1953757831, 1093597963, 492483431, 3528626907, 1446242576, 1192455638, 1636604631, 209336225, 344873464, 1015671571, 669961897, 3375740769, 3857572124, 2973530695, 3747192018, 1933530610, 3464042516, 935293895, 3454686199, 2858115069, 1863638845, 3683022916, 4085369519, 3292445032, 875313188, 1080017571, 3279033885, 621591778, 1233856572, 2504130317, 24197544, 3017672716, 3835484340, 3247465558, 2220981195, 3060847922, 1551124588, 1463996600];
      var T8 = [4104605777, 1097159550, 396673818, 660510266, 2875968315, 2638606623, 4200115116, 3808662347, 821712160, 1986918061, 3430322568, 38544885, 3856137295, 718002117, 893681702, 1654886325, 2975484382, 3122358053, 3926825029, 4274053469, 796197571, 1290801793, 1184342925, 3556361835, 2405426947, 2459735317, 1836772287, 1381620373, 3196267988, 1948373848, 3764988233, 3385345166, 3263785589, 2390325492, 1480485785, 3111247143, 3780097726, 2293045232, 548169417, 3459953789, 3746175075, 439452389, 1362321559, 1400849762, 1685577905, 1806599355, 2174754046, 137073913, 1214797936, 1174215055, 3731654548, 2079897426, 1943217067, 1258480242, 529487843, 1437280870, 3945269170, 3049390895, 3313212038, 923313619, 679998e3, 3215307299, 57326082, 377642221, 3474729866, 2041877159, 133361907, 1776460110, 3673476453, 96392454, 878845905, 2801699524, 777231668, 4082475170, 2330014213, 4142626212, 2213296395, 1626319424, 1906247262, 1846563261, 562755902, 3708173718, 1040559837, 3871163981, 1418573201, 3294430577, 114585348, 1343618912, 2566595609, 3186202582, 1078185097, 3651041127, 3896688048, 2307622919, 425408743, 3371096953, 2081048481, 1108339068, 2216610296, 0, 2156299017, 736970802, 292596766, 1517440620, 251657213, 2235061775, 2933202493, 758720310, 265905162, 1554391400, 1532285339, 908999204, 174567692, 1474760595, 4002861748, 2610011675, 3234156416, 3693126241, 2001430874, 303699484, 2478443234, 2687165888, 585122620, 454499602, 151849742, 2345119218, 3064510765, 514443284, 4044981591, 1963412655, 2581445614, 2137062819, 19308535, 1928707164, 1715193156, 4219352155, 1126790795, 600235211, 3992742070, 3841024952, 836553431, 1669664834, 2535604243, 3323011204, 1243905413, 3141400786, 4180808110, 698445255, 2653899549, 2989552604, 2253581325, 3252932727, 3004591147, 1891211689, 2487810577, 3915653703, 4237083816, 4030667424, 2100090966, 865136418, 1229899655, 953270745, 3399679628, 3557504664, 4118925222, 2061379749, 3079546586, 2915017791, 983426092, 2022837584, 1607244650, 2118541908, 2366882550, 3635996816, 972512814, 3283088770, 1568718495, 3499326569, 3576539503, 621982671, 2895723464, 410887952, 2623762152, 1002142683, 645401037, 1494807662, 2595684844, 1335535747, 2507040230, 4293295786, 3167684641, 367585007, 3885750714, 1865862730, 2668221674, 2960971305, 2763173681, 1059270954, 2777952454, 2724642869, 1320957812, 2194319100, 2429595872, 2815956275, 77089521, 3973773121, 3444575871, 2448830231, 1305906550, 4021308739, 2857194700, 2516901860, 3518358430, 1787304780, 740276417, 1699839814, 1592394909, 2352307457, 2272556026, 188821243, 1729977011, 3687994002, 274084841, 3594982253, 3613494426, 2701949495, 4162096729, 322734571, 2837966542, 1640576439, 484830689, 1202797690, 3537852828, 4067639125, 349075736, 3342319475, 4157467219, 4255800159, 1030690015, 1155237496, 2951971274, 1757691577, 607398968, 2738905026, 499347990, 3794078908, 1011452712, 227885567, 2818666809, 213114376, 3034881240, 1455525988, 3414450555, 850817237, 1817998408, 3092726480];
      var U1 = [0, 235474187, 470948374, 303765277, 941896748, 908933415, 607530554, 708780849, 1883793496, 2118214995, 1817866830, 1649639237, 1215061108, 1181045119, 1417561698, 1517767529, 3767586992, 4003061179, 4236429990, 4069246893, 3635733660, 3602770327, 3299278474, 3400528769, 2430122216, 2664543715, 2362090238, 2193862645, 2835123396, 2801107407, 3035535058, 3135740889, 3678124923, 3576870512, 3341394285, 3374361702, 3810496343, 3977675356, 4279080257, 4043610186, 2876494627, 2776292904, 3076639029, 3110650942, 2472011535, 2640243204, 2403728665, 2169303058, 1001089995, 899835584, 666464733, 699432150, 59727847, 226906860, 530400753, 294930682, 1273168787, 1172967064, 1475418501, 1509430414, 1942435775, 2110667444, 1876241833, 1641816226, 2910219766, 2743034109, 2976151520, 3211623147, 2505202138, 2606453969, 2302690252, 2269728455, 3711829422, 3543599269, 3240894392, 3475313331, 3843699074, 3943906441, 4178062228, 4144047775, 1306967366, 1139781709, 1374988112, 1610459739, 1975683434, 2076935265, 1775276924, 1742315127, 1034867998, 866637845, 566021896, 800440835, 92987698, 193195065, 429456164, 395441711, 1984812685, 2017778566, 1784663195, 1683407248, 1315562145, 1080094634, 1383856311, 1551037884, 101039829, 135050206, 437757123, 337553864, 1042385657, 807962610, 573804783, 742039012, 2531067453, 2564033334, 2328828971, 2227573024, 2935566865, 2700099354, 3001755655, 3168937228, 3868552805, 3902563182, 4203181171, 4102977912, 3736164937, 3501741890, 3265478751, 3433712980, 1106041591, 1340463100, 1576976609, 1408749034, 2043211483, 2009195472, 1708848333, 1809054150, 832877231, 1068351396, 766945465, 599762354, 159417987, 126454664, 361929877, 463180190, 2709260871, 2943682380, 3178106961, 3009879386, 2572697195, 2538681184, 2236228733, 2336434550, 3509871135, 3745345300, 3441850377, 3274667266, 3910161971, 3877198648, 4110568485, 4211818798, 2597806476, 2497604743, 2261089178, 2295101073, 2733856160, 2902087851, 3202437046, 2968011453, 3936291284, 3835036895, 4136440770, 4169408201, 3535486456, 3702665459, 3467192302, 3231722213, 2051518780, 1951317047, 1716890410, 1750902305, 1113818384, 1282050075, 1584504582, 1350078989, 168810852, 67556463, 371049330, 404016761, 841739592, 1008918595, 775550814, 540080725, 3969562369, 3801332234, 4035489047, 4269907996, 3569255213, 3669462566, 3366754619, 3332740144, 2631065433, 2463879762, 2160117071, 2395588676, 2767645557, 2868897406, 3102011747, 3069049960, 202008497, 33778362, 270040487, 504459436, 875451293, 975658646, 675039627, 641025152, 2084704233, 1917518562, 1615861247, 1851332852, 1147550661, 1248802510, 1484005843, 1451044056, 933301370, 967311729, 733156972, 632953703, 260388950, 25965917, 328671808, 496906059, 1206477858, 1239443753, 1543208500, 1441952575, 2144161806, 1908694277, 1675577880, 1842759443, 3610369226, 3644379585, 3408119516, 3307916247, 4011190502, 3776767469, 4077384432, 4245618683, 2809771154, 2842737049, 3144396420, 3043140495, 2673705150, 2438237621, 2203032232, 2370213795];
      var U2 = [0, 185469197, 370938394, 487725847, 741876788, 657861945, 975451694, 824852259, 1483753576, 1400783205, 1315723890, 1164071807, 1950903388, 2135319889, 1649704518, 1767536459, 2967507152, 3152976349, 2801566410, 2918353863, 2631447780, 2547432937, 2328143614, 2177544179, 3901806776, 3818836405, 4270639778, 4118987695, 3299409036, 3483825537, 3535072918, 3652904859, 2077965243, 1893020342, 1841768865, 1724457132, 1474502543, 1559041666, 1107234197, 1257309336, 598438867, 681933534, 901210569, 1052338372, 261314535, 77422314, 428819965, 310463728, 3409685355, 3224740454, 3710368113, 3593056380, 3875770207, 3960309330, 4045380933, 4195456072, 2471224067, 2554718734, 2237133081, 2388260884, 3212035895, 3028143674, 2842678573, 2724322336, 4138563181, 4255350624, 3769721975, 3955191162, 3667219033, 3516619604, 3431546947, 3347532110, 2933734917, 2782082824, 3099667487, 3016697106, 2196052529, 2313884476, 2499348523, 2683765030, 1179510461, 1296297904, 1347548327, 1533017514, 1786102409, 1635502980, 2087309459, 2003294622, 507358933, 355706840, 136428751, 53458370, 839224033, 957055980, 605657339, 790073846, 2373340630, 2256028891, 2607439820, 2422494913, 2706270690, 2856345839, 3075636216, 3160175349, 3573941694, 3725069491, 3273267108, 3356761769, 4181598602, 4063242375, 4011996048, 3828103837, 1033297158, 915985419, 730517276, 545572369, 296679730, 446754879, 129166120, 213705253, 1709610350, 1860738147, 1945798516, 2029293177, 1239331162, 1120974935, 1606591296, 1422699085, 4148292826, 4233094615, 3781033664, 3931371469, 3682191598, 3497509347, 3446004468, 3328955385, 2939266226, 2755636671, 3106780840, 2988687269, 2198438022, 2282195339, 2501218972, 2652609425, 1201765386, 1286567175, 1371368976, 1521706781, 1805211710, 1620529459, 2105887268, 1988838185, 533804130, 350174575, 164439672, 46346101, 870912086, 954669403, 636813900, 788204353, 2358957921, 2274680428, 2592523643, 2441661558, 2695033685, 2880240216, 3065962831, 3182487618, 3572145929, 3756299780, 3270937875, 3388507166, 4174560061, 4091327024, 4006521127, 3854606378, 1014646705, 930369212, 711349675, 560487590, 272786309, 457992840, 106852767, 223377554, 1678381017, 1862534868, 1914052035, 2031621326, 1211247597, 1128014560, 1580087799, 1428173050, 32283319, 182621114, 401639597, 486441376, 768917123, 651868046, 1003007129, 818324884, 1503449823, 1385356242, 1333838021, 1150208456, 1973745387, 2125135846, 1673061617, 1756818940, 2970356327, 3120694122, 2802849917, 2887651696, 2637442643, 2520393566, 2334669897, 2149987652, 3917234703, 3799141122, 4284502037, 4100872472, 3309594171, 3460984630, 3545789473, 3629546796, 2050466060, 1899603969, 1814803222, 1730525723, 1443857720, 1560382517, 1075025698, 1260232239, 575138148, 692707433, 878443390, 1062597235, 243256656, 91341917, 409198410, 325965383, 3403100636, 3252238545, 3704300486, 3620022987, 3874428392, 3990953189, 4042459122, 4227665663, 2460449204, 2578018489, 2226875310, 2411029155, 3198115200, 3046200461, 2827177882, 2743944855];
      var U3 = [0, 218828297, 437656594, 387781147, 875313188, 958871085, 775562294, 590424639, 1750626376, 1699970625, 1917742170, 2135253587, 1551124588, 1367295589, 1180849278, 1265195639, 3501252752, 3720081049, 3399941250, 3350065803, 3835484340, 3919042237, 4270507174, 4085369519, 3102249176, 3051593425, 2734591178, 2952102595, 2361698556, 2177869557, 2530391278, 2614737639, 3145456443, 3060847922, 2708326185, 2892417312, 2404901663, 2187128086, 2504130317, 2555048196, 3542330227, 3727205754, 3375740769, 3292445032, 3876557655, 3926170974, 4246310725, 4027744588, 1808481195, 1723872674, 1910319033, 2094410160, 1608975247, 1391201670, 1173430173, 1224348052, 59984867, 244860394, 428169201, 344873464, 935293895, 984907214, 766078933, 547512796, 1844882806, 1627235199, 2011214180, 2062270317, 1507497298, 1423022939, 1137477952, 1321699145, 95345982, 145085239, 532201772, 313773861, 830661914, 1015671571, 731183368, 648017665, 3175501286, 2957853679, 2807058932, 2858115069, 2305455554, 2220981195, 2474404304, 2658625497, 3575528878, 3625268135, 3473416636, 3254988725, 3778151818, 3963161475, 4213447064, 4130281361, 3599595085, 3683022916, 3432737375, 3247465558, 3802222185, 4020912224, 4172763771, 4122762354, 3201631749, 3017672716, 2764249623, 2848461854, 2331590177, 2280796200, 2431590963, 2648976442, 104699613, 188127444, 472615631, 287343814, 840019705, 1058709744, 671593195, 621591778, 1852171925, 1668212892, 1953757831, 2037970062, 1514790577, 1463996600, 1080017571, 1297403050, 3673637356, 3623636965, 3235995134, 3454686199, 4007360968, 3822090177, 4107101658, 4190530515, 2997825956, 3215212461, 2830708150, 2779915199, 2256734592, 2340947849, 2627016082, 2443058075, 172466556, 122466165, 273792366, 492483431, 1047239e3, 861968209, 612205898, 695634755, 1646252340, 1863638845, 2013908262, 1963115311, 1446242576, 1530455833, 1277555970, 1093597963, 1636604631, 1820824798, 2073724613, 1989249228, 1436590835, 1487645946, 1337376481, 1119727848, 164948639, 81781910, 331544205, 516552836, 1039717051, 821288114, 669961897, 719700128, 2973530695, 3157750862, 2871682645, 2787207260, 2232435299, 2283490410, 2667994737, 2450346104, 3647212047, 3564045318, 3279033885, 3464042516, 3980931627, 3762502690, 4150144569, 4199882800, 3070356634, 3121275539, 2904027272, 2686254721, 2200818878, 2384911031, 2570832044, 2486224549, 3747192018, 3528626907, 3310321856, 3359936201, 3950355702, 3867060991, 4049844452, 4234721005, 1739656202, 1790575107, 2108100632, 1890328081, 1402811438, 1586903591, 1233856572, 1149249077, 266959938, 48394827, 369057872, 418672217, 1002783846, 919489135, 567498868, 752375421, 209336225, 24197544, 376187827, 459744698, 945164165, 895287692, 574624663, 793451934, 1679968233, 1764313568, 2117360635, 1933530610, 1343127501, 1560637892, 1243112415, 1192455638, 3704280881, 3519142200, 3336358691, 3419915562, 3907448597, 3857572124, 4075877127, 4294704398, 3029510009, 3113855344, 2927934315, 2744104290, 2159976285, 2377486676, 2594734927, 2544078150];
      var U4 = [0, 151849742, 303699484, 454499602, 607398968, 758720310, 908999204, 1059270954, 1214797936, 1097159550, 1517440620, 1400849762, 1817998408, 1699839814, 2118541908, 2001430874, 2429595872, 2581445614, 2194319100, 2345119218, 3034881240, 3186202582, 2801699524, 2951971274, 3635996816, 3518358430, 3399679628, 3283088770, 4237083816, 4118925222, 4002861748, 3885750714, 1002142683, 850817237, 698445255, 548169417, 529487843, 377642221, 227885567, 77089521, 1943217067, 2061379749, 1640576439, 1757691577, 1474760595, 1592394909, 1174215055, 1290801793, 2875968315, 2724642869, 3111247143, 2960971305, 2405426947, 2253581325, 2638606623, 2487810577, 3808662347, 3926825029, 4044981591, 4162096729, 3342319475, 3459953789, 3576539503, 3693126241, 1986918061, 2137062819, 1685577905, 1836772287, 1381620373, 1532285339, 1078185097, 1229899655, 1040559837, 923313619, 740276417, 621982671, 439452389, 322734571, 137073913, 19308535, 3871163981, 4021308739, 4104605777, 4255800159, 3263785589, 3414450555, 3499326569, 3651041127, 2933202493, 2815956275, 3167684641, 3049390895, 2330014213, 2213296395, 2566595609, 2448830231, 1305906550, 1155237496, 1607244650, 1455525988, 1776460110, 1626319424, 2079897426, 1928707164, 96392454, 213114376, 396673818, 514443284, 562755902, 679998e3, 865136418, 983426092, 3708173718, 3557504664, 3474729866, 3323011204, 4180808110, 4030667424, 3945269170, 3794078908, 2507040230, 2623762152, 2272556026, 2390325492, 2975484382, 3092726480, 2738905026, 2857194700, 3973773121, 3856137295, 4274053469, 4157467219, 3371096953, 3252932727, 3673476453, 3556361835, 2763173681, 2915017791, 3064510765, 3215307299, 2156299017, 2307622919, 2459735317, 2610011675, 2081048481, 1963412655, 1846563261, 1729977011, 1480485785, 1362321559, 1243905413, 1126790795, 878845905, 1030690015, 645401037, 796197571, 274084841, 425408743, 38544885, 188821243, 3613494426, 3731654548, 3313212038, 3430322568, 4082475170, 4200115116, 3780097726, 3896688048, 2668221674, 2516901860, 2366882550, 2216610296, 3141400786, 2989552604, 2837966542, 2687165888, 1202797690, 1320957812, 1437280870, 1554391400, 1669664834, 1787304780, 1906247262, 2022837584, 265905162, 114585348, 499347990, 349075736, 736970802, 585122620, 972512814, 821712160, 2595684844, 2478443234, 2293045232, 2174754046, 3196267988, 3079546586, 2895723464, 2777952454, 3537852828, 3687994002, 3234156416, 3385345166, 4142626212, 4293295786, 3841024952, 3992742070, 174567692, 57326082, 410887952, 292596766, 777231668, 660510266, 1011452712, 893681702, 1108339068, 1258480242, 1343618912, 1494807662, 1715193156, 1865862730, 1948373848, 2100090966, 2701949495, 2818666809, 3004591147, 3122358053, 2235061775, 2352307457, 2535604243, 2653899549, 3915653703, 3764988233, 4219352155, 4067639125, 3444575871, 3294430577, 3746175075, 3594982253, 836553431, 953270745, 600235211, 718002117, 367585007, 484830689, 133361907, 251657213, 2041877159, 1891211689, 1806599355, 1654886325, 1568718495, 1418573201, 1335535747, 1184342925];
      function convertToInt32(bytes) {
        var result = [];
        for (var i3 = 0; i3 < bytes.length; i3 += 4) {
          result.push(bytes[i3] << 24 | bytes[i3 + 1] << 16 | bytes[i3 + 2] << 8 | bytes[i3 + 3]);
        }
        return result;
      }
      var AES = function(key2) {
        if (!(this instanceof AES)) {
          throw Error("AES must be instanitated with `new`");
        }
        Object.defineProperty(this, "key", {
          value: coerceArray(key2, true)
        });
        this._prepare();
      };
      AES.prototype._prepare = function() {
        var rounds = numberOfRounds[this.key.length];
        if (rounds == null) {
          throw new Error("invalid key size (must be 16, 24 or 32 bytes)");
        }
        this._Ke = [];
        this._Kd = [];
        for (var i3 = 0; i3 <= rounds; i3++) {
          this._Ke.push([0, 0, 0, 0]);
          this._Kd.push([0, 0, 0, 0]);
        }
        var roundKeyCount = (rounds + 1) * 4;
        var KC = this.key.length / 4;
        var tk = convertToInt32(this.key);
        var index;
        for (var i3 = 0; i3 < KC; i3++) {
          index = i3 >> 2;
          this._Ke[index][i3 % 4] = tk[i3];
          this._Kd[rounds - index][i3 % 4] = tk[i3];
        }
        var rconpointer = 0;
        var t3 = KC, tt;
        while (t3 < roundKeyCount) {
          tt = tk[KC - 1];
          tk[0] ^= S2[tt >> 16 & 255] << 24 ^ S2[tt >> 8 & 255] << 16 ^ S2[tt & 255] << 8 ^ S2[tt >> 24 & 255] ^ rcon[rconpointer] << 24;
          rconpointer += 1;
          if (KC != 8) {
            for (var i3 = 1; i3 < KC; i3++) {
              tk[i3] ^= tk[i3 - 1];
            }
          } else {
            for (var i3 = 1; i3 < KC / 2; i3++) {
              tk[i3] ^= tk[i3 - 1];
            }
            tt = tk[KC / 2 - 1];
            tk[KC / 2] ^= S2[tt & 255] ^ S2[tt >> 8 & 255] << 8 ^ S2[tt >> 16 & 255] << 16 ^ S2[tt >> 24 & 255] << 24;
            for (var i3 = KC / 2 + 1; i3 < KC; i3++) {
              tk[i3] ^= tk[i3 - 1];
            }
          }
          var i3 = 0, r3, c3;
          while (i3 < KC && t3 < roundKeyCount) {
            r3 = t3 >> 2;
            c3 = t3 % 4;
            this._Ke[r3][c3] = tk[i3];
            this._Kd[rounds - r3][c3] = tk[i3++];
            t3++;
          }
        }
        for (var r3 = 1; r3 < rounds; r3++) {
          for (var c3 = 0; c3 < 4; c3++) {
            tt = this._Kd[r3][c3];
            this._Kd[r3][c3] = U1[tt >> 24 & 255] ^ U2[tt >> 16 & 255] ^ U3[tt >> 8 & 255] ^ U4[tt & 255];
          }
        }
      };
      AES.prototype.encrypt = function(plaintext) {
        if (plaintext.length != 16) {
          throw new Error("invalid plaintext size (must be 16 bytes)");
        }
        var rounds = this._Ke.length - 1;
        var a3 = [0, 0, 0, 0];
        var t3 = convertToInt32(plaintext);
        for (var i3 = 0; i3 < 4; i3++) {
          t3[i3] ^= this._Ke[0][i3];
        }
        for (var r3 = 1; r3 < rounds; r3++) {
          for (var i3 = 0; i3 < 4; i3++) {
            a3[i3] = T1[t3[i3] >> 24 & 255] ^ T22[t3[(i3 + 1) % 4] >> 16 & 255] ^ T3[t3[(i3 + 2) % 4] >> 8 & 255] ^ T4[t3[(i3 + 3) % 4] & 255] ^ this._Ke[r3][i3];
          }
          t3 = a3.slice();
        }
        var result = createArray(16), tt;
        for (var i3 = 0; i3 < 4; i3++) {
          tt = this._Ke[rounds][i3];
          result[4 * i3] = (S2[t3[i3] >> 24 & 255] ^ tt >> 24) & 255;
          result[4 * i3 + 1] = (S2[t3[(i3 + 1) % 4] >> 16 & 255] ^ tt >> 16) & 255;
          result[4 * i3 + 2] = (S2[t3[(i3 + 2) % 4] >> 8 & 255] ^ tt >> 8) & 255;
          result[4 * i3 + 3] = (S2[t3[(i3 + 3) % 4] & 255] ^ tt) & 255;
        }
        return result;
      };
      AES.prototype.decrypt = function(ciphertext) {
        if (ciphertext.length != 16) {
          throw new Error("invalid ciphertext size (must be 16 bytes)");
        }
        var rounds = this._Kd.length - 1;
        var a3 = [0, 0, 0, 0];
        var t3 = convertToInt32(ciphertext);
        for (var i3 = 0; i3 < 4; i3++) {
          t3[i3] ^= this._Kd[0][i3];
        }
        for (var r3 = 1; r3 < rounds; r3++) {
          for (var i3 = 0; i3 < 4; i3++) {
            a3[i3] = T5[t3[i3] >> 24 & 255] ^ T6[t3[(i3 + 3) % 4] >> 16 & 255] ^ T7[t3[(i3 + 2) % 4] >> 8 & 255] ^ T8[t3[(i3 + 1) % 4] & 255] ^ this._Kd[r3][i3];
          }
          t3 = a3.slice();
        }
        var result = createArray(16), tt;
        for (var i3 = 0; i3 < 4; i3++) {
          tt = this._Kd[rounds][i3];
          result[4 * i3] = (Si[t3[i3] >> 24 & 255] ^ tt >> 24) & 255;
          result[4 * i3 + 1] = (Si[t3[(i3 + 3) % 4] >> 16 & 255] ^ tt >> 16) & 255;
          result[4 * i3 + 2] = (Si[t3[(i3 + 2) % 4] >> 8 & 255] ^ tt >> 8) & 255;
          result[4 * i3 + 3] = (Si[t3[(i3 + 1) % 4] & 255] ^ tt) & 255;
        }
        return result;
      };
      var ModeOfOperationECB = function(key2) {
        if (!(this instanceof ModeOfOperationECB)) {
          throw Error("AES must be instanitated with `new`");
        }
        this.description = "Electronic Code Block";
        this.name = "ecb";
        this._aes = new AES(key2);
      };
      ModeOfOperationECB.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);
        if (plaintext.length % 16 !== 0) {
          throw new Error("invalid plaintext size (must be multiple of 16 bytes)");
        }
        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);
        for (var i3 = 0; i3 < plaintext.length; i3 += 16) {
          copyArray(plaintext, block, 0, i3, i3 + 16);
          block = this._aes.encrypt(block);
          copyArray(block, ciphertext, i3);
        }
        return ciphertext;
      };
      ModeOfOperationECB.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);
        if (ciphertext.length % 16 !== 0) {
          throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");
        }
        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);
        for (var i3 = 0; i3 < ciphertext.length; i3 += 16) {
          copyArray(ciphertext, block, 0, i3, i3 + 16);
          block = this._aes.decrypt(block);
          copyArray(block, plaintext, i3);
        }
        return plaintext;
      };
      var ModeOfOperationCBC = function(key2, iv) {
        if (!(this instanceof ModeOfOperationCBC)) {
          throw Error("AES must be instanitated with `new`");
        }
        this.description = "Cipher Block Chaining";
        this.name = "cbc";
        if (!iv) {
          iv = createArray(16);
        } else if (iv.length != 16) {
          throw new Error("invalid initialation vector size (must be 16 bytes)");
        }
        this._lastCipherblock = coerceArray(iv, true);
        this._aes = new AES(key2);
      };
      ModeOfOperationCBC.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);
        if (plaintext.length % 16 !== 0) {
          throw new Error("invalid plaintext size (must be multiple of 16 bytes)");
        }
        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);
        for (var i3 = 0; i3 < plaintext.length; i3 += 16) {
          copyArray(plaintext, block, 0, i3, i3 + 16);
          for (var j3 = 0; j3 < 16; j3++) {
            block[j3] ^= this._lastCipherblock[j3];
          }
          this._lastCipherblock = this._aes.encrypt(block);
          copyArray(this._lastCipherblock, ciphertext, i3);
        }
        return ciphertext;
      };
      ModeOfOperationCBC.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);
        if (ciphertext.length % 16 !== 0) {
          throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");
        }
        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);
        for (var i3 = 0; i3 < ciphertext.length; i3 += 16) {
          copyArray(ciphertext, block, 0, i3, i3 + 16);
          block = this._aes.decrypt(block);
          for (var j3 = 0; j3 < 16; j3++) {
            plaintext[i3 + j3] = block[j3] ^ this._lastCipherblock[j3];
          }
          copyArray(ciphertext, this._lastCipherblock, 0, i3, i3 + 16);
        }
        return plaintext;
      };
      var ModeOfOperationCFB = function(key2, iv, segmentSize) {
        if (!(this instanceof ModeOfOperationCFB)) {
          throw Error("AES must be instanitated with `new`");
        }
        this.description = "Cipher Feedback";
        this.name = "cfb";
        if (!iv) {
          iv = createArray(16);
        } else if (iv.length != 16) {
          throw new Error("invalid initialation vector size (must be 16 size)");
        }
        if (!segmentSize) {
          segmentSize = 1;
        }
        this.segmentSize = segmentSize;
        this._shiftRegister = coerceArray(iv, true);
        this._aes = new AES(key2);
      };
      ModeOfOperationCFB.prototype.encrypt = function(plaintext) {
        if (plaintext.length % this.segmentSize != 0) {
          throw new Error("invalid plaintext size (must be segmentSize bytes)");
        }
        var encrypted = coerceArray(plaintext, true);
        var xorSegment;
        for (var i3 = 0; i3 < encrypted.length; i3 += this.segmentSize) {
          xorSegment = this._aes.encrypt(this._shiftRegister);
          for (var j3 = 0; j3 < this.segmentSize; j3++) {
            encrypted[i3 + j3] ^= xorSegment[j3];
          }
          copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
          copyArray(encrypted, this._shiftRegister, 16 - this.segmentSize, i3, i3 + this.segmentSize);
        }
        return encrypted;
      };
      ModeOfOperationCFB.prototype.decrypt = function(ciphertext) {
        if (ciphertext.length % this.segmentSize != 0) {
          throw new Error("invalid ciphertext size (must be segmentSize bytes)");
        }
        var plaintext = coerceArray(ciphertext, true);
        var xorSegment;
        for (var i3 = 0; i3 < plaintext.length; i3 += this.segmentSize) {
          xorSegment = this._aes.encrypt(this._shiftRegister);
          for (var j3 = 0; j3 < this.segmentSize; j3++) {
            plaintext[i3 + j3] ^= xorSegment[j3];
          }
          copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
          copyArray(ciphertext, this._shiftRegister, 16 - this.segmentSize, i3, i3 + this.segmentSize);
        }
        return plaintext;
      };
      var ModeOfOperationOFB = function(key2, iv) {
        if (!(this instanceof ModeOfOperationOFB)) {
          throw Error("AES must be instanitated with `new`");
        }
        this.description = "Output Feedback";
        this.name = "ofb";
        if (!iv) {
          iv = createArray(16);
        } else if (iv.length != 16) {
          throw new Error("invalid initialation vector size (must be 16 bytes)");
        }
        this._lastPrecipher = coerceArray(iv, true);
        this._lastPrecipherIndex = 16;
        this._aes = new AES(key2);
      };
      ModeOfOperationOFB.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);
        for (var i3 = 0; i3 < encrypted.length; i3++) {
          if (this._lastPrecipherIndex === 16) {
            this._lastPrecipher = this._aes.encrypt(this._lastPrecipher);
            this._lastPrecipherIndex = 0;
          }
          encrypted[i3] ^= this._lastPrecipher[this._lastPrecipherIndex++];
        }
        return encrypted;
      };
      ModeOfOperationOFB.prototype.decrypt = ModeOfOperationOFB.prototype.encrypt;
      var Counter = function(initialValue) {
        if (!(this instanceof Counter)) {
          throw Error("Counter must be instanitated with `new`");
        }
        if (initialValue !== 0 && !initialValue) {
          initialValue = 1;
        }
        if (typeof initialValue === "number") {
          this._counter = createArray(16);
          this.setValue(initialValue);
        } else {
          this.setBytes(initialValue);
        }
      };
      Counter.prototype.setValue = function(value) {
        if (typeof value !== "number" || parseInt(value) != value) {
          throw new Error("invalid counter value (must be an integer)");
        }
        for (var index = 15; index >= 0; --index) {
          this._counter[index] = value % 256;
          value = value >> 8;
        }
      };
      Counter.prototype.setBytes = function(bytes) {
        bytes = coerceArray(bytes, true);
        if (bytes.length != 16) {
          throw new Error("invalid counter bytes size (must be 16 bytes)");
        }
        this._counter = bytes;
      };
      Counter.prototype.increment = function() {
        for (var i3 = 15; i3 >= 0; i3--) {
          if (this._counter[i3] === 255) {
            this._counter[i3] = 0;
          } else {
            this._counter[i3]++;
            break;
          }
        }
      };
      var ModeOfOperationCTR = function(key2, counter) {
        if (!(this instanceof ModeOfOperationCTR)) {
          throw Error("AES must be instanitated with `new`");
        }
        this.description = "Counter";
        this.name = "ctr";
        if (!(counter instanceof Counter)) {
          counter = new Counter(counter);
        }
        this._counter = counter;
        this._remainingCounter = null;
        this._remainingCounterIndex = 16;
        this._aes = new AES(key2);
      };
      ModeOfOperationCTR.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);
        for (var i3 = 0; i3 < encrypted.length; i3++) {
          if (this._remainingCounterIndex === 16) {
            this._remainingCounter = this._aes.encrypt(this._counter._counter);
            this._remainingCounterIndex = 0;
            this._counter.increment();
          }
          encrypted[i3] ^= this._remainingCounter[this._remainingCounterIndex++];
        }
        return encrypted;
      };
      ModeOfOperationCTR.prototype.decrypt = ModeOfOperationCTR.prototype.encrypt;
      function pkcs7pad(data) {
        data = coerceArray(data, true);
        var padder = 16 - data.length % 16;
        var result = createArray(data.length + padder);
        copyArray(data, result);
        for (var i3 = data.length; i3 < result.length; i3++) {
          result[i3] = padder;
        }
        return result;
      }
      function pkcs7strip(data) {
        data = coerceArray(data, true);
        if (data.length < 16) {
          throw new Error("PKCS#7 invalid length");
        }
        var padder = data[data.length - 1];
        if (padder > 16) {
          throw new Error("PKCS#7 padding byte out of range");
        }
        var length = data.length - padder;
        for (var i3 = 0; i3 < padder; i3++) {
          if (data[length + i3] !== padder) {
            throw new Error("PKCS#7 invalid padding byte");
          }
        }
        var result = createArray(length);
        copyArray(data, result, 0, 0, length);
        return result;
      }
      var aesjs = {
        AES,
        Counter,
        ModeOfOperation: {
          ecb: ModeOfOperationECB,
          cbc: ModeOfOperationCBC,
          cfb: ModeOfOperationCFB,
          ofb: ModeOfOperationOFB,
          ctr: ModeOfOperationCTR
        },
        utils: {
          hex: convertHex,
          utf8: convertUtf8
        },
        padding: {
          pkcs7: {
            pad: pkcs7pad,
            strip: pkcs7strip
          }
        },
        _arrayTest: {
          coerceArray,
          createArray,
          copyArray
        }
      };
      if (typeof exports2 !== "undefined") {
        module2.exports = aesjs;
      } else if (typeof define === "function" && define.amd) {
        define(aesjs);
      } else {
        if (root.aesjs) {
          aesjs._aesjs = root.aesjs;
        }
        root.aesjs = aesjs;
      }
    })(exports2);
  }
});

// node_modules/scrypt-js/scrypt.js
var require_scrypt = __commonJS({
  "node_modules/scrypt-js/scrypt.js"(exports2, module2) {
    "use strict";
    (function(root) {
      const MAX_VALUE = 2147483647;
      function SHA256(m3) {
        const K = new Uint32Array([
          1116352408,
          1899447441,
          3049323471,
          3921009573,
          961987163,
          1508970993,
          2453635748,
          2870763221,
          3624381080,
          310598401,
          607225278,
          1426881987,
          1925078388,
          2162078206,
          2614888103,
          3248222580,
          3835390401,
          4022224774,
          264347078,
          604807628,
          770255983,
          1249150122,
          1555081692,
          1996064986,
          2554220882,
          2821834349,
          2952996808,
          3210313671,
          3336571891,
          3584528711,
          113926993,
          338241895,
          666307205,
          773529912,
          1294757372,
          1396182291,
          1695183700,
          1986661051,
          2177026350,
          2456956037,
          2730485921,
          2820302411,
          3259730800,
          3345764771,
          3516065817,
          3600352804,
          4094571909,
          275423344,
          430227734,
          506948616,
          659060556,
          883997877,
          958139571,
          1322822218,
          1537002063,
          1747873779,
          1955562222,
          2024104815,
          2227730452,
          2361852424,
          2428436474,
          2756734187,
          3204031479,
          3329325298
        ]);
        let h0 = 1779033703, h1 = 3144134277, h2 = 1013904242, h3 = 2773480762;
        let h4 = 1359893119, h5 = 2600822924, h6 = 528734635, h7 = 1541459225;
        const w3 = new Uint32Array(64);
        function blocks(p3) {
          let off = 0, len = p3.length;
          while (len >= 64) {
            let a3 = h0, b3 = h1, c3 = h2, d2 = h3, e3 = h4, f3 = h5, g3 = h6, h8 = h7, u3, i4, j3, t1, t22;
            for (i4 = 0; i4 < 16; i4++) {
              j3 = off + i4 * 4;
              w3[i4] = (p3[j3] & 255) << 24 | (p3[j3 + 1] & 255) << 16 | (p3[j3 + 2] & 255) << 8 | p3[j3 + 3] & 255;
            }
            for (i4 = 16; i4 < 64; i4++) {
              u3 = w3[i4 - 2];
              t1 = (u3 >>> 17 | u3 << 32 - 17) ^ (u3 >>> 19 | u3 << 32 - 19) ^ u3 >>> 10;
              u3 = w3[i4 - 15];
              t22 = (u3 >>> 7 | u3 << 32 - 7) ^ (u3 >>> 18 | u3 << 32 - 18) ^ u3 >>> 3;
              w3[i4] = (t1 + w3[i4 - 7] | 0) + (t22 + w3[i4 - 16] | 0) | 0;
            }
            for (i4 = 0; i4 < 64; i4++) {
              t1 = (((e3 >>> 6 | e3 << 32 - 6) ^ (e3 >>> 11 | e3 << 32 - 11) ^ (e3 >>> 25 | e3 << 32 - 25)) + (e3 & f3 ^ ~e3 & g3) | 0) + (h8 + (K[i4] + w3[i4] | 0) | 0) | 0;
              t22 = ((a3 >>> 2 | a3 << 32 - 2) ^ (a3 >>> 13 | a3 << 32 - 13) ^ (a3 >>> 22 | a3 << 32 - 22)) + (a3 & b3 ^ a3 & c3 ^ b3 & c3) | 0;
              h8 = g3;
              g3 = f3;
              f3 = e3;
              e3 = d2 + t1 | 0;
              d2 = c3;
              c3 = b3;
              b3 = a3;
              a3 = t1 + t22 | 0;
            }
            h0 = h0 + a3 | 0;
            h1 = h1 + b3 | 0;
            h2 = h2 + c3 | 0;
            h3 = h3 + d2 | 0;
            h4 = h4 + e3 | 0;
            h5 = h5 + f3 | 0;
            h6 = h6 + g3 | 0;
            h7 = h7 + h8 | 0;
            off += 64;
            len -= 64;
          }
        }
        blocks(m3);
        let i3, bytesLeft = m3.length % 64, bitLenHi = m3.length / 536870912 | 0, bitLenLo = m3.length << 3, numZeros = bytesLeft < 56 ? 56 : 120, p2 = m3.slice(m3.length - bytesLeft, m3.length);
        p2.push(128);
        for (i3 = bytesLeft + 1; i3 < numZeros; i3++) {
          p2.push(0);
        }
        p2.push(bitLenHi >>> 24 & 255);
        p2.push(bitLenHi >>> 16 & 255);
        p2.push(bitLenHi >>> 8 & 255);
        p2.push(bitLenHi >>> 0 & 255);
        p2.push(bitLenLo >>> 24 & 255);
        p2.push(bitLenLo >>> 16 & 255);
        p2.push(bitLenLo >>> 8 & 255);
        p2.push(bitLenLo >>> 0 & 255);
        blocks(p2);
        return [
          h0 >>> 24 & 255,
          h0 >>> 16 & 255,
          h0 >>> 8 & 255,
          h0 >>> 0 & 255,
          h1 >>> 24 & 255,
          h1 >>> 16 & 255,
          h1 >>> 8 & 255,
          h1 >>> 0 & 255,
          h2 >>> 24 & 255,
          h2 >>> 16 & 255,
          h2 >>> 8 & 255,
          h2 >>> 0 & 255,
          h3 >>> 24 & 255,
          h3 >>> 16 & 255,
          h3 >>> 8 & 255,
          h3 >>> 0 & 255,
          h4 >>> 24 & 255,
          h4 >>> 16 & 255,
          h4 >>> 8 & 255,
          h4 >>> 0 & 255,
          h5 >>> 24 & 255,
          h5 >>> 16 & 255,
          h5 >>> 8 & 255,
          h5 >>> 0 & 255,
          h6 >>> 24 & 255,
          h6 >>> 16 & 255,
          h6 >>> 8 & 255,
          h6 >>> 0 & 255,
          h7 >>> 24 & 255,
          h7 >>> 16 & 255,
          h7 >>> 8 & 255,
          h7 >>> 0 & 255
        ];
      }
      function PBKDF2_HMAC_SHA256_OneIter(password, salt, dkLen) {
        password = password.length <= 64 ? password : SHA256(password);
        const innerLen = 64 + salt.length + 4;
        const inner = new Array(innerLen);
        const outerKey = new Array(64);
        let i3;
        let dk = [];
        for (i3 = 0; i3 < 64; i3++) {
          inner[i3] = 54;
        }
        for (i3 = 0; i3 < password.length; i3++) {
          inner[i3] ^= password[i3];
        }
        for (i3 = 0; i3 < salt.length; i3++) {
          inner[64 + i3] = salt[i3];
        }
        for (i3 = innerLen - 4; i3 < innerLen; i3++) {
          inner[i3] = 0;
        }
        for (i3 = 0; i3 < 64; i3++)
          outerKey[i3] = 92;
        for (i3 = 0; i3 < password.length; i3++)
          outerKey[i3] ^= password[i3];
        function incrementCounter() {
          for (let i4 = innerLen - 1; i4 >= innerLen - 4; i4--) {
            inner[i4]++;
            if (inner[i4] <= 255)
              return;
            inner[i4] = 0;
          }
        }
        while (dkLen >= 32) {
          incrementCounter();
          dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))));
          dkLen -= 32;
        }
        if (dkLen > 0) {
          incrementCounter();
          dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))).slice(0, dkLen));
        }
        return dk;
      }
      function blockmix_salsa8(BY, Yi, r3, x3, _X) {
        let i3;
        arraycopy(BY, (2 * r3 - 1) * 16, _X, 0, 16);
        for (i3 = 0; i3 < 2 * r3; i3++) {
          blockxor(BY, i3 * 16, _X, 16);
          salsa20_8(_X, x3);
          arraycopy(_X, 0, BY, Yi + i3 * 16, 16);
        }
        for (i3 = 0; i3 < r3; i3++) {
          arraycopy(BY, Yi + i3 * 2 * 16, BY, i3 * 16, 16);
        }
        for (i3 = 0; i3 < r3; i3++) {
          arraycopy(BY, Yi + (i3 * 2 + 1) * 16, BY, (i3 + r3) * 16, 16);
        }
      }
      function R(a3, b3) {
        return a3 << b3 | a3 >>> 32 - b3;
      }
      function salsa20_8(B, x3) {
        arraycopy(B, 0, x3, 0, 16);
        for (let i3 = 8; i3 > 0; i3 -= 2) {
          x3[4] ^= R(x3[0] + x3[12], 7);
          x3[8] ^= R(x3[4] + x3[0], 9);
          x3[12] ^= R(x3[8] + x3[4], 13);
          x3[0] ^= R(x3[12] + x3[8], 18);
          x3[9] ^= R(x3[5] + x3[1], 7);
          x3[13] ^= R(x3[9] + x3[5], 9);
          x3[1] ^= R(x3[13] + x3[9], 13);
          x3[5] ^= R(x3[1] + x3[13], 18);
          x3[14] ^= R(x3[10] + x3[6], 7);
          x3[2] ^= R(x3[14] + x3[10], 9);
          x3[6] ^= R(x3[2] + x3[14], 13);
          x3[10] ^= R(x3[6] + x3[2], 18);
          x3[3] ^= R(x3[15] + x3[11], 7);
          x3[7] ^= R(x3[3] + x3[15], 9);
          x3[11] ^= R(x3[7] + x3[3], 13);
          x3[15] ^= R(x3[11] + x3[7], 18);
          x3[1] ^= R(x3[0] + x3[3], 7);
          x3[2] ^= R(x3[1] + x3[0], 9);
          x3[3] ^= R(x3[2] + x3[1], 13);
          x3[0] ^= R(x3[3] + x3[2], 18);
          x3[6] ^= R(x3[5] + x3[4], 7);
          x3[7] ^= R(x3[6] + x3[5], 9);
          x3[4] ^= R(x3[7] + x3[6], 13);
          x3[5] ^= R(x3[4] + x3[7], 18);
          x3[11] ^= R(x3[10] + x3[9], 7);
          x3[8] ^= R(x3[11] + x3[10], 9);
          x3[9] ^= R(x3[8] + x3[11], 13);
          x3[10] ^= R(x3[9] + x3[8], 18);
          x3[12] ^= R(x3[15] + x3[14], 7);
          x3[13] ^= R(x3[12] + x3[15], 9);
          x3[14] ^= R(x3[13] + x3[12], 13);
          x3[15] ^= R(x3[14] + x3[13], 18);
        }
        for (let i3 = 0; i3 < 16; ++i3) {
          B[i3] += x3[i3];
        }
      }
      function blockxor(S2, Si, D2, len) {
        for (let i3 = 0; i3 < len; i3++) {
          D2[i3] ^= S2[Si + i3];
        }
      }
      function arraycopy(src, srcPos, dest, destPos, length) {
        while (length--) {
          dest[destPos++] = src[srcPos++];
        }
      }
      function checkBufferish(o3) {
        if (!o3 || typeof o3.length !== "number") {
          return false;
        }
        for (let i3 = 0; i3 < o3.length; i3++) {
          const v3 = o3[i3];
          if (typeof v3 !== "number" || v3 % 1 || v3 < 0 || v3 >= 256) {
            return false;
          }
        }
        return true;
      }
      function ensureInteger(value, name2) {
        if (typeof value !== "number" || value % 1) {
          throw new Error("invalid " + name2);
        }
        return value;
      }
      function _scrypt(password, salt, N3, r3, p2, dkLen, callback) {
        N3 = ensureInteger(N3, "N");
        r3 = ensureInteger(r3, "r");
        p2 = ensureInteger(p2, "p");
        dkLen = ensureInteger(dkLen, "dkLen");
        if (N3 === 0 || (N3 & N3 - 1) !== 0) {
          throw new Error("N must be power of 2");
        }
        if (N3 > MAX_VALUE / 128 / r3) {
          throw new Error("N too large");
        }
        if (r3 > MAX_VALUE / 128 / p2) {
          throw new Error("r too large");
        }
        if (!checkBufferish(password)) {
          throw new Error("password must be an array or buffer");
        }
        password = Array.prototype.slice.call(password);
        if (!checkBufferish(salt)) {
          throw new Error("salt must be an array or buffer");
        }
        salt = Array.prototype.slice.call(salt);
        let b3 = PBKDF2_HMAC_SHA256_OneIter(password, salt, p2 * 128 * r3);
        const B = new Uint32Array(p2 * 32 * r3);
        for (let i3 = 0; i3 < B.length; i3++) {
          const j3 = i3 * 4;
          B[i3] = (b3[j3 + 3] & 255) << 24 | (b3[j3 + 2] & 255) << 16 | (b3[j3 + 1] & 255) << 8 | (b3[j3 + 0] & 255) << 0;
        }
        const XY = new Uint32Array(64 * r3);
        const V = new Uint32Array(32 * r3 * N3);
        const Yi = 32 * r3;
        const x3 = new Uint32Array(16);
        const _X = new Uint32Array(16);
        const totalOps = p2 * N3 * 2;
        let currentOp = 0;
        let lastPercent10 = null;
        let stop = false;
        let state = 0;
        let i0 = 0, i1;
        let Bi;
        const limit = callback ? parseInt(1e3 / r3) : 4294967295;
        const nextTick = typeof setImmediate !== "undefined" ? setImmediate : setTimeout;
        const incrementalSMix = function() {
          if (stop) {
            return callback(new Error("cancelled"), currentOp / totalOps);
          }
          let steps;
          switch (state) {
            case 0:
              Bi = i0 * 32 * r3;
              arraycopy(B, Bi, XY, 0, Yi);
              state = 1;
              i1 = 0;
            case 1:
              steps = N3 - i1;
              if (steps > limit) {
                steps = limit;
              }
              for (let i3 = 0; i3 < steps; i3++) {
                arraycopy(XY, 0, V, (i1 + i3) * Yi, Yi);
                blockmix_salsa8(XY, Yi, r3, x3, _X);
              }
              i1 += steps;
              currentOp += steps;
              if (callback) {
                const percent10 = parseInt(1e3 * currentOp / totalOps);
                if (percent10 !== lastPercent10) {
                  stop = callback(null, currentOp / totalOps);
                  if (stop) {
                    break;
                  }
                  lastPercent10 = percent10;
                }
              }
              if (i1 < N3) {
                break;
              }
              i1 = 0;
              state = 2;
            case 2:
              steps = N3 - i1;
              if (steps > limit) {
                steps = limit;
              }
              for (let i3 = 0; i3 < steps; i3++) {
                const offset = (2 * r3 - 1) * 16;
                const j3 = XY[offset] & N3 - 1;
                blockxor(V, j3 * Yi, XY, Yi);
                blockmix_salsa8(XY, Yi, r3, x3, _X);
              }
              i1 += steps;
              currentOp += steps;
              if (callback) {
                const percent10 = parseInt(1e3 * currentOp / totalOps);
                if (percent10 !== lastPercent10) {
                  stop = callback(null, currentOp / totalOps);
                  if (stop) {
                    break;
                  }
                  lastPercent10 = percent10;
                }
              }
              if (i1 < N3) {
                break;
              }
              arraycopy(XY, 0, B, Bi, Yi);
              i0++;
              if (i0 < p2) {
                state = 0;
                break;
              }
              b3 = [];
              for (let i3 = 0; i3 < B.length; i3++) {
                b3.push(B[i3] >> 0 & 255);
                b3.push(B[i3] >> 8 & 255);
                b3.push(B[i3] >> 16 & 255);
                b3.push(B[i3] >> 24 & 255);
              }
              const derivedKey = PBKDF2_HMAC_SHA256_OneIter(password, b3, dkLen);
              if (callback) {
                callback(null, 1, derivedKey);
              }
              return derivedKey;
          }
          if (callback) {
            nextTick(incrementalSMix);
          }
        };
        if (!callback) {
          while (true) {
            const derivedKey = incrementalSMix();
            if (derivedKey != void 0) {
              return derivedKey;
            }
          }
        }
        incrementalSMix();
      }
      const lib = {
        scrypt: function(password, salt, N3, r3, p2, dkLen, progressCallback) {
          return new Promise(function(resolve, reject) {
            let lastProgress = 0;
            if (progressCallback) {
              progressCallback(0);
            }
            _scrypt(password, salt, N3, r3, p2, dkLen, function(error, progress, key2) {
              if (error) {
                reject(error);
              } else if (key2) {
                if (progressCallback && lastProgress !== 1) {
                  progressCallback(1);
                }
                resolve(new Uint8Array(key2));
              } else if (progressCallback && progress !== lastProgress) {
                lastProgress = progress;
                return progressCallback(progress);
              }
            });
          });
        },
        syncScrypt: function(password, salt, N3, r3, p2, dkLen) {
          return new Uint8Array(_scrypt(password, salt, N3, r3, p2, dkLen));
        }
      };
      if (typeof exports2 !== "undefined") {
        module2.exports = lib;
      } else if (typeof define === "function" && define.amd) {
        define(lib);
      } else if (root) {
        if (root.scrypt) {
          root._scrypt = root.scrypt;
        }
        root.scrypt = lib;
      }
    })(exports2);
  }
});

// node_modules/bech32/index.js
var require_bech32 = __commonJS({
  "node_modules/bech32/index.js"(exports2, module2) {
    "use strict";
    var ALPHABET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
    var ALPHABET_MAP = {};
    for (z2 = 0; z2 < ALPHABET.length; z2++) {
      x3 = ALPHABET.charAt(z2);
      if (ALPHABET_MAP[x3] !== void 0)
        throw new TypeError(x3 + " is ambiguous");
      ALPHABET_MAP[x3] = z2;
    }
    var x3;
    var z2;
    function polymodStep(pre) {
      var b3 = pre >> 25;
      return (pre & 33554431) << 5 ^ -(b3 >> 0 & 1) & 996825010 ^ -(b3 >> 1 & 1) & 642813549 ^ -(b3 >> 2 & 1) & 513874426 ^ -(b3 >> 3 & 1) & 1027748829 ^ -(b3 >> 4 & 1) & 705979059;
    }
    function prefixChk(prefix) {
      var chk = 1;
      for (var i3 = 0; i3 < prefix.length; ++i3) {
        var c3 = prefix.charCodeAt(i3);
        if (c3 < 33 || c3 > 126)
          return "Invalid prefix (" + prefix + ")";
        chk = polymodStep(chk) ^ c3 >> 5;
      }
      chk = polymodStep(chk);
      for (i3 = 0; i3 < prefix.length; ++i3) {
        var v3 = prefix.charCodeAt(i3);
        chk = polymodStep(chk) ^ v3 & 31;
      }
      return chk;
    }
    function encode4(prefix, words2, LIMIT) {
      LIMIT = LIMIT || 90;
      if (prefix.length + 7 + words2.length > LIMIT)
        throw new TypeError("Exceeds length limit");
      prefix = prefix.toLowerCase();
      var chk = prefixChk(prefix);
      if (typeof chk === "string")
        throw new Error(chk);
      var result = prefix + "1";
      for (var i3 = 0; i3 < words2.length; ++i3) {
        var x4 = words2[i3];
        if (x4 >> 5 !== 0)
          throw new Error("Non 5-bit word");
        chk = polymodStep(chk) ^ x4;
        result += ALPHABET.charAt(x4);
      }
      for (i3 = 0; i3 < 6; ++i3) {
        chk = polymodStep(chk);
      }
      chk ^= 1;
      for (i3 = 0; i3 < 6; ++i3) {
        var v3 = chk >> (5 - i3) * 5 & 31;
        result += ALPHABET.charAt(v3);
      }
      return result;
    }
    function __decode(str, LIMIT) {
      LIMIT = LIMIT || 90;
      if (str.length < 8)
        return str + " too short";
      if (str.length > LIMIT)
        return "Exceeds length limit";
      var lowered = str.toLowerCase();
      var uppered = str.toUpperCase();
      if (str !== lowered && str !== uppered)
        return "Mixed-case string " + str;
      str = lowered;
      var split = str.lastIndexOf("1");
      if (split === -1)
        return "No separator character for " + str;
      if (split === 0)
        return "Missing prefix for " + str;
      var prefix = str.slice(0, split);
      var wordChars = str.slice(split + 1);
      if (wordChars.length < 6)
        return "Data too short";
      var chk = prefixChk(prefix);
      if (typeof chk === "string")
        return chk;
      var words2 = [];
      for (var i3 = 0; i3 < wordChars.length; ++i3) {
        var c3 = wordChars.charAt(i3);
        var v3 = ALPHABET_MAP[c3];
        if (v3 === void 0)
          return "Unknown character " + c3;
        chk = polymodStep(chk) ^ v3;
        if (i3 + 6 >= wordChars.length)
          continue;
        words2.push(v3);
      }
      if (chk !== 1)
        return "Invalid checksum for " + str;
      return { prefix, words: words2 };
    }
    function decodeUnsafe() {
      var res = __decode.apply(null, arguments);
      if (typeof res === "object")
        return res;
    }
    function decode3(str) {
      var res = __decode.apply(null, arguments);
      if (typeof res === "object")
        return res;
      throw new Error(res);
    }
    function convert(data, inBits, outBits, pad) {
      var value = 0;
      var bits = 0;
      var maxV = (1 << outBits) - 1;
      var result = [];
      for (var i3 = 0; i3 < data.length; ++i3) {
        value = value << inBits | data[i3];
        bits += inBits;
        while (bits >= outBits) {
          bits -= outBits;
          result.push(value >> bits & maxV);
        }
      }
      if (pad) {
        if (bits > 0) {
          result.push(value << outBits - bits & maxV);
        }
      } else {
        if (bits >= inBits)
          return "Excess padding";
        if (value << outBits - bits & maxV)
          return "Non-zero padding";
      }
      return result;
    }
    function toWordsUnsafe(bytes) {
      var res = convert(bytes, 8, 5, true);
      if (Array.isArray(res))
        return res;
    }
    function toWords(bytes) {
      var res = convert(bytes, 8, 5, true);
      if (Array.isArray(res))
        return res;
      throw new Error(res);
    }
    function fromWordsUnsafe(words2) {
      var res = convert(words2, 5, 8, false);
      if (Array.isArray(res))
        return res;
    }
    function fromWords(words2) {
      var res = convert(words2, 5, 8, false);
      if (Array.isArray(res))
        return res;
      throw new Error(res);
    }
    module2.exports = {
      decodeUnsafe,
      decode: decode3,
      encode: encode4,
      toWordsUnsafe,
      toWords,
      fromWordsUnsafe,
      fromWords
    };
  }
});

// node_modules/@darkforest_eth/types/dist/arrival.js
var require_arrival = __commonJS({
  "node_modules/@darkforest_eth/types/dist/arrival.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@darkforest_eth/types/dist/artifact.js
var require_artifact = __commonJS({
  "node_modules/@darkforest_eth/types/dist/artifact.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.artifactNameFromArtifact = exports2.ArtifactRarityNames = exports2.ArtifactRarity = exports2.ArtifactTypeNames = exports2.ArtifactType = void 0;
    exports2.ArtifactType = {
      Unknown: 0,
      Monolith: 1,
      Colossus: 2,
      Spaceship: 3,
      Pyramid: 4,
      Wormhole: 5,
      PlanetaryShield: 6,
      PhotoidCannon: 7,
      BloomFilter: 8,
      BlackDomain: 9
    };
    exports2.ArtifactTypeNames = {
      [exports2.ArtifactType.Unknown]: "Unknown",
      [exports2.ArtifactType.Monolith]: "Monolith",
      [exports2.ArtifactType.Colossus]: "Colossus",
      [exports2.ArtifactType.Spaceship]: "Spaceship",
      [exports2.ArtifactType.Pyramid]: "Pyramid",
      [exports2.ArtifactType.Wormhole]: "Wormhole",
      [exports2.ArtifactType.PlanetaryShield]: "Planetary Shield",
      [exports2.ArtifactType.PhotoidCannon]: "Photoid Cannon",
      [exports2.ArtifactType.BloomFilter]: "Bloom Filter",
      [exports2.ArtifactType.BlackDomain]: "Black Domain"
    };
    exports2.ArtifactRarity = {
      Unknown: 0,
      Common: 1,
      Rare: 2,
      Epic: 3,
      Legendary: 4,
      Mythic: 5
    };
    exports2.ArtifactRarityNames = {
      [exports2.ArtifactRarity.Unknown]: "Unknown",
      [exports2.ArtifactRarity.Common]: "Common",
      [exports2.ArtifactRarity.Rare]: "Rare",
      [exports2.ArtifactRarity.Epic]: "Epic",
      [exports2.ArtifactRarity.Legendary]: "Legendary",
      [exports2.ArtifactRarity.Mythic]: "Mythic"
    };
    var godGrammar = {
      god1: [
        "c'",
        "za",
        "ry'",
        "ab'",
        "bak'",
        "dt'",
        "ek'",
        "fah'",
        "q'",
        "qo",
        "van",
        "bow",
        "gui",
        "si"
      ],
      god2: [
        "thun",
        "tchalla",
        "thovo",
        "saron",
        "zoth",
        "sharrj",
        "thulu",
        "ra",
        "wer",
        "doin",
        "renstad",
        "nevere",
        "goth",
        "anton",
        "layton"
      ]
    };
    function artifactNameFromArtifact(artifact) {
      const idNum = parseInt(artifact.id, 16);
      const roll1 = idNum % 7919 % godGrammar.god1.length;
      const roll2 = idNum % 7883 % godGrammar.god2.length;
      const name2 = godGrammar.god1[roll1] + godGrammar.god2[roll2];
      const nameCapitalized = name2.charAt(0).toUpperCase() + name2.slice(1);
      return nameCapitalized;
    }
    exports2.artifactNameFromArtifact = artifactNameFromArtifact;
  }
});

// node_modules/@darkforest_eth/types/dist/claim.js
var require_claim = __commonJS({
  "node_modules/@darkforest_eth/types/dist/claim.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@darkforest_eth/types/dist/database_types.js
var require_database_types = __commonJS({
  "node_modules/@darkforest_eth/types/dist/database_types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@darkforest_eth/types/dist/diagnostics.js
var require_diagnostics = __commonJS({
  "node_modules/@darkforest_eth/types/dist/diagnostics.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@darkforest_eth/types/dist/event.js
var require_event = __commonJS({
  "node_modules/@darkforest_eth/types/dist/event.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@darkforest_eth/types/dist/game_types.js
var require_game_types = __commonJS({
  "node_modules/@darkforest_eth/types/dist/game_types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BiomeNames = exports2.Biome = exports2.SpaceTypeNames = exports2.SpaceType = void 0;
    exports2.SpaceType = {
      NEBULA: 0,
      SPACE: 1,
      DEEP_SPACE: 2,
      DEAD_SPACE: 3
    };
    exports2.SpaceTypeNames = {
      [exports2.SpaceType.NEBULA]: "Nebula",
      [exports2.SpaceType.SPACE]: "Space",
      [exports2.SpaceType.DEEP_SPACE]: "Deep Space",
      [exports2.SpaceType.DEAD_SPACE]: "Dead Space"
    };
    exports2.Biome = {
      UNKNOWN: 0,
      OCEAN: 1,
      FOREST: 2,
      GRASSLAND: 3,
      TUNDRA: 4,
      SWAMP: 5,
      DESERT: 6,
      ICE: 7,
      WASTELAND: 8,
      LAVA: 9,
      CORRUPTED: 10
    };
    exports2.BiomeNames = {
      [exports2.Biome.UNKNOWN]: "Unknown",
      [exports2.Biome.OCEAN]: "Ocean",
      [exports2.Biome.FOREST]: "Forest",
      [exports2.Biome.GRASSLAND]: "Grassland",
      [exports2.Biome.TUNDRA]: "Tundra",
      [exports2.Biome.SWAMP]: "Swamp",
      [exports2.Biome.DESERT]: "Desert",
      [exports2.Biome.ICE]: "Ice",
      [exports2.Biome.WASTELAND]: "Wasteland",
      [exports2.Biome.LAVA]: "Lava",
      [exports2.Biome.CORRUPTED]: "Corrupted"
    };
  }
});

// node_modules/@darkforest_eth/types/dist/gas_prices.js
var require_gas_prices = __commonJS({
  "node_modules/@darkforest_eth/types/dist/gas_prices.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@darkforest_eth/types/dist/gpt_types.js
var require_gpt_types = __commonJS({
  "node_modules/@darkforest_eth/types/dist/gpt_types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@darkforest_eth/types/dist/identifier.js
var require_identifier = __commonJS({
  "node_modules/@darkforest_eth/types/dist/identifier.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@darkforest_eth/types/dist/planet.js
var require_planet = __commonJS({
  "node_modules/@darkforest_eth/types/dist/planet.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DFStatefulAnimation = exports2.DFAnimation = exports2.PlanetTypeNames = exports2.PlanetType = exports2.PlanetLevelNames = exports2.PlanetLevel = void 0;
    exports2.PlanetLevel = {
      ZERO: 0,
      ONE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5,
      SIX: 6,
      SEVEN: 7,
      EIGHT: 8,
      NINE: 9
    };
    exports2.PlanetLevelNames = {
      [exports2.PlanetLevel.ZERO]: "Level 0",
      [exports2.PlanetLevel.ONE]: "Level 1",
      [exports2.PlanetLevel.TWO]: "Level 2",
      [exports2.PlanetLevel.THREE]: "Level 3",
      [exports2.PlanetLevel.FOUR]: "Level 4",
      [exports2.PlanetLevel.FIVE]: "Level 5",
      [exports2.PlanetLevel.SIX]: "Level 6",
      [exports2.PlanetLevel.SEVEN]: "Level 7",
      [exports2.PlanetLevel.EIGHT]: "Level 8",
      [exports2.PlanetLevel.NINE]: "Level 9"
    };
    exports2.PlanetType = {
      PLANET: 0,
      SILVER_MINE: 1,
      RUINS: 2,
      TRADING_POST: 3,
      SILVER_BANK: 4
    };
    exports2.PlanetTypeNames = {
      [exports2.PlanetType.PLANET]: "Planet",
      [exports2.PlanetType.SILVER_MINE]: "Asteroid Field",
      [exports2.PlanetType.RUINS]: "Foundry",
      [exports2.PlanetType.TRADING_POST]: "Spacetime Rip",
      [exports2.PlanetType.SILVER_BANK]: "Quasar"
    };
    var DFAnimation = class {
      constructor(update2) {
        this._update = update2;
        this._value = 0;
      }
      update() {
        this._value = this._update();
      }
      value() {
        return this._value;
      }
    };
    exports2.DFAnimation = DFAnimation;
    var DFStatefulAnimation = class extends DFAnimation {
      constructor(state, update2) {
        super(update2);
        this._state = state;
      }
      state() {
        return this._state;
      }
    };
    exports2.DFStatefulAnimation = DFStatefulAnimation;
  }
});

// node_modules/@darkforest_eth/types/dist/planetmessage.js
var require_planetmessage = __commonJS({
  "node_modules/@darkforest_eth/types/dist/planetmessage.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PlanetMessageType = void 0;
    exports2.PlanetMessageType = {
      EmojiFlag: "EmojiFlag"
    };
  }
});

// node_modules/@darkforest_eth/types/dist/player.js
var require_player = __commonJS({
  "node_modules/@darkforest_eth/types/dist/player.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@darkforest_eth/types/dist/reveal.js
var require_reveal = __commonJS({
  "node_modules/@darkforest_eth/types/dist/reveal.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@darkforest_eth/types/dist/setting.js
var require_setting = __commonJS({
  "node_modules/@darkforest_eth/types/dist/setting.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AutoGasSetting = void 0;
    exports2.AutoGasSetting = {
      Slow: "Slow",
      Average: "Average",
      Fast: "Fast"
    };
  }
});

// node_modules/@darkforest_eth/types/dist/transactions.js
var require_transactions = __commonJS({
  "node_modules/@darkforest_eth/types/dist/transactions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@darkforest_eth/types/dist/upgrade.js
var require_upgrade = __commonJS({
  "node_modules/@darkforest_eth/types/dist/upgrade.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.UpgradeBranchName = void 0;
    exports2.UpgradeBranchName = {
      Defense: 0,
      Range: 1,
      Speed: 2
    };
  }
});

// node_modules/@darkforest_eth/types/dist/utility.js
var require_utility = __commonJS({
  "node_modules/@darkforest_eth/types/dist/utility.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@darkforest_eth/types/dist/world.js
var require_world = __commonJS({
  "node_modules/@darkforest_eth/types/dist/world.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@darkforest_eth/types/dist/index.js
var require_dist = __commonJS({
  "node_modules/@darkforest_eth/types/dist/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o3, m3, k3, k22) {
      if (k22 === void 0)
        k22 = k3;
      Object.defineProperty(o3, k22, { enumerable: true, get: function() {
        return m3[k3];
      } });
    } : function(o3, m3, k3, k22) {
      if (k22 === void 0)
        k22 = k3;
      o3[k22] = m3[k3];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m3, exports3) {
      for (var p2 in m3)
        if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p2))
          __createBinding(exports3, m3, p2);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_arrival(), exports2);
    __exportStar(require_artifact(), exports2);
    __exportStar(require_claim(), exports2);
    __exportStar(require_database_types(), exports2);
    __exportStar(require_diagnostics(), exports2);
    __exportStar(require_event(), exports2);
    __exportStar(require_game_types(), exports2);
    __exportStar(require_gas_prices(), exports2);
    __exportStar(require_gpt_types(), exports2);
    __exportStar(require_identifier(), exports2);
    __exportStar(require_planet(), exports2);
    __exportStar(require_planetmessage(), exports2);
    __exportStar(require_player(), exports2);
    __exportStar(require_reveal(), exports2);
    __exportStar(require_setting(), exports2);
    __exportStar(require_transactions(), exports2);
    __exportStar(require_upgrade(), exports2);
    __exportStar(require_utility(), exports2);
    __exportStar(require_world(), exports2);
  }
});

// src/plugins/abis/DaoContract.json
var require_DaoContract = __commonJS({
  "src/plugins/abis/DaoContract.json"(exports2, module2) {
    module2.exports = [
      {
        inputs: [
          {
            internalType: "address",
            name: "_admin",
            type: "address"
          },
          {
            internalType: "contract IDarkForestCore",
            name: "_coreContract",
            type: "address"
          },
          {
            internalType: "contract IDarkForestTokens",
            name: "_tokensContract",
            type: "address"
          }
        ],
        stateMutability: "nonpayable",
        type: "constructor"
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "player",
            type: "address"
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "contribution",
            type: "uint256"
          }
        ],
        name: "Contribution",
        type: "event"
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        name: "ARTIFACT_POINT_VALUES",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "admin",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address"
          }
        ],
        name: "contributions",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "coreContract",
        outputs: [
          {
            internalType: "contract IDarkForestCore",
            name: "",
            type: "address"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: "uint256[2]",
                name: "a",
                type: "uint256[2]"
              },
              {
                internalType: "uint256[2][2]",
                name: "b",
                type: "uint256[2][2]"
              },
              {
                internalType: "uint256[2]",
                name: "c",
                type: "uint256[2]"
              },
              {
                internalType: "uint256[7]",
                name: "input",
                type: "uint256[7]"
              }
            ],
            internalType: "struct DaoContract.FindArg[]",
            name: "findArgs",
            type: "tuple[]"
          }
        ],
        name: "findArtifactAndReturnPlanets",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "uint256[2]",
            name: "_a",
            type: "uint256[2]"
          },
          {
            internalType: "uint256[2][2]",
            name: "_b",
            type: "uint256[2][2]"
          },
          {
            internalType: "uint256[2]",
            name: "_c",
            type: "uint256[2]"
          },
          {
            internalType: "uint256[8]",
            name: "_input",
            type: "uint256[8]"
          }
        ],
        name: "initializePlayer",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [],
        name: "playerCounter",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        name: "players",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "uint256[]",
            name: "_planetIds",
            type: "uint256[]"
          }
        ],
        name: "registerPlanetOwners",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        name: "registeredOwners",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "planetId",
            type: "uint256"
          }
        ],
        name: "returnPlanet",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_planetId",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "player",
            type: "address"
          }
        ],
        name: "returnUnregisteredPlanet",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_admin",
            type: "address"
          }
        ],
        name: "setAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [],
        name: "tokensContract",
        outputs: [
          {
            internalType: "contract IDarkForestTokens",
            name: "",
            type: "address"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "uint256[]",
            name: "planetIds",
            type: "uint256[]"
          }
        ],
        name: "withdrawSilverAndReturnPlanets",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        stateMutability: "payable",
        type: "receive"
      }
    ];
  }
});

// node_modules/bluebird/js/browser/bluebird.js
var require_bluebird = __commonJS({
  "node_modules/bluebird/js/browser/bluebird.js"(exports, module) {
    !function(e3) {
      if (typeof exports == "object" && typeof module != "undefined")
        module.exports = e3();
      else if (typeof define == "function" && define.amd)
        define([], e3);
      else {
        var f3;
        typeof window != "undefined" ? f3 = window : typeof global != "undefined" ? f3 = global : typeof self != "undefined" && (f3 = self), f3.Promise = e3();
      }
    }(function() {
      var define, module, exports;
      return function e3(t3, n2, r3) {
        function s2(o4, u3) {
          if (!n2[o4]) {
            if (!t3[o4]) {
              var a3 = typeof _dereq_ == "function" && _dereq_;
              if (!u3 && a3)
                return a3(o4, true);
              if (i3)
                return i3(o4, true);
              var f3 = new Error("Cannot find module '" + o4 + "'");
              throw f3.code = "MODULE_NOT_FOUND", f3;
            }
            var l3 = n2[o4] = { exports: {} };
            t3[o4][0].call(l3.exports, function(e4) {
              var n3 = t3[o4][1][e4];
              return s2(n3 ? n3 : e4);
            }, l3, l3.exports, e3, t3, n2, r3);
          }
          return n2[o4].exports;
        }
        var i3 = typeof _dereq_ == "function" && _dereq_;
        for (var o3 = 0; o3 < r3.length; o3++)
          s2(r3[o3]);
        return s2;
      }({ 1: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4) {
          var SomePromiseArray = Promise4._SomePromiseArray;
          function any(promises) {
            var ret2 = new SomePromiseArray(promises);
            var promise = ret2.promise();
            ret2.setHowMany(1);
            ret2.setUnwrap();
            ret2.init();
            return promise;
          }
          Promise4.any = function(promises) {
            return any(promises);
          };
          Promise4.prototype.any = function() {
            return any(this);
          };
        };
      }, {}], 2: [function(_dereq_2, module2, exports2) {
        "use strict";
        var firstLineError;
        try {
          throw new Error();
        } catch (e3) {
          firstLineError = e3;
        }
        var schedule = _dereq_2("./schedule");
        var Queue = _dereq_2("./queue");
        function Async() {
          this._customScheduler = false;
          this._isTickUsed = false;
          this._lateQueue = new Queue(16);
          this._normalQueue = new Queue(16);
          this._haveDrainedQueues = false;
          var self2 = this;
          this.drainQueues = function() {
            self2._drainQueues();
          };
          this._schedule = schedule;
        }
        Async.prototype.setScheduler = function(fn) {
          var prev = this._schedule;
          this._schedule = fn;
          this._customScheduler = true;
          return prev;
        };
        Async.prototype.hasCustomScheduler = function() {
          return this._customScheduler;
        };
        Async.prototype.haveItemsQueued = function() {
          return this._isTickUsed || this._haveDrainedQueues;
        };
        Async.prototype.fatalError = function(e3, isNode2) {
          if (isNode2) {
            process.stderr.write("Fatal " + (e3 instanceof Error ? e3.stack : e3) + "\n");
            process.exit(2);
          } else {
            this.throwLater(e3);
          }
        };
        Async.prototype.throwLater = function(fn, arg) {
          if (arguments.length === 1) {
            arg = fn;
            fn = function() {
              throw arg;
            };
          }
          if (typeof setTimeout !== "undefined") {
            setTimeout(function() {
              fn(arg);
            }, 0);
          } else
            try {
              this._schedule(function() {
                fn(arg);
              });
            } catch (e3) {
              throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
            }
        };
        function AsyncInvokeLater(fn, receiver2, arg) {
          this._lateQueue.push(fn, receiver2, arg);
          this._queueTick();
        }
        function AsyncInvoke(fn, receiver2, arg) {
          this._normalQueue.push(fn, receiver2, arg);
          this._queueTick();
        }
        function AsyncSettlePromises(promise) {
          this._normalQueue._pushOne(promise);
          this._queueTick();
        }
        Async.prototype.invokeLater = AsyncInvokeLater;
        Async.prototype.invoke = AsyncInvoke;
        Async.prototype.settlePromises = AsyncSettlePromises;
        function _drainQueue(queue) {
          while (queue.length() > 0) {
            _drainQueueStep(queue);
          }
        }
        function _drainQueueStep(queue) {
          var fn = queue.shift();
          if (typeof fn !== "function") {
            fn._settlePromises();
          } else {
            var receiver2 = queue.shift();
            var arg = queue.shift();
            fn.call(receiver2, arg);
          }
        }
        Async.prototype._drainQueues = function() {
          _drainQueue(this._normalQueue);
          this._reset();
          this._haveDrainedQueues = true;
          _drainQueue(this._lateQueue);
        };
        Async.prototype._queueTick = function() {
          if (!this._isTickUsed) {
            this._isTickUsed = true;
            this._schedule(this.drainQueues);
          }
        };
        Async.prototype._reset = function() {
          this._isTickUsed = false;
        };
        module2.exports = Async;
        module2.exports.firstLineError = firstLineError;
      }, { "./queue": 26, "./schedule": 29 }], 3: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4, INTERNAL, tryConvertToPromise, debug) {
          var calledBind = false;
          var rejectThis = function(_2, e3) {
            this._reject(e3);
          };
          var targetRejected = function(e3, context) {
            context.promiseRejectionQueued = true;
            context.bindingPromise._then(rejectThis, rejectThis, null, this, e3);
          };
          var bindingResolved = function(thisArg, context) {
            if ((this._bitField & 50397184) === 0) {
              this._resolveCallback(context.target);
            }
          };
          var bindingRejected = function(e3, context) {
            if (!context.promiseRejectionQueued)
              this._reject(e3);
          };
          Promise4.prototype.bind = function(thisArg) {
            if (!calledBind) {
              calledBind = true;
              Promise4.prototype._propagateFrom = debug.propagateFromFunction();
              Promise4.prototype._boundValue = debug.boundValueFunction();
            }
            var maybePromise = tryConvertToPromise(thisArg);
            var ret2 = new Promise4(INTERNAL);
            ret2._propagateFrom(this, 1);
            var target = this._target();
            ret2._setBoundTo(maybePromise);
            if (maybePromise instanceof Promise4) {
              var context = {
                promiseRejectionQueued: false,
                promise: ret2,
                target,
                bindingPromise: maybePromise
              };
              target._then(INTERNAL, targetRejected, void 0, ret2, context);
              maybePromise._then(bindingResolved, bindingRejected, void 0, ret2, context);
              ret2._setOnCancel(maybePromise);
            } else {
              ret2._resolveCallback(target);
            }
            return ret2;
          };
          Promise4.prototype._setBoundTo = function(obj2) {
            if (obj2 !== void 0) {
              this._bitField = this._bitField | 2097152;
              this._boundTo = obj2;
            } else {
              this._bitField = this._bitField & ~2097152;
            }
          };
          Promise4.prototype._isBound = function() {
            return (this._bitField & 2097152) === 2097152;
          };
          Promise4.bind = function(thisArg, value) {
            return Promise4.resolve(value).bind(thisArg);
          };
        };
      }, {}], 4: [function(_dereq_2, module2, exports2) {
        "use strict";
        var old;
        if (typeof Promise !== "undefined")
          old = Promise;
        function noConflict() {
          try {
            if (Promise === bluebird)
              Promise = old;
          } catch (e3) {
          }
          return bluebird;
        }
        var bluebird = _dereq_2("./promise")();
        bluebird.noConflict = noConflict;
        module2.exports = bluebird;
      }, { "./promise": 22 }], 5: [function(_dereq_2, module2, exports2) {
        "use strict";
        var cr = Object.create;
        if (cr) {
          var callerCache = cr(null);
          var getterCache = cr(null);
          callerCache[" size"] = getterCache[" size"] = 0;
        }
        module2.exports = function(Promise4) {
          var util = _dereq_2("./util");
          var canEvaluate2 = util.canEvaluate;
          var isIdentifier2 = util.isIdentifier;
          var getMethodCaller;
          var getGetter;
          if (false) {
            var makeMethodCaller = function(methodName) {
              return new Function("ensureMethod", "                                    \n        return function(obj) {                                               \n            'use strict'                                                     \n            var len = this.length;                                           \n            ensureMethod(obj, 'methodName');                                 \n            switch(len) {                                                    \n                case 1: return obj.methodName(this[0]);                      \n                case 2: return obj.methodName(this[0], this[1]);             \n                case 3: return obj.methodName(this[0], this[1], this[2]);    \n                case 0: return obj.methodName();                             \n                default:                                                     \n                    return obj.methodName.apply(obj, this);                  \n            }                                                                \n        };                                                                   \n        ".replace(/methodName/g, methodName))(ensureMethod);
            };
            var makeGetter = function(propertyName) {
              return new Function("obj", "                                             \n        'use strict';                                                        \n        return obj.propertyName;                                             \n        ".replace("propertyName", propertyName));
            };
            var getCompiled = function(name2, compiler, cache) {
              var ret2 = cache[name2];
              if (typeof ret2 !== "function") {
                if (!isIdentifier2(name2)) {
                  return null;
                }
                ret2 = compiler(name2);
                cache[name2] = ret2;
                cache[" size"]++;
                if (cache[" size"] > 512) {
                  var keys = Object.keys(cache);
                  for (var i3 = 0; i3 < 256; ++i3)
                    delete cache[keys[i3]];
                  cache[" size"] = keys.length - 256;
                }
              }
              return ret2;
            };
            getMethodCaller = function(name2) {
              return getCompiled(name2, makeMethodCaller, callerCache);
            };
            getGetter = function(name2) {
              return getCompiled(name2, makeGetter, getterCache);
            };
          }
          function ensureMethod(obj2, methodName) {
            var fn;
            if (obj2 != null)
              fn = obj2[methodName];
            if (typeof fn !== "function") {
              var message = "Object " + util.classString(obj2) + " has no method '" + util.toString(methodName) + "'";
              throw new Promise4.TypeError(message);
            }
            return fn;
          }
          function caller(obj2) {
            var methodName = this.pop();
            var fn = ensureMethod(obj2, methodName);
            return fn.apply(obj2, this);
          }
          Promise4.prototype.call = function(methodName) {
            var args = [].slice.call(arguments, 1);
            ;
            if (false) {
              if (canEvaluate2) {
                var maybeCaller = getMethodCaller(methodName);
                if (maybeCaller !== null) {
                  return this._then(maybeCaller, void 0, void 0, args, void 0);
                }
              }
            }
            args.push(methodName);
            return this._then(caller, void 0, void 0, args, void 0);
          };
          function namedGetter(obj2) {
            return obj2[this];
          }
          function indexedGetter(obj2) {
            var index = +this;
            if (index < 0)
              index = Math.max(0, index + obj2.length);
            return obj2[index];
          }
          Promise4.prototype.get = function(propertyName) {
            var isIndex = typeof propertyName === "number";
            var getter;
            if (!isIndex) {
              if (canEvaluate2) {
                var maybeGetter = getGetter(propertyName);
                getter = maybeGetter !== null ? maybeGetter : namedGetter;
              } else {
                getter = namedGetter;
              }
            } else {
              getter = indexedGetter;
            }
            return this._then(getter, void 0, void 0, propertyName, void 0);
          };
        };
      }, { "./util": 36 }], 6: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4, PromiseArray, apiRejection, debug) {
          var util = _dereq_2("./util");
          var tryCatch2 = util.tryCatch;
          var errorObj2 = util.errorObj;
          var async = Promise4._async;
          Promise4.prototype["break"] = Promise4.prototype.cancel = function() {
            if (!debug.cancellation())
              return this._warn("cancellation is disabled");
            var promise = this;
            var child = promise;
            while (promise._isCancellable()) {
              if (!promise._cancelBy(child)) {
                if (child._isFollowing()) {
                  child._followee().cancel();
                } else {
                  child._cancelBranched();
                }
                break;
              }
              var parent = promise._cancellationParent;
              if (parent == null || !parent._isCancellable()) {
                if (promise._isFollowing()) {
                  promise._followee().cancel();
                } else {
                  promise._cancelBranched();
                }
                break;
              } else {
                if (promise._isFollowing())
                  promise._followee().cancel();
                promise._setWillBeCancelled();
                child = promise;
                promise = parent;
              }
            }
          };
          Promise4.prototype._branchHasCancelled = function() {
            this._branchesRemainingToCancel--;
          };
          Promise4.prototype._enoughBranchesHaveCancelled = function() {
            return this._branchesRemainingToCancel === void 0 || this._branchesRemainingToCancel <= 0;
          };
          Promise4.prototype._cancelBy = function(canceller) {
            if (canceller === this) {
              this._branchesRemainingToCancel = 0;
              this._invokeOnCancel();
              return true;
            } else {
              this._branchHasCancelled();
              if (this._enoughBranchesHaveCancelled()) {
                this._invokeOnCancel();
                return true;
              }
            }
            return false;
          };
          Promise4.prototype._cancelBranched = function() {
            if (this._enoughBranchesHaveCancelled()) {
              this._cancel();
            }
          };
          Promise4.prototype._cancel = function() {
            if (!this._isCancellable())
              return;
            this._setCancelled();
            async.invoke(this._cancelPromises, this, void 0);
          };
          Promise4.prototype._cancelPromises = function() {
            if (this._length() > 0)
              this._settlePromises();
          };
          Promise4.prototype._unsetOnCancel = function() {
            this._onCancelField = void 0;
          };
          Promise4.prototype._isCancellable = function() {
            return this.isPending() && !this._isCancelled();
          };
          Promise4.prototype.isCancellable = function() {
            return this.isPending() && !this.isCancelled();
          };
          Promise4.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
            if (util.isArray(onCancelCallback)) {
              for (var i3 = 0; i3 < onCancelCallback.length; ++i3) {
                this._doInvokeOnCancel(onCancelCallback[i3], internalOnly);
              }
            } else if (onCancelCallback !== void 0) {
              if (typeof onCancelCallback === "function") {
                if (!internalOnly) {
                  var e3 = tryCatch2(onCancelCallback).call(this._boundValue());
                  if (e3 === errorObj2) {
                    this._attachExtraTrace(e3.e);
                    async.throwLater(e3.e);
                  }
                }
              } else {
                onCancelCallback._resultCancelled(this);
              }
            }
          };
          Promise4.prototype._invokeOnCancel = function() {
            var onCancelCallback = this._onCancel();
            this._unsetOnCancel();
            async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
          };
          Promise4.prototype._invokeInternalOnCancel = function() {
            if (this._isCancellable()) {
              this._doInvokeOnCancel(this._onCancel(), true);
              this._unsetOnCancel();
            }
          };
          Promise4.prototype._resultCancelled = function() {
            this.cancel();
          };
        };
      }, { "./util": 36 }], 7: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(NEXT_FILTER) {
          var util = _dereq_2("./util");
          var getKeys = _dereq_2("./es5").keys;
          var tryCatch2 = util.tryCatch;
          var errorObj2 = util.errorObj;
          function catchFilter(instances, cb, promise) {
            return function(e3) {
              var boundTo = promise._boundValue();
              predicateLoop:
                for (var i3 = 0; i3 < instances.length; ++i3) {
                  var item = instances[i3];
                  if (item === Error || item != null && item.prototype instanceof Error) {
                    if (e3 instanceof item) {
                      return tryCatch2(cb).call(boundTo, e3);
                    }
                  } else if (typeof item === "function") {
                    var matchesPredicate = tryCatch2(item).call(boundTo, e3);
                    if (matchesPredicate === errorObj2) {
                      return matchesPredicate;
                    } else if (matchesPredicate) {
                      return tryCatch2(cb).call(boundTo, e3);
                    }
                  } else if (util.isObject(e3)) {
                    var keys = getKeys(item);
                    for (var j3 = 0; j3 < keys.length; ++j3) {
                      var key2 = keys[j3];
                      if (item[key2] != e3[key2]) {
                        continue predicateLoop;
                      }
                    }
                    return tryCatch2(cb).call(boundTo, e3);
                  }
                }
              return NEXT_FILTER;
            };
          }
          return catchFilter;
        };
      }, { "./es5": 13, "./util": 36 }], 8: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4) {
          var longStackTraces = false;
          var contextStack = [];
          Promise4.prototype._promiseCreated = function() {
          };
          Promise4.prototype._pushContext = function() {
          };
          Promise4.prototype._popContext = function() {
            return null;
          };
          Promise4._peekContext = Promise4.prototype._peekContext = function() {
          };
          function Context() {
            this._trace = new Context.CapturedTrace(peekContext());
          }
          Context.prototype._pushContext = function() {
            if (this._trace !== void 0) {
              this._trace._promiseCreated = null;
              contextStack.push(this._trace);
            }
          };
          Context.prototype._popContext = function() {
            if (this._trace !== void 0) {
              var trace = contextStack.pop();
              var ret2 = trace._promiseCreated;
              trace._promiseCreated = null;
              return ret2;
            }
            return null;
          };
          function createContext() {
            if (longStackTraces)
              return new Context();
          }
          function peekContext() {
            var lastIndex = contextStack.length - 1;
            if (lastIndex >= 0) {
              return contextStack[lastIndex];
            }
            return void 0;
          }
          Context.CapturedTrace = null;
          Context.create = createContext;
          Context.deactivateLongStackTraces = function() {
          };
          Context.activateLongStackTraces = function() {
            var Promise_pushContext = Promise4.prototype._pushContext;
            var Promise_popContext = Promise4.prototype._popContext;
            var Promise_PeekContext = Promise4._peekContext;
            var Promise_peekContext = Promise4.prototype._peekContext;
            var Promise_promiseCreated = Promise4.prototype._promiseCreated;
            Context.deactivateLongStackTraces = function() {
              Promise4.prototype._pushContext = Promise_pushContext;
              Promise4.prototype._popContext = Promise_popContext;
              Promise4._peekContext = Promise_PeekContext;
              Promise4.prototype._peekContext = Promise_peekContext;
              Promise4.prototype._promiseCreated = Promise_promiseCreated;
              longStackTraces = false;
            };
            longStackTraces = true;
            Promise4.prototype._pushContext = Context.prototype._pushContext;
            Promise4.prototype._popContext = Context.prototype._popContext;
            Promise4._peekContext = Promise4.prototype._peekContext = peekContext;
            Promise4.prototype._promiseCreated = function() {
              var ctx = this._peekContext();
              if (ctx && ctx._promiseCreated == null)
                ctx._promiseCreated = this;
            };
          };
          return Context;
        };
      }, {}], 9: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4, Context, enableAsyncHooks, disableAsyncHooks) {
          var async = Promise4._async;
          var Warning = _dereq_2("./errors").Warning;
          var util = _dereq_2("./util");
          var es52 = _dereq_2("./es5");
          var canAttachTrace2 = util.canAttachTrace;
          var unhandledRejectionHandled;
          var possiblyUnhandledRejection;
          var bluebirdFramePattern = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
          var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
          var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
          var stackFramePattern = null;
          var formatStack = null;
          var indentStackFrames = false;
          var printWarning;
          var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 && true);
          var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 && (debugging || util.env("BLUEBIRD_WARNINGS")));
          var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 && (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));
          var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 && (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
          var deferUnhandledRejectionCheck;
          (function() {
            var promises = [];
            function unhandledRejectionCheck() {
              for (var i3 = 0; i3 < promises.length; ++i3) {
                promises[i3]._notifyUnhandledRejection();
              }
              unhandledRejectionClear();
            }
            function unhandledRejectionClear() {
              promises.length = 0;
            }
            deferUnhandledRejectionCheck = function(promise) {
              promises.push(promise);
              setTimeout(unhandledRejectionCheck, 1);
            };
            es52.defineProperty(Promise4, "_unhandledRejectionCheck", {
              value: unhandledRejectionCheck
            });
            es52.defineProperty(Promise4, "_unhandledRejectionClear", {
              value: unhandledRejectionClear
            });
          })();
          Promise4.prototype.suppressUnhandledRejections = function() {
            var target = this._target();
            target._bitField = target._bitField & ~1048576 | 524288;
          };
          Promise4.prototype._ensurePossibleRejectionHandled = function() {
            if ((this._bitField & 524288) !== 0)
              return;
            this._setRejectionIsUnhandled();
            deferUnhandledRejectionCheck(this);
          };
          Promise4.prototype._notifyUnhandledRejectionIsHandled = function() {
            fireRejectionEvent("rejectionHandled", unhandledRejectionHandled, void 0, this);
          };
          Promise4.prototype._setReturnedNonUndefined = function() {
            this._bitField = this._bitField | 268435456;
          };
          Promise4.prototype._returnedNonUndefined = function() {
            return (this._bitField & 268435456) !== 0;
          };
          Promise4.prototype._notifyUnhandledRejection = function() {
            if (this._isRejectionUnhandled()) {
              var reason = this._settledValue();
              this._setUnhandledRejectionIsNotified();
              fireRejectionEvent("unhandledRejection", possiblyUnhandledRejection, reason, this);
            }
          };
          Promise4.prototype._setUnhandledRejectionIsNotified = function() {
            this._bitField = this._bitField | 262144;
          };
          Promise4.prototype._unsetUnhandledRejectionIsNotified = function() {
            this._bitField = this._bitField & ~262144;
          };
          Promise4.prototype._isUnhandledRejectionNotified = function() {
            return (this._bitField & 262144) > 0;
          };
          Promise4.prototype._setRejectionIsUnhandled = function() {
            this._bitField = this._bitField | 1048576;
          };
          Promise4.prototype._unsetRejectionIsUnhandled = function() {
            this._bitField = this._bitField & ~1048576;
            if (this._isUnhandledRejectionNotified()) {
              this._unsetUnhandledRejectionIsNotified();
              this._notifyUnhandledRejectionIsHandled();
            }
          };
          Promise4.prototype._isRejectionUnhandled = function() {
            return (this._bitField & 1048576) > 0;
          };
          Promise4.prototype._warn = function(message, shouldUseOwnTrace, promise) {
            return warn(message, shouldUseOwnTrace, promise || this);
          };
          Promise4.onPossiblyUnhandledRejection = function(fn) {
            var context = Promise4._getContext();
            possiblyUnhandledRejection = util.contextBind(context, fn);
          };
          Promise4.onUnhandledRejectionHandled = function(fn) {
            var context = Promise4._getContext();
            unhandledRejectionHandled = util.contextBind(context, fn);
          };
          var disableLongStackTraces = function() {
          };
          Promise4.longStackTraces = function() {
            if (async.haveItemsQueued() && !config.longStackTraces) {
              throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
            }
            if (!config.longStackTraces && longStackTracesIsSupported()) {
              var Promise_captureStackTrace = Promise4.prototype._captureStackTrace;
              var Promise_attachExtraTrace = Promise4.prototype._attachExtraTrace;
              var Promise_dereferenceTrace = Promise4.prototype._dereferenceTrace;
              config.longStackTraces = true;
              disableLongStackTraces = function() {
                if (async.haveItemsQueued() && !config.longStackTraces) {
                  throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                }
                Promise4.prototype._captureStackTrace = Promise_captureStackTrace;
                Promise4.prototype._attachExtraTrace = Promise_attachExtraTrace;
                Promise4.prototype._dereferenceTrace = Promise_dereferenceTrace;
                Context.deactivateLongStackTraces();
                config.longStackTraces = false;
              };
              Promise4.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
              Promise4.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
              Promise4.prototype._dereferenceTrace = longStackTracesDereferenceTrace;
              Context.activateLongStackTraces();
            }
          };
          Promise4.hasLongStackTraces = function() {
            return config.longStackTraces && longStackTracesIsSupported();
          };
          var legacyHandlers = {
            unhandledrejection: {
              before: function() {
                var ret2 = util.global.onunhandledrejection;
                util.global.onunhandledrejection = null;
                return ret2;
              },
              after: function(fn) {
                util.global.onunhandledrejection = fn;
              }
            },
            rejectionhandled: {
              before: function() {
                var ret2 = util.global.onrejectionhandled;
                util.global.onrejectionhandled = null;
                return ret2;
              },
              after: function(fn) {
                util.global.onrejectionhandled = fn;
              }
            }
          };
          var fireDomEvent = function() {
            var dispatch = function(legacy, e3) {
              if (legacy) {
                var fn;
                try {
                  fn = legacy.before();
                  return !util.global.dispatchEvent(e3);
                } finally {
                  legacy.after(fn);
                }
              } else {
                return !util.global.dispatchEvent(e3);
              }
            };
            try {
              if (typeof CustomEvent === "function") {
                var event = new CustomEvent("CustomEvent");
                util.global.dispatchEvent(event);
                return function(name2, event2) {
                  name2 = name2.toLowerCase();
                  var eventData = {
                    detail: event2,
                    cancelable: true
                  };
                  var domEvent = new CustomEvent(name2, eventData);
                  es52.defineProperty(domEvent, "promise", { value: event2.promise });
                  es52.defineProperty(domEvent, "reason", { value: event2.reason });
                  return dispatch(legacyHandlers[name2], domEvent);
                };
              } else if (typeof Event === "function") {
                var event = new Event("CustomEvent");
                util.global.dispatchEvent(event);
                return function(name2, event2) {
                  name2 = name2.toLowerCase();
                  var domEvent = new Event(name2, {
                    cancelable: true
                  });
                  domEvent.detail = event2;
                  es52.defineProperty(domEvent, "promise", { value: event2.promise });
                  es52.defineProperty(domEvent, "reason", { value: event2.reason });
                  return dispatch(legacyHandlers[name2], domEvent);
                };
              } else {
                var event = document.createEvent("CustomEvent");
                event.initCustomEvent("testingtheevent", false, true, {});
                util.global.dispatchEvent(event);
                return function(name2, event2) {
                  name2 = name2.toLowerCase();
                  var domEvent = document.createEvent("CustomEvent");
                  domEvent.initCustomEvent(name2, false, true, event2);
                  return dispatch(legacyHandlers[name2], domEvent);
                };
              }
            } catch (e3) {
            }
            return function() {
              return false;
            };
          }();
          var fireGlobalEvent = function() {
            if (util.isNode) {
              return function() {
                return process.emit.apply(process, arguments);
              };
            } else {
              if (!util.global) {
                return function() {
                  return false;
                };
              }
              return function(name2) {
                var methodName = "on" + name2.toLowerCase();
                var method = util.global[methodName];
                if (!method)
                  return false;
                method.apply(util.global, [].slice.call(arguments, 1));
                return true;
              };
            }
          }();
          function generatePromiseLifecycleEventObject(name2, promise) {
            return { promise };
          }
          var eventToObjectGenerator = {
            promiseCreated: generatePromiseLifecycleEventObject,
            promiseFulfilled: generatePromiseLifecycleEventObject,
            promiseRejected: generatePromiseLifecycleEventObject,
            promiseResolved: generatePromiseLifecycleEventObject,
            promiseCancelled: generatePromiseLifecycleEventObject,
            promiseChained: function(name2, promise, child) {
              return { promise, child };
            },
            warning: function(name2, warning) {
              return { warning };
            },
            unhandledRejection: function(name2, reason, promise) {
              return { reason, promise };
            },
            rejectionHandled: generatePromiseLifecycleEventObject
          };
          var activeFireEvent = function(name2) {
            var globalEventFired = false;
            try {
              globalEventFired = fireGlobalEvent.apply(null, arguments);
            } catch (e3) {
              async.throwLater(e3);
              globalEventFired = true;
            }
            var domEventFired = false;
            try {
              domEventFired = fireDomEvent(name2, eventToObjectGenerator[name2].apply(null, arguments));
            } catch (e3) {
              async.throwLater(e3);
              domEventFired = true;
            }
            return domEventFired || globalEventFired;
          };
          Promise4.config = function(opts) {
            opts = Object(opts);
            if ("longStackTraces" in opts) {
              if (opts.longStackTraces) {
                Promise4.longStackTraces();
              } else if (!opts.longStackTraces && Promise4.hasLongStackTraces()) {
                disableLongStackTraces();
              }
            }
            if ("warnings" in opts) {
              var warningsOption = opts.warnings;
              config.warnings = !!warningsOption;
              wForgottenReturn = config.warnings;
              if (util.isObject(warningsOption)) {
                if ("wForgottenReturn" in warningsOption) {
                  wForgottenReturn = !!warningsOption.wForgottenReturn;
                }
              }
            }
            if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
              if (async.haveItemsQueued()) {
                throw new Error("cannot enable cancellation after promises are in use");
              }
              Promise4.prototype._clearCancellationData = cancellationClearCancellationData;
              Promise4.prototype._propagateFrom = cancellationPropagateFrom;
              Promise4.prototype._onCancel = cancellationOnCancel;
              Promise4.prototype._setOnCancel = cancellationSetOnCancel;
              Promise4.prototype._attachCancellationCallback = cancellationAttachCancellationCallback;
              Promise4.prototype._execute = cancellationExecute;
              propagateFromFunction = cancellationPropagateFrom;
              config.cancellation = true;
            }
            if ("monitoring" in opts) {
              if (opts.monitoring && !config.monitoring) {
                config.monitoring = true;
                Promise4.prototype._fireEvent = activeFireEvent;
              } else if (!opts.monitoring && config.monitoring) {
                config.monitoring = false;
                Promise4.prototype._fireEvent = defaultFireEvent;
              }
            }
            if ("asyncHooks" in opts && util.nodeSupportsAsyncResource) {
              var prev = config.asyncHooks;
              var cur = !!opts.asyncHooks;
              if (prev !== cur) {
                config.asyncHooks = cur;
                if (cur) {
                  enableAsyncHooks();
                } else {
                  disableAsyncHooks();
                }
              }
            }
            return Promise4;
          };
          function defaultFireEvent() {
            return false;
          }
          Promise4.prototype._fireEvent = defaultFireEvent;
          Promise4.prototype._execute = function(executor, resolve, reject) {
            try {
              executor(resolve, reject);
            } catch (e3) {
              return e3;
            }
          };
          Promise4.prototype._onCancel = function() {
          };
          Promise4.prototype._setOnCancel = function(handler) {
            ;
          };
          Promise4.prototype._attachCancellationCallback = function(onCancel) {
            ;
          };
          Promise4.prototype._captureStackTrace = function() {
          };
          Promise4.prototype._attachExtraTrace = function() {
          };
          Promise4.prototype._dereferenceTrace = function() {
          };
          Promise4.prototype._clearCancellationData = function() {
          };
          Promise4.prototype._propagateFrom = function(parent, flags) {
            ;
            ;
          };
          function cancellationExecute(executor, resolve, reject) {
            var promise = this;
            try {
              executor(resolve, reject, function(onCancel) {
                if (typeof onCancel !== "function") {
                  throw new TypeError("onCancel must be a function, got: " + util.toString(onCancel));
                }
                promise._attachCancellationCallback(onCancel);
              });
            } catch (e3) {
              return e3;
            }
          }
          function cancellationAttachCancellationCallback(onCancel) {
            if (!this._isCancellable())
              return this;
            var previousOnCancel = this._onCancel();
            if (previousOnCancel !== void 0) {
              if (util.isArray(previousOnCancel)) {
                previousOnCancel.push(onCancel);
              } else {
                this._setOnCancel([previousOnCancel, onCancel]);
              }
            } else {
              this._setOnCancel(onCancel);
            }
          }
          function cancellationOnCancel() {
            return this._onCancelField;
          }
          function cancellationSetOnCancel(onCancel) {
            this._onCancelField = onCancel;
          }
          function cancellationClearCancellationData() {
            this._cancellationParent = void 0;
            this._onCancelField = void 0;
          }
          function cancellationPropagateFrom(parent, flags) {
            if ((flags & 1) !== 0) {
              this._cancellationParent = parent;
              var branchesRemainingToCancel = parent._branchesRemainingToCancel;
              if (branchesRemainingToCancel === void 0) {
                branchesRemainingToCancel = 0;
              }
              parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
            }
            if ((flags & 2) !== 0 && parent._isBound()) {
              this._setBoundTo(parent._boundTo);
            }
          }
          function bindingPropagateFrom(parent, flags) {
            if ((flags & 2) !== 0 && parent._isBound()) {
              this._setBoundTo(parent._boundTo);
            }
          }
          var propagateFromFunction = bindingPropagateFrom;
          function boundValueFunction() {
            var ret2 = this._boundTo;
            if (ret2 !== void 0) {
              if (ret2 instanceof Promise4) {
                if (ret2.isFulfilled()) {
                  return ret2.value();
                } else {
                  return void 0;
                }
              }
            }
            return ret2;
          }
          function longStackTracesCaptureStackTrace() {
            this._trace = new CapturedTrace(this._peekContext());
          }
          function longStackTracesAttachExtraTrace(error, ignoreSelf) {
            if (canAttachTrace2(error)) {
              var trace = this._trace;
              if (trace !== void 0) {
                if (ignoreSelf)
                  trace = trace._parent;
              }
              if (trace !== void 0) {
                trace.attachExtraTrace(error);
              } else if (!error.__stackCleaned__) {
                var parsed = parseStackAndMessage(error);
                util.notEnumerableProp(error, "stack", parsed.message + "\n" + parsed.stack.join("\n"));
                util.notEnumerableProp(error, "__stackCleaned__", true);
              }
            }
          }
          function longStackTracesDereferenceTrace() {
            this._trace = void 0;
          }
          function checkForgottenReturns(returnValue, promiseCreated, name2, promise, parent) {
            if (returnValue === void 0 && promiseCreated !== null && wForgottenReturn) {
              if (parent !== void 0 && parent._returnedNonUndefined())
                return;
              if ((promise._bitField & 65535) === 0)
                return;
              if (name2)
                name2 = name2 + " ";
              var handlerLine = "";
              var creatorLine = "";
              if (promiseCreated._trace) {
                var traceLines = promiseCreated._trace.stack.split("\n");
                var stack = cleanStack(traceLines);
                for (var i3 = stack.length - 1; i3 >= 0; --i3) {
                  var line = stack[i3];
                  if (!nodeFramePattern.test(line)) {
                    var lineMatches = line.match(parseLinePattern);
                    if (lineMatches) {
                      handlerLine = "at " + lineMatches[1] + ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
                    }
                    break;
                  }
                }
                if (stack.length > 0) {
                  var firstUserLine = stack[0];
                  for (var i3 = 0; i3 < traceLines.length; ++i3) {
                    if (traceLines[i3] === firstUserLine) {
                      if (i3 > 0) {
                        creatorLine = "\n" + traceLines[i3 - 1];
                      }
                      break;
                    }
                  }
                }
              }
              var msg = "a promise was created in a " + name2 + "handler " + handlerLine + "but was not returned from it, see http://goo.gl/rRqMUw" + creatorLine;
              promise._warn(msg, true, promiseCreated);
            }
          }
          function deprecated(name2, replacement) {
            var message = name2 + " is deprecated and will be removed in a future version.";
            if (replacement)
              message += " Use " + replacement + " instead.";
            return warn(message);
          }
          function warn(message, shouldUseOwnTrace, promise) {
            if (!config.warnings)
              return;
            var warning = new Warning(message);
            var ctx;
            if (shouldUseOwnTrace) {
              promise._attachExtraTrace(warning);
            } else if (config.longStackTraces && (ctx = Promise4._peekContext())) {
              ctx.attachExtraTrace(warning);
            } else {
              var parsed = parseStackAndMessage(warning);
              warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
            }
            if (!activeFireEvent("warning", warning)) {
              formatAndLogError(warning, "", true);
            }
          }
          function reconstructStack(message, stacks) {
            for (var i3 = 0; i3 < stacks.length - 1; ++i3) {
              stacks[i3].push("From previous event:");
              stacks[i3] = stacks[i3].join("\n");
            }
            if (i3 < stacks.length) {
              stacks[i3] = stacks[i3].join("\n");
            }
            return message + "\n" + stacks.join("\n");
          }
          function removeDuplicateOrEmptyJumps(stacks) {
            for (var i3 = 0; i3 < stacks.length; ++i3) {
              if (stacks[i3].length === 0 || i3 + 1 < stacks.length && stacks[i3][0] === stacks[i3 + 1][0]) {
                stacks.splice(i3, 1);
                i3--;
              }
            }
          }
          function removeCommonRoots(stacks) {
            var current = stacks[0];
            for (var i3 = 1; i3 < stacks.length; ++i3) {
              var prev = stacks[i3];
              var currentLastIndex = current.length - 1;
              var currentLastLine = current[currentLastIndex];
              var commonRootMeetPoint = -1;
              for (var j3 = prev.length - 1; j3 >= 0; --j3) {
                if (prev[j3] === currentLastLine) {
                  commonRootMeetPoint = j3;
                  break;
                }
              }
              for (var j3 = commonRootMeetPoint; j3 >= 0; --j3) {
                var line = prev[j3];
                if (current[currentLastIndex] === line) {
                  current.pop();
                  currentLastIndex--;
                } else {
                  break;
                }
              }
              current = prev;
            }
          }
          function cleanStack(stack) {
            var ret2 = [];
            for (var i3 = 0; i3 < stack.length; ++i3) {
              var line = stack[i3];
              var isTraceLine = line === "    (No stack trace)" || stackFramePattern.test(line);
              var isInternalFrame = isTraceLine && shouldIgnore(line);
              if (isTraceLine && !isInternalFrame) {
                if (indentStackFrames && line.charAt(0) !== " ") {
                  line = "    " + line;
                }
                ret2.push(line);
              }
            }
            return ret2;
          }
          function stackFramesAsArray(error) {
            var stack = error.stack.replace(/\s+$/g, "").split("\n");
            for (var i3 = 0; i3 < stack.length; ++i3) {
              var line = stack[i3];
              if (line === "    (No stack trace)" || stackFramePattern.test(line)) {
                break;
              }
            }
            if (i3 > 0 && error.name != "SyntaxError") {
              stack = stack.slice(i3);
            }
            return stack;
          }
          function parseStackAndMessage(error) {
            var stack = error.stack;
            var message = error.toString();
            stack = typeof stack === "string" && stack.length > 0 ? stackFramesAsArray(error) : ["    (No stack trace)"];
            return {
              message,
              stack: error.name == "SyntaxError" ? stack : cleanStack(stack)
            };
          }
          function formatAndLogError(error, title, isSoft) {
            if (typeof console !== "undefined") {
              var message;
              if (util.isObject(error)) {
                var stack = error.stack;
                message = title + formatStack(stack, error);
              } else {
                message = title + String(error);
              }
              if (typeof printWarning === "function") {
                printWarning(message, isSoft);
              } else if (typeof console.log === "function" || typeof console.log === "object") {
                console.log(message);
              }
            }
          }
          function fireRejectionEvent(name2, localHandler, reason, promise) {
            var localEventFired = false;
            try {
              if (typeof localHandler === "function") {
                localEventFired = true;
                if (name2 === "rejectionHandled") {
                  localHandler(promise);
                } else {
                  localHandler(reason, promise);
                }
              }
            } catch (e3) {
              async.throwLater(e3);
            }
            if (name2 === "unhandledRejection") {
              if (!activeFireEvent(name2, reason, promise) && !localEventFired) {
                formatAndLogError(reason, "Unhandled rejection ");
              }
            } else {
              activeFireEvent(name2, promise);
            }
          }
          function formatNonError(obj2) {
            var str;
            if (typeof obj2 === "function") {
              str = "[function " + (obj2.name || "anonymous") + "]";
            } else {
              str = obj2 && typeof obj2.toString === "function" ? obj2.toString() : util.toString(obj2);
              var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
              if (ruselessToString.test(str)) {
                try {
                  var newStr = JSON.stringify(obj2);
                  str = newStr;
                } catch (e3) {
                }
              }
              if (str.length === 0) {
                str = "(empty array)";
              }
            }
            return "(<" + snip(str) + ">, no stack trace)";
          }
          function snip(str) {
            var maxChars = 41;
            if (str.length < maxChars) {
              return str;
            }
            return str.substr(0, maxChars - 3) + "...";
          }
          function longStackTracesIsSupported() {
            return typeof captureStackTrace === "function";
          }
          var shouldIgnore = function() {
            return false;
          };
          var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
          function parseLineInfo(line) {
            var matches = line.match(parseLineInfoRegex);
            if (matches) {
              return {
                fileName: matches[1],
                line: parseInt(matches[2], 10)
              };
            }
          }
          function setBounds(firstLineError, lastLineError) {
            if (!longStackTracesIsSupported())
              return;
            var firstStackLines = (firstLineError.stack || "").split("\n");
            var lastStackLines = (lastLineError.stack || "").split("\n");
            var firstIndex = -1;
            var lastIndex = -1;
            var firstFileName;
            var lastFileName;
            for (var i3 = 0; i3 < firstStackLines.length; ++i3) {
              var result = parseLineInfo(firstStackLines[i3]);
              if (result) {
                firstFileName = result.fileName;
                firstIndex = result.line;
                break;
              }
            }
            for (var i3 = 0; i3 < lastStackLines.length; ++i3) {
              var result = parseLineInfo(lastStackLines[i3]);
              if (result) {
                lastFileName = result.fileName;
                lastIndex = result.line;
                break;
              }
            }
            if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName || firstFileName !== lastFileName || firstIndex >= lastIndex) {
              return;
            }
            shouldIgnore = function(line) {
              if (bluebirdFramePattern.test(line))
                return true;
              var info = parseLineInfo(line);
              if (info) {
                if (info.fileName === firstFileName && (firstIndex <= info.line && info.line <= lastIndex)) {
                  return true;
                }
              }
              return false;
            };
          }
          function CapturedTrace(parent) {
            this._parent = parent;
            this._promisesCreated = 0;
            var length = this._length = 1 + (parent === void 0 ? 0 : parent._length);
            captureStackTrace(this, CapturedTrace);
            if (length > 32)
              this.uncycle();
          }
          util.inherits(CapturedTrace, Error);
          Context.CapturedTrace = CapturedTrace;
          CapturedTrace.prototype.uncycle = function() {
            var length = this._length;
            if (length < 2)
              return;
            var nodes = [];
            var stackToIndex = {};
            for (var i3 = 0, node = this; node !== void 0; ++i3) {
              nodes.push(node);
              node = node._parent;
            }
            length = this._length = i3;
            for (var i3 = length - 1; i3 >= 0; --i3) {
              var stack = nodes[i3].stack;
              if (stackToIndex[stack] === void 0) {
                stackToIndex[stack] = i3;
              }
            }
            for (var i3 = 0; i3 < length; ++i3) {
              var currentStack = nodes[i3].stack;
              var index = stackToIndex[currentStack];
              if (index !== void 0 && index !== i3) {
                if (index > 0) {
                  nodes[index - 1]._parent = void 0;
                  nodes[index - 1]._length = 1;
                }
                nodes[i3]._parent = void 0;
                nodes[i3]._length = 1;
                var cycleEdgeNode = i3 > 0 ? nodes[i3 - 1] : this;
                if (index < length - 1) {
                  cycleEdgeNode._parent = nodes[index + 1];
                  cycleEdgeNode._parent.uncycle();
                  cycleEdgeNode._length = cycleEdgeNode._parent._length + 1;
                } else {
                  cycleEdgeNode._parent = void 0;
                  cycleEdgeNode._length = 1;
                }
                var currentChildLength = cycleEdgeNode._length + 1;
                for (var j3 = i3 - 2; j3 >= 0; --j3) {
                  nodes[j3]._length = currentChildLength;
                  currentChildLength++;
                }
                return;
              }
            }
          };
          CapturedTrace.prototype.attachExtraTrace = function(error) {
            if (error.__stackCleaned__)
              return;
            this.uncycle();
            var parsed = parseStackAndMessage(error);
            var message = parsed.message;
            var stacks = [parsed.stack];
            var trace = this;
            while (trace !== void 0) {
              stacks.push(cleanStack(trace.stack.split("\n")));
              trace = trace._parent;
            }
            removeCommonRoots(stacks);
            removeDuplicateOrEmptyJumps(stacks);
            util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
            util.notEnumerableProp(error, "__stackCleaned__", true);
          };
          var captureStackTrace = function stackDetection() {
            var v8stackFramePattern = /^\s*at\s*/;
            var v8stackFormatter = function(stack, error) {
              if (typeof stack === "string")
                return stack;
              if (error.name !== void 0 && error.message !== void 0) {
                return error.toString();
              }
              return formatNonError(error);
            };
            if (typeof Error.stackTraceLimit === "number" && typeof Error.captureStackTrace === "function") {
              Error.stackTraceLimit += 6;
              stackFramePattern = v8stackFramePattern;
              formatStack = v8stackFormatter;
              var captureStackTrace2 = Error.captureStackTrace;
              shouldIgnore = function(line) {
                return bluebirdFramePattern.test(line);
              };
              return function(receiver2, ignoreUntil) {
                Error.stackTraceLimit += 6;
                captureStackTrace2(receiver2, ignoreUntil);
                Error.stackTraceLimit -= 6;
              };
            }
            var err = new Error();
            if (typeof err.stack === "string" && err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
              stackFramePattern = /@/;
              formatStack = v8stackFormatter;
              indentStackFrames = true;
              return function captureStackTrace3(o3) {
                o3.stack = new Error().stack;
              };
            }
            var hasStackAfterThrow;
            try {
              throw new Error();
            } catch (e3) {
              hasStackAfterThrow = "stack" in e3;
            }
            if (!("stack" in err) && hasStackAfterThrow && typeof Error.stackTraceLimit === "number") {
              stackFramePattern = v8stackFramePattern;
              formatStack = v8stackFormatter;
              return function captureStackTrace3(o3) {
                Error.stackTraceLimit += 6;
                try {
                  throw new Error();
                } catch (e3) {
                  o3.stack = e3.stack;
                }
                Error.stackTraceLimit -= 6;
              };
            }
            formatStack = function(stack, error) {
              if (typeof stack === "string")
                return stack;
              if ((typeof error === "object" || typeof error === "function") && error.name !== void 0 && error.message !== void 0) {
                return error.toString();
              }
              return formatNonError(error);
            };
            return null;
          }([]);
          if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
            printWarning = function(message) {
              console.warn(message);
            };
            if (util.isNode && process.stderr.isTTY) {
              printWarning = function(message, isSoft) {
                var color = isSoft ? "[33m" : "[31m";
                console.warn(color + message + "[0m\n");
              };
            } else if (!util.isNode && typeof new Error().stack === "string") {
              printWarning = function(message, isSoft) {
                console.warn("%c" + message, isSoft ? "color: darkorange" : "color: red");
              };
            }
          }
          var config = {
            warnings,
            longStackTraces: false,
            cancellation: false,
            monitoring: false,
            asyncHooks: false
          };
          if (longStackTraces)
            Promise4.longStackTraces();
          return {
            asyncHooks: function() {
              return config.asyncHooks;
            },
            longStackTraces: function() {
              return config.longStackTraces;
            },
            warnings: function() {
              return config.warnings;
            },
            cancellation: function() {
              return config.cancellation;
            },
            monitoring: function() {
              return config.monitoring;
            },
            propagateFromFunction: function() {
              return propagateFromFunction;
            },
            boundValueFunction: function() {
              return boundValueFunction;
            },
            checkForgottenReturns,
            setBounds,
            warn,
            deprecated,
            CapturedTrace,
            fireDomEvent,
            fireGlobalEvent
          };
        };
      }, { "./errors": 12, "./es5": 13, "./util": 36 }], 10: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4) {
          function returner() {
            return this.value;
          }
          function thrower2() {
            throw this.reason;
          }
          Promise4.prototype["return"] = Promise4.prototype.thenReturn = function(value) {
            if (value instanceof Promise4)
              value.suppressUnhandledRejections();
            return this._then(returner, void 0, void 0, { value }, void 0);
          };
          Promise4.prototype["throw"] = Promise4.prototype.thenThrow = function(reason) {
            return this._then(thrower2, void 0, void 0, { reason }, void 0);
          };
          Promise4.prototype.catchThrow = function(reason) {
            if (arguments.length <= 1) {
              return this._then(void 0, thrower2, void 0, { reason }, void 0);
            } else {
              var _reason = arguments[1];
              var handler = function() {
                throw _reason;
              };
              return this.caught(reason, handler);
            }
          };
          Promise4.prototype.catchReturn = function(value) {
            if (arguments.length <= 1) {
              if (value instanceof Promise4)
                value.suppressUnhandledRejections();
              return this._then(void 0, returner, void 0, { value }, void 0);
            } else {
              var _value = arguments[1];
              if (_value instanceof Promise4)
                _value.suppressUnhandledRejections();
              var handler = function() {
                return _value;
              };
              return this.caught(value, handler);
            }
          };
        };
      }, {}], 11: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4, INTERNAL) {
          var PromiseReduce = Promise4.reduce;
          var PromiseAll = Promise4.all;
          function promiseAllThis() {
            return PromiseAll(this);
          }
          function PromiseMapSeries(promises, fn) {
            return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
          }
          Promise4.prototype.each = function(fn) {
            return PromiseReduce(this, fn, INTERNAL, 0)._then(promiseAllThis, void 0, void 0, this, void 0);
          };
          Promise4.prototype.mapSeries = function(fn) {
            return PromiseReduce(this, fn, INTERNAL, INTERNAL);
          };
          Promise4.each = function(promises, fn) {
            return PromiseReduce(promises, fn, INTERNAL, 0)._then(promiseAllThis, void 0, void 0, promises, void 0);
          };
          Promise4.mapSeries = PromiseMapSeries;
        };
      }, {}], 12: [function(_dereq_2, module2, exports2) {
        "use strict";
        var es52 = _dereq_2("./es5");
        var Objectfreeze = es52.freeze;
        var util = _dereq_2("./util");
        var inherits2 = util.inherits;
        var notEnumerableProp2 = util.notEnumerableProp;
        function subError(nameProperty, defaultMessage) {
          function SubError(message) {
            if (!(this instanceof SubError))
              return new SubError(message);
            notEnumerableProp2(this, "message", typeof message === "string" ? message : defaultMessage);
            notEnumerableProp2(this, "name", nameProperty);
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
            } else {
              Error.call(this);
            }
          }
          inherits2(SubError, Error);
          return SubError;
        }
        var _TypeError, _RangeError;
        var Warning = subError("Warning", "warning");
        var CancellationError = subError("CancellationError", "cancellation error");
        var TimeoutError = subError("TimeoutError", "timeout error");
        var AggregateError = subError("AggregateError", "aggregate error");
        try {
          _TypeError = TypeError;
          _RangeError = RangeError;
        } catch (e3) {
          _TypeError = subError("TypeError", "type error");
          _RangeError = subError("RangeError", "range error");
        }
        var methods = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" ");
        for (var i3 = 0; i3 < methods.length; ++i3) {
          if (typeof Array.prototype[methods[i3]] === "function") {
            AggregateError.prototype[methods[i3]] = Array.prototype[methods[i3]];
          }
        }
        es52.defineProperty(AggregateError.prototype, "length", {
          value: 0,
          configurable: false,
          writable: true,
          enumerable: true
        });
        AggregateError.prototype["isOperational"] = true;
        var level = 0;
        AggregateError.prototype.toString = function() {
          var indent = Array(level * 4 + 1).join(" ");
          var ret2 = "\n" + indent + "AggregateError of:\n";
          level++;
          indent = Array(level * 4 + 1).join(" ");
          for (var i4 = 0; i4 < this.length; ++i4) {
            var str = this[i4] === this ? "[Circular AggregateError]" : this[i4] + "";
            var lines = str.split("\n");
            for (var j3 = 0; j3 < lines.length; ++j3) {
              lines[j3] = indent + lines[j3];
            }
            str = lines.join("\n");
            ret2 += str + "\n";
          }
          level--;
          return ret2;
        };
        function OperationalError(message) {
          if (!(this instanceof OperationalError))
            return new OperationalError(message);
          notEnumerableProp2(this, "name", "OperationalError");
          notEnumerableProp2(this, "message", message);
          this.cause = message;
          this["isOperational"] = true;
          if (message instanceof Error) {
            notEnumerableProp2(this, "message", message.message);
            notEnumerableProp2(this, "stack", message.stack);
          } else if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }
        }
        inherits2(OperationalError, Error);
        var errorTypes = Error["__BluebirdErrorTypes__"];
        if (!errorTypes) {
          errorTypes = Objectfreeze({
            CancellationError,
            TimeoutError,
            OperationalError,
            RejectionError: OperationalError,
            AggregateError
          });
          es52.defineProperty(Error, "__BluebirdErrorTypes__", {
            value: errorTypes,
            writable: false,
            enumerable: false,
            configurable: false
          });
        }
        module2.exports = {
          Error,
          TypeError: _TypeError,
          RangeError: _RangeError,
          CancellationError: errorTypes.CancellationError,
          OperationalError: errorTypes.OperationalError,
          TimeoutError: errorTypes.TimeoutError,
          AggregateError: errorTypes.AggregateError,
          Warning
        };
      }, { "./es5": 13, "./util": 36 }], 13: [function(_dereq_2, module2, exports2) {
        var isES5 = function() {
          "use strict";
          return this === void 0;
        }();
        if (isES5) {
          module2.exports = {
            freeze: Object.freeze,
            defineProperty: Object.defineProperty,
            getDescriptor: Object.getOwnPropertyDescriptor,
            keys: Object.keys,
            names: Object.getOwnPropertyNames,
            getPrototypeOf: Object.getPrototypeOf,
            isArray: Array.isArray,
            isES5,
            propertyIsWritable: function(obj2, prop) {
              var descriptor = Object.getOwnPropertyDescriptor(obj2, prop);
              return !!(!descriptor || descriptor.writable || descriptor.set);
            }
          };
        } else {
          var has = {}.hasOwnProperty;
          var str = {}.toString;
          var proto = {}.constructor.prototype;
          var ObjectKeys = function(o3) {
            var ret2 = [];
            for (var key2 in o3) {
              if (has.call(o3, key2)) {
                ret2.push(key2);
              }
            }
            return ret2;
          };
          var ObjectGetDescriptor = function(o3, key2) {
            return { value: o3[key2] };
          };
          var ObjectDefineProperty = function(o3, key2, desc) {
            o3[key2] = desc.value;
            return o3;
          };
          var ObjectFreeze = function(obj2) {
            return obj2;
          };
          var ObjectGetPrototypeOf = function(obj2) {
            try {
              return Object(obj2).constructor.prototype;
            } catch (e3) {
              return proto;
            }
          };
          var ArrayIsArray = function(obj2) {
            try {
              return str.call(obj2) === "[object Array]";
            } catch (e3) {
              return false;
            }
          };
          module2.exports = {
            isArray: ArrayIsArray,
            keys: ObjectKeys,
            names: ObjectKeys,
            defineProperty: ObjectDefineProperty,
            getDescriptor: ObjectGetDescriptor,
            freeze: ObjectFreeze,
            getPrototypeOf: ObjectGetPrototypeOf,
            isES5,
            propertyIsWritable: function() {
              return true;
            }
          };
        }
      }, {}], 14: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4, INTERNAL) {
          var PromiseMap = Promise4.map;
          Promise4.prototype.filter = function(fn, options) {
            return PromiseMap(this, fn, options, INTERNAL);
          };
          Promise4.filter = function(promises, fn, options) {
            return PromiseMap(promises, fn, options, INTERNAL);
          };
        };
      }, {}], 15: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4, tryConvertToPromise, NEXT_FILTER) {
          var util = _dereq_2("./util");
          var CancellationError = Promise4.CancellationError;
          var errorObj2 = util.errorObj;
          var catchFilter = _dereq_2("./catch_filter")(NEXT_FILTER);
          function PassThroughHandlerContext(promise, type, handler) {
            this.promise = promise;
            this.type = type;
            this.handler = handler;
            this.called = false;
            this.cancelPromise = null;
          }
          PassThroughHandlerContext.prototype.isFinallyHandler = function() {
            return this.type === 0;
          };
          function FinallyHandlerCancelReaction(finallyHandler2) {
            this.finallyHandler = finallyHandler2;
          }
          FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
            checkCancel(this.finallyHandler);
          };
          function checkCancel(ctx, reason) {
            if (ctx.cancelPromise != null) {
              if (arguments.length > 1) {
                ctx.cancelPromise._reject(reason);
              } else {
                ctx.cancelPromise._cancel();
              }
              ctx.cancelPromise = null;
              return true;
            }
            return false;
          }
          function succeed() {
            return finallyHandler.call(this, this.promise._target()._settledValue());
          }
          function fail(reason) {
            if (checkCancel(this, reason))
              return;
            errorObj2.e = reason;
            return errorObj2;
          }
          function finallyHandler(reasonOrValue) {
            var promise = this.promise;
            var handler = this.handler;
            if (!this.called) {
              this.called = true;
              var ret2 = this.isFinallyHandler() ? handler.call(promise._boundValue()) : handler.call(promise._boundValue(), reasonOrValue);
              if (ret2 === NEXT_FILTER) {
                return ret2;
              } else if (ret2 !== void 0) {
                promise._setReturnedNonUndefined();
                var maybePromise = tryConvertToPromise(ret2, promise);
                if (maybePromise instanceof Promise4) {
                  if (this.cancelPromise != null) {
                    if (maybePromise._isCancelled()) {
                      var reason = new CancellationError("late cancellation observer");
                      promise._attachExtraTrace(reason);
                      errorObj2.e = reason;
                      return errorObj2;
                    } else if (maybePromise.isPending()) {
                      maybePromise._attachCancellationCallback(new FinallyHandlerCancelReaction(this));
                    }
                  }
                  return maybePromise._then(succeed, fail, void 0, this, void 0);
                }
              }
            }
            if (promise.isRejected()) {
              checkCancel(this);
              errorObj2.e = reasonOrValue;
              return errorObj2;
            } else {
              checkCancel(this);
              return reasonOrValue;
            }
          }
          Promise4.prototype._passThrough = function(handler, type, success, fail2) {
            if (typeof handler !== "function")
              return this.then();
            return this._then(success, fail2, void 0, new PassThroughHandlerContext(this, type, handler), void 0);
          };
          Promise4.prototype.lastly = Promise4.prototype["finally"] = function(handler) {
            return this._passThrough(handler, 0, finallyHandler, finallyHandler);
          };
          Promise4.prototype.tap = function(handler) {
            return this._passThrough(handler, 1, finallyHandler);
          };
          Promise4.prototype.tapCatch = function(handlerOrPredicate) {
            var len = arguments.length;
            if (len === 1) {
              return this._passThrough(handlerOrPredicate, 1, void 0, finallyHandler);
            } else {
              var catchInstances = new Array(len - 1), j3 = 0, i3;
              for (i3 = 0; i3 < len - 1; ++i3) {
                var item = arguments[i3];
                if (util.isObject(item)) {
                  catchInstances[j3++] = item;
                } else {
                  return Promise4.reject(new TypeError("tapCatch statement predicate: expecting an object but got " + util.classString(item)));
                }
              }
              catchInstances.length = j3;
              var handler = arguments[i3];
              return this._passThrough(catchFilter(catchInstances, handler, this), 1, void 0, finallyHandler);
            }
          };
          return PassThroughHandlerContext;
        };
      }, { "./catch_filter": 7, "./util": 36 }], 16: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug) {
          var errors = _dereq_2("./errors");
          var TypeError2 = errors.TypeError;
          var util = _dereq_2("./util");
          var errorObj2 = util.errorObj;
          var tryCatch2 = util.tryCatch;
          var yieldHandlers = [];
          function promiseFromYieldHandler(value, yieldHandlers2, traceParent) {
            for (var i3 = 0; i3 < yieldHandlers2.length; ++i3) {
              traceParent._pushContext();
              var result = tryCatch2(yieldHandlers2[i3])(value);
              traceParent._popContext();
              if (result === errorObj2) {
                traceParent._pushContext();
                var ret2 = Promise4.reject(errorObj2.e);
                traceParent._popContext();
                return ret2;
              }
              var maybePromise = tryConvertToPromise(result, traceParent);
              if (maybePromise instanceof Promise4)
                return maybePromise;
            }
            return null;
          }
          function PromiseSpawn(generatorFunction, receiver2, yieldHandler, stack) {
            if (debug.cancellation()) {
              var internal = new Promise4(INTERNAL);
              var _finallyPromise = this._finallyPromise = new Promise4(INTERNAL);
              this._promise = internal.lastly(function() {
                return _finallyPromise;
              });
              internal._captureStackTrace();
              internal._setOnCancel(this);
            } else {
              var promise = this._promise = new Promise4(INTERNAL);
              promise._captureStackTrace();
            }
            this._stack = stack;
            this._generatorFunction = generatorFunction;
            this._receiver = receiver2;
            this._generator = void 0;
            this._yieldHandlers = typeof yieldHandler === "function" ? [yieldHandler].concat(yieldHandlers) : yieldHandlers;
            this._yieldedPromise = null;
            this._cancellationPhase = false;
          }
          util.inherits(PromiseSpawn, Proxyable);
          PromiseSpawn.prototype._isResolved = function() {
            return this._promise === null;
          };
          PromiseSpawn.prototype._cleanup = function() {
            this._promise = this._generator = null;
            if (debug.cancellation() && this._finallyPromise !== null) {
              this._finallyPromise._fulfill();
              this._finallyPromise = null;
            }
          };
          PromiseSpawn.prototype._promiseCancelled = function() {
            if (this._isResolved())
              return;
            var implementsReturn = typeof this._generator["return"] !== "undefined";
            var result;
            if (!implementsReturn) {
              var reason = new Promise4.CancellationError("generator .return() sentinel");
              Promise4.coroutine.returnSentinel = reason;
              this._promise._attachExtraTrace(reason);
              this._promise._pushContext();
              result = tryCatch2(this._generator["throw"]).call(this._generator, reason);
              this._promise._popContext();
            } else {
              this._promise._pushContext();
              result = tryCatch2(this._generator["return"]).call(this._generator, void 0);
              this._promise._popContext();
            }
            this._cancellationPhase = true;
            this._yieldedPromise = null;
            this._continue(result);
          };
          PromiseSpawn.prototype._promiseFulfilled = function(value) {
            this._yieldedPromise = null;
            this._promise._pushContext();
            var result = tryCatch2(this._generator.next).call(this._generator, value);
            this._promise._popContext();
            this._continue(result);
          };
          PromiseSpawn.prototype._promiseRejected = function(reason) {
            this._yieldedPromise = null;
            this._promise._attachExtraTrace(reason);
            this._promise._pushContext();
            var result = tryCatch2(this._generator["throw"]).call(this._generator, reason);
            this._promise._popContext();
            this._continue(result);
          };
          PromiseSpawn.prototype._resultCancelled = function() {
            if (this._yieldedPromise instanceof Promise4) {
              var promise = this._yieldedPromise;
              this._yieldedPromise = null;
              promise.cancel();
            }
          };
          PromiseSpawn.prototype.promise = function() {
            return this._promise;
          };
          PromiseSpawn.prototype._run = function() {
            this._generator = this._generatorFunction.call(this._receiver);
            this._receiver = this._generatorFunction = void 0;
            this._promiseFulfilled(void 0);
          };
          PromiseSpawn.prototype._continue = function(result) {
            var promise = this._promise;
            if (result === errorObj2) {
              this._cleanup();
              if (this._cancellationPhase) {
                return promise.cancel();
              } else {
                return promise._rejectCallback(result.e, false);
              }
            }
            var value = result.value;
            if (result.done === true) {
              this._cleanup();
              if (this._cancellationPhase) {
                return promise.cancel();
              } else {
                return promise._resolveCallback(value);
              }
            } else {
              var maybePromise = tryConvertToPromise(value, this._promise);
              if (!(maybePromise instanceof Promise4)) {
                maybePromise = promiseFromYieldHandler(maybePromise, this._yieldHandlers, this._promise);
                if (maybePromise === null) {
                  this._promiseRejected(new TypeError2("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", String(value)) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")));
                  return;
                }
              }
              maybePromise = maybePromise._target();
              var bitField = maybePromise._bitField;
              ;
              if ((bitField & 50397184) === 0) {
                this._yieldedPromise = maybePromise;
                maybePromise._proxy(this, null);
              } else if ((bitField & 33554432) !== 0) {
                Promise4._async.invoke(this._promiseFulfilled, this, maybePromise._value());
              } else if ((bitField & 16777216) !== 0) {
                Promise4._async.invoke(this._promiseRejected, this, maybePromise._reason());
              } else {
                this._promiseCancelled();
              }
            }
          };
          Promise4.coroutine = function(generatorFunction, options) {
            if (typeof generatorFunction !== "function") {
              throw new TypeError2("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
            }
            var yieldHandler = Object(options).yieldHandler;
            var PromiseSpawn$ = PromiseSpawn;
            var stack = new Error().stack;
            return function() {
              var generator = generatorFunction.apply(this, arguments);
              var spawn = new PromiseSpawn$(void 0, void 0, yieldHandler, stack);
              var ret2 = spawn.promise();
              spawn._generator = generator;
              spawn._promiseFulfilled(void 0);
              return ret2;
            };
          };
          Promise4.coroutine.addYieldHandler = function(fn) {
            if (typeof fn !== "function") {
              throw new TypeError2("expecting a function but got " + util.classString(fn));
            }
            yieldHandlers.push(fn);
          };
          Promise4.spawn = function(generatorFunction) {
            debug.deprecated("Promise.spawn()", "Promise.coroutine()");
            if (typeof generatorFunction !== "function") {
              return apiRejection("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
            }
            var spawn = new PromiseSpawn(generatorFunction, this);
            var ret2 = spawn.promise();
            spawn._run(Promise4.spawn);
            return ret2;
          };
        };
      }, { "./errors": 12, "./util": 36 }], 17: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4, PromiseArray, tryConvertToPromise, INTERNAL, async) {
          var util = _dereq_2("./util");
          var canEvaluate2 = util.canEvaluate;
          var tryCatch2 = util.tryCatch;
          var errorObj2 = util.errorObj;
          var reject;
          if (false) {
            if (canEvaluate2) {
              var thenCallback = function(i4) {
                return new Function("value", "holder", "                             \n            'use strict';                                                    \n            holder.pIndex = value;                                           \n            holder.checkFulfillment(this);                                   \n            ".replace(/Index/g, i4));
              };
              var promiseSetter = function(i4) {
                return new Function("promise", "holder", "                           \n            'use strict';                                                    \n            holder.pIndex = promise;                                         \n            ".replace(/Index/g, i4));
              };
              var generateHolderClass = function(total) {
                var props = new Array(total);
                for (var i4 = 0; i4 < props.length; ++i4) {
                  props[i4] = "this.p" + (i4 + 1);
                }
                var assignment = props.join(" = ") + " = null;";
                var cancellationCode = "var promise;\n" + props.map(function(prop) {
                  return "                                                         \n                promise = " + prop + ";                                      \n                if (promise instanceof Promise) {                            \n                    promise.cancel();                                        \n                }                                                            \n            ";
                }).join("\n");
                var passedArguments = props.join(", ");
                var name2 = "Holder$" + total;
                var code = "return function(tryCatch, errorObj, Promise, async) {    \n            'use strict';                                                    \n            function [TheName](fn) {                                         \n                [TheProperties]                                              \n                this.fn = fn;                                                \n                this.asyncNeeded = true;                                     \n                this.now = 0;                                                \n            }                                                                \n                                                                             \n            [TheName].prototype._callFunction = function(promise) {          \n                promise._pushContext();                                      \n                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n                promise._popContext();                                       \n                if (ret === errorObj) {                                      \n                    promise._rejectCallback(ret.e, false);                   \n                } else {                                                     \n                    promise._resolveCallback(ret);                           \n                }                                                            \n            };                                                               \n                                                                             \n            [TheName].prototype.checkFulfillment = function(promise) {       \n                var now = ++this.now;                                        \n                if (now === [TheTotal]) {                                    \n                    if (this.asyncNeeded) {                                  \n                        async.invoke(this._callFunction, this, promise);     \n                    } else {                                                 \n                        this._callFunction(promise);                         \n                    }                                                        \n                                                                             \n                }                                                            \n            };                                                               \n                                                                             \n            [TheName].prototype._resultCancelled = function() {              \n                [CancellationCode]                                           \n            };                                                               \n                                                                             \n            return [TheName];                                                \n        }(tryCatch, errorObj, Promise, async);                               \n        ";
                code = code.replace(/\[TheName\]/g, name2).replace(/\[TheTotal\]/g, total).replace(/\[ThePassedArguments\]/g, passedArguments).replace(/\[TheProperties\]/g, assignment).replace(/\[CancellationCode\]/g, cancellationCode);
                return new Function("tryCatch", "errorObj", "Promise", "async", code)(tryCatch2, errorObj2, Promise4, async);
              };
              var holderClasses = [];
              var thenCallbacks = [];
              var promiseSetters = [];
              for (var i3 = 0; i3 < 8; ++i3) {
                holderClasses.push(generateHolderClass(i3 + 1));
                thenCallbacks.push(thenCallback(i3 + 1));
                promiseSetters.push(promiseSetter(i3 + 1));
              }
              reject = function(reason) {
                this._reject(reason);
              };
            }
          }
          Promise4.join = function() {
            var last = arguments.length - 1;
            var fn;
            if (last > 0 && typeof arguments[last] === "function") {
              fn = arguments[last];
              if (false) {
                if (last <= 8 && canEvaluate2) {
                  var ret2 = new Promise4(INTERNAL);
                  ret2._captureStackTrace();
                  var HolderClass = holderClasses[last - 1];
                  var holder = new HolderClass(fn);
                  var callbacks = thenCallbacks;
                  for (var i4 = 0; i4 < last; ++i4) {
                    var maybePromise = tryConvertToPromise(arguments[i4], ret2);
                    if (maybePromise instanceof Promise4) {
                      maybePromise = maybePromise._target();
                      var bitField = maybePromise._bitField;
                      ;
                      if ((bitField & 50397184) === 0) {
                        maybePromise._then(callbacks[i4], reject, void 0, ret2, holder);
                        promiseSetters[i4](maybePromise, holder);
                        holder.asyncNeeded = false;
                      } else if ((bitField & 33554432) !== 0) {
                        callbacks[i4].call(ret2, maybePromise._value(), holder);
                      } else if ((bitField & 16777216) !== 0) {
                        ret2._reject(maybePromise._reason());
                      } else {
                        ret2._cancel();
                      }
                    } else {
                      callbacks[i4].call(ret2, maybePromise, holder);
                    }
                  }
                  if (!ret2._isFateSealed()) {
                    if (holder.asyncNeeded) {
                      var context = Promise4._getContext();
                      holder.fn = util.contextBind(context, holder.fn);
                    }
                    ret2._setAsyncGuaranteed();
                    ret2._setOnCancel(holder);
                  }
                  return ret2;
                }
              }
            }
            var args = [].slice.call(arguments);
            ;
            if (fn)
              args.pop();
            var ret2 = new PromiseArray(args).promise();
            return fn !== void 0 ? ret2.spread(fn) : ret2;
          };
        };
      }, { "./util": 36 }], 18: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
          var util = _dereq_2("./util");
          var tryCatch2 = util.tryCatch;
          var errorObj2 = util.errorObj;
          var async = Promise4._async;
          function MappingPromiseArray(promises, fn, limit, _filter) {
            this.constructor$(promises);
            this._promise._captureStackTrace();
            var context = Promise4._getContext();
            this._callback = util.contextBind(context, fn);
            this._preservedValues = _filter === INTERNAL ? new Array(this.length()) : null;
            this._limit = limit;
            this._inFlight = 0;
            this._queue = [];
            async.invoke(this._asyncInit, this, void 0);
            if (util.isArray(promises)) {
              for (var i3 = 0; i3 < promises.length; ++i3) {
                var maybePromise = promises[i3];
                if (maybePromise instanceof Promise4) {
                  maybePromise.suppressUnhandledRejections();
                }
              }
            }
          }
          util.inherits(MappingPromiseArray, PromiseArray);
          MappingPromiseArray.prototype._asyncInit = function() {
            this._init$(void 0, -2);
          };
          MappingPromiseArray.prototype._init = function() {
          };
          MappingPromiseArray.prototype._promiseFulfilled = function(value, index) {
            var values = this._values;
            var length = this.length();
            var preservedValues = this._preservedValues;
            var limit = this._limit;
            if (index < 0) {
              index = index * -1 - 1;
              values[index] = value;
              if (limit >= 1) {
                this._inFlight--;
                this._drainQueue();
                if (this._isResolved())
                  return true;
              }
            } else {
              if (limit >= 1 && this._inFlight >= limit) {
                values[index] = value;
                this._queue.push(index);
                return false;
              }
              if (preservedValues !== null)
                preservedValues[index] = value;
              var promise = this._promise;
              var callback = this._callback;
              var receiver2 = promise._boundValue();
              promise._pushContext();
              var ret2 = tryCatch2(callback).call(receiver2, value, index, length);
              var promiseCreated = promise._popContext();
              debug.checkForgottenReturns(ret2, promiseCreated, preservedValues !== null ? "Promise.filter" : "Promise.map", promise);
              if (ret2 === errorObj2) {
                this._reject(ret2.e);
                return true;
              }
              var maybePromise = tryConvertToPromise(ret2, this._promise);
              if (maybePromise instanceof Promise4) {
                maybePromise = maybePromise._target();
                var bitField = maybePromise._bitField;
                ;
                if ((bitField & 50397184) === 0) {
                  if (limit >= 1)
                    this._inFlight++;
                  values[index] = maybePromise;
                  maybePromise._proxy(this, (index + 1) * -1);
                  return false;
                } else if ((bitField & 33554432) !== 0) {
                  ret2 = maybePromise._value();
                } else if ((bitField & 16777216) !== 0) {
                  this._reject(maybePromise._reason());
                  return true;
                } else {
                  this._cancel();
                  return true;
                }
              }
              values[index] = ret2;
            }
            var totalResolved = ++this._totalResolved;
            if (totalResolved >= length) {
              if (preservedValues !== null) {
                this._filter(values, preservedValues);
              } else {
                this._resolve(values);
              }
              return true;
            }
            return false;
          };
          MappingPromiseArray.prototype._drainQueue = function() {
            var queue = this._queue;
            var limit = this._limit;
            var values = this._values;
            while (queue.length > 0 && this._inFlight < limit) {
              if (this._isResolved())
                return;
              var index = queue.pop();
              this._promiseFulfilled(values[index], index);
            }
          };
          MappingPromiseArray.prototype._filter = function(booleans, values) {
            var len = values.length;
            var ret2 = new Array(len);
            var j3 = 0;
            for (var i3 = 0; i3 < len; ++i3) {
              if (booleans[i3])
                ret2[j3++] = values[i3];
            }
            ret2.length = j3;
            this._resolve(ret2);
          };
          MappingPromiseArray.prototype.preservedValues = function() {
            return this._preservedValues;
          };
          function map3(promises, fn, options, _filter) {
            if (typeof fn !== "function") {
              return apiRejection("expecting a function but got " + util.classString(fn));
            }
            var limit = 0;
            if (options !== void 0) {
              if (typeof options === "object" && options !== null) {
                if (typeof options.concurrency !== "number") {
                  return Promise4.reject(new TypeError("'concurrency' must be a number but it is " + util.classString(options.concurrency)));
                }
                limit = options.concurrency;
              } else {
                return Promise4.reject(new TypeError("options argument must be an object but it is " + util.classString(options)));
              }
            }
            limit = typeof limit === "number" && isFinite(limit) && limit >= 1 ? limit : 0;
            return new MappingPromiseArray(promises, fn, limit, _filter).promise();
          }
          Promise4.prototype.map = function(fn, options) {
            return map3(this, fn, options, null);
          };
          Promise4.map = function(promises, fn, options, _filter) {
            return map3(promises, fn, options, _filter);
          };
        };
      }, { "./util": 36 }], 19: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4, INTERNAL, tryConvertToPromise, apiRejection, debug) {
          var util = _dereq_2("./util");
          var tryCatch2 = util.tryCatch;
          Promise4.method = function(fn) {
            if (typeof fn !== "function") {
              throw new Promise4.TypeError("expecting a function but got " + util.classString(fn));
            }
            return function() {
              var ret2 = new Promise4(INTERNAL);
              ret2._captureStackTrace();
              ret2._pushContext();
              var value = tryCatch2(fn).apply(this, arguments);
              var promiseCreated = ret2._popContext();
              debug.checkForgottenReturns(value, promiseCreated, "Promise.method", ret2);
              ret2._resolveFromSyncValue(value);
              return ret2;
            };
          };
          Promise4.attempt = Promise4["try"] = function(fn) {
            if (typeof fn !== "function") {
              return apiRejection("expecting a function but got " + util.classString(fn));
            }
            var ret2 = new Promise4(INTERNAL);
            ret2._captureStackTrace();
            ret2._pushContext();
            var value;
            if (arguments.length > 1) {
              debug.deprecated("calling Promise.try with more than 1 argument");
              var arg = arguments[1];
              var ctx = arguments[2];
              value = util.isArray(arg) ? tryCatch2(fn).apply(ctx, arg) : tryCatch2(fn).call(ctx, arg);
            } else {
              value = tryCatch2(fn)();
            }
            var promiseCreated = ret2._popContext();
            debug.checkForgottenReturns(value, promiseCreated, "Promise.try", ret2);
            ret2._resolveFromSyncValue(value);
            return ret2;
          };
          Promise4.prototype._resolveFromSyncValue = function(value) {
            if (value === util.errorObj) {
              this._rejectCallback(value.e, false);
            } else {
              this._resolveCallback(value, true);
            }
          };
        };
      }, { "./util": 36 }], 20: [function(_dereq_2, module2, exports2) {
        "use strict";
        var util = _dereq_2("./util");
        var maybeWrapAsError2 = util.maybeWrapAsError;
        var errors = _dereq_2("./errors");
        var OperationalError = errors.OperationalError;
        var es52 = _dereq_2("./es5");
        function isUntypedError(obj2) {
          return obj2 instanceof Error && es52.getPrototypeOf(obj2) === Error.prototype;
        }
        var rErrorKey = /^(?:name|message|stack|cause)$/;
        function wrapAsOperationalError(obj2) {
          var ret2;
          if (isUntypedError(obj2)) {
            ret2 = new OperationalError(obj2);
            ret2.name = obj2.name;
            ret2.message = obj2.message;
            ret2.stack = obj2.stack;
            var keys = es52.keys(obj2);
            for (var i3 = 0; i3 < keys.length; ++i3) {
              var key2 = keys[i3];
              if (!rErrorKey.test(key2)) {
                ret2[key2] = obj2[key2];
              }
            }
            return ret2;
          }
          util.markAsOriginatingFromRejection(obj2);
          return obj2;
        }
        function nodebackForPromise(promise, multiArgs) {
          return function(err, value) {
            if (promise === null)
              return;
            if (err) {
              var wrapped = wrapAsOperationalError(maybeWrapAsError2(err));
              promise._attachExtraTrace(wrapped);
              promise._reject(wrapped);
            } else if (!multiArgs) {
              promise._fulfill(value);
            } else {
              var args = [].slice.call(arguments, 1);
              ;
              promise._fulfill(args);
            }
            promise = null;
          };
        }
        module2.exports = nodebackForPromise;
      }, { "./errors": 12, "./es5": 13, "./util": 36 }], 21: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4) {
          var util = _dereq_2("./util");
          var async = Promise4._async;
          var tryCatch2 = util.tryCatch;
          var errorObj2 = util.errorObj;
          function spreadAdapter(val, nodeback) {
            var promise = this;
            if (!util.isArray(val))
              return successAdapter.call(promise, val, nodeback);
            var ret2 = tryCatch2(nodeback).apply(promise._boundValue(), [null].concat(val));
            if (ret2 === errorObj2) {
              async.throwLater(ret2.e);
            }
          }
          function successAdapter(val, nodeback) {
            var promise = this;
            var receiver2 = promise._boundValue();
            var ret2 = val === void 0 ? tryCatch2(nodeback).call(receiver2, null) : tryCatch2(nodeback).call(receiver2, null, val);
            if (ret2 === errorObj2) {
              async.throwLater(ret2.e);
            }
          }
          function errorAdapter(reason, nodeback) {
            var promise = this;
            if (!reason) {
              var newReason = new Error(reason + "");
              newReason.cause = reason;
              reason = newReason;
            }
            var ret2 = tryCatch2(nodeback).call(promise._boundValue(), reason);
            if (ret2 === errorObj2) {
              async.throwLater(ret2.e);
            }
          }
          Promise4.prototype.asCallback = Promise4.prototype.nodeify = function(nodeback, options) {
            if (typeof nodeback == "function") {
              var adapter = successAdapter;
              if (options !== void 0 && Object(options).spread) {
                adapter = spreadAdapter;
              }
              this._then(adapter, errorAdapter, void 0, this, nodeback);
            }
            return this;
          };
        };
      }, { "./util": 36 }], 22: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function() {
          var makeSelfResolutionError = function() {
            return new TypeError2("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");
          };
          var reflectHandler2 = function() {
            return new Promise4.PromiseInspection(this._target());
          };
          var apiRejection = function(msg) {
            return Promise4.reject(new TypeError2(msg));
          };
          function Proxyable() {
          }
          var UNDEFINED_BINDING = {};
          var util = _dereq_2("./util");
          util.setReflectHandler(reflectHandler2);
          var getDomain = function() {
            var domain = process.domain;
            if (domain === void 0) {
              return null;
            }
            return domain;
          };
          var getContextDefault = function() {
            return null;
          };
          var getContextDomain = function() {
            return {
              domain: getDomain(),
              async: null
            };
          };
          var AsyncResource = util.isNode && util.nodeSupportsAsyncResource ? _dereq_2("async_hooks").AsyncResource : null;
          var getContextAsyncHooks = function() {
            return {
              domain: getDomain(),
              async: new AsyncResource("Bluebird::Promise")
            };
          };
          var getContext = util.isNode ? getContextDomain : getContextDefault;
          util.notEnumerableProp(Promise4, "_getContext", getContext);
          var enableAsyncHooks = function() {
            getContext = getContextAsyncHooks;
            util.notEnumerableProp(Promise4, "_getContext", getContextAsyncHooks);
          };
          var disableAsyncHooks = function() {
            getContext = getContextDomain;
            util.notEnumerableProp(Promise4, "_getContext", getContextDomain);
          };
          var es52 = _dereq_2("./es5");
          var Async = _dereq_2("./async");
          var async = new Async();
          es52.defineProperty(Promise4, "_async", { value: async });
          var errors = _dereq_2("./errors");
          var TypeError2 = Promise4.TypeError = errors.TypeError;
          Promise4.RangeError = errors.RangeError;
          var CancellationError = Promise4.CancellationError = errors.CancellationError;
          Promise4.TimeoutError = errors.TimeoutError;
          Promise4.OperationalError = errors.OperationalError;
          Promise4.RejectionError = errors.OperationalError;
          Promise4.AggregateError = errors.AggregateError;
          var INTERNAL = function() {
          };
          var APPLY = {};
          var NEXT_FILTER = {};
          var tryConvertToPromise = _dereq_2("./thenables")(Promise4, INTERNAL);
          var PromiseArray = _dereq_2("./promise_array")(Promise4, INTERNAL, tryConvertToPromise, apiRejection, Proxyable);
          var Context = _dereq_2("./context")(Promise4);
          var createContext = Context.create;
          var debug = _dereq_2("./debuggability")(Promise4, Context, enableAsyncHooks, disableAsyncHooks);
          var CapturedTrace = debug.CapturedTrace;
          var PassThroughHandlerContext = _dereq_2("./finally")(Promise4, tryConvertToPromise, NEXT_FILTER);
          var catchFilter = _dereq_2("./catch_filter")(NEXT_FILTER);
          var nodebackForPromise = _dereq_2("./nodeback");
          var errorObj2 = util.errorObj;
          var tryCatch2 = util.tryCatch;
          function check(self2, executor) {
            if (self2 == null || self2.constructor !== Promise4) {
              throw new TypeError2("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");
            }
            if (typeof executor !== "function") {
              throw new TypeError2("expecting a function but got " + util.classString(executor));
            }
          }
          function Promise4(executor) {
            if (executor !== INTERNAL) {
              check(this, executor);
            }
            this._bitField = 0;
            this._fulfillmentHandler0 = void 0;
            this._rejectionHandler0 = void 0;
            this._promise0 = void 0;
            this._receiver0 = void 0;
            this._resolveFromExecutor(executor);
            this._promiseCreated();
            this._fireEvent("promiseCreated", this);
          }
          Promise4.prototype.toString = function() {
            return "[object Promise]";
          };
          Promise4.prototype.caught = Promise4.prototype["catch"] = function(fn) {
            var len = arguments.length;
            if (len > 1) {
              var catchInstances = new Array(len - 1), j3 = 0, i3;
              for (i3 = 0; i3 < len - 1; ++i3) {
                var item = arguments[i3];
                if (util.isObject(item)) {
                  catchInstances[j3++] = item;
                } else {
                  return apiRejection("Catch statement predicate: expecting an object but got " + util.classString(item));
                }
              }
              catchInstances.length = j3;
              fn = arguments[i3];
              if (typeof fn !== "function") {
                throw new TypeError2("The last argument to .catch() must be a function, got " + util.toString(fn));
              }
              return this.then(void 0, catchFilter(catchInstances, fn, this));
            }
            return this.then(void 0, fn);
          };
          Promise4.prototype.reflect = function() {
            return this._then(reflectHandler2, reflectHandler2, void 0, this, void 0);
          };
          Promise4.prototype.then = function(didFulfill, didReject) {
            if (debug.warnings() && arguments.length > 0 && typeof didFulfill !== "function" && typeof didReject !== "function") {
              var msg = ".then() only accepts functions but was passed: " + util.classString(didFulfill);
              if (arguments.length > 1) {
                msg += ", " + util.classString(didReject);
              }
              this._warn(msg);
            }
            return this._then(didFulfill, didReject, void 0, void 0, void 0);
          };
          Promise4.prototype.done = function(didFulfill, didReject) {
            var promise = this._then(didFulfill, didReject, void 0, void 0, void 0);
            promise._setIsFinal();
          };
          Promise4.prototype.spread = function(fn) {
            if (typeof fn !== "function") {
              return apiRejection("expecting a function but got " + util.classString(fn));
            }
            return this.all()._then(fn, void 0, void 0, APPLY, void 0);
          };
          Promise4.prototype.toJSON = function() {
            var ret2 = {
              isFulfilled: false,
              isRejected: false,
              fulfillmentValue: void 0,
              rejectionReason: void 0
            };
            if (this.isFulfilled()) {
              ret2.fulfillmentValue = this.value();
              ret2.isFulfilled = true;
            } else if (this.isRejected()) {
              ret2.rejectionReason = this.reason();
              ret2.isRejected = true;
            }
            return ret2;
          };
          Promise4.prototype.all = function() {
            if (arguments.length > 0) {
              this._warn(".all() was passed arguments but it does not take any");
            }
            return new PromiseArray(this).promise();
          };
          Promise4.prototype.error = function(fn) {
            return this.caught(util.originatesFromRejection, fn);
          };
          Promise4.getNewLibraryCopy = module2.exports;
          Promise4.is = function(val) {
            return val instanceof Promise4;
          };
          Promise4.fromNode = Promise4.fromCallback = function(fn) {
            var ret2 = new Promise4(INTERNAL);
            ret2._captureStackTrace();
            var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs : false;
            var result = tryCatch2(fn)(nodebackForPromise(ret2, multiArgs));
            if (result === errorObj2) {
              ret2._rejectCallback(result.e, true);
            }
            if (!ret2._isFateSealed())
              ret2._setAsyncGuaranteed();
            return ret2;
          };
          Promise4.all = function(promises) {
            return new PromiseArray(promises).promise();
          };
          Promise4.cast = function(obj2) {
            var ret2 = tryConvertToPromise(obj2);
            if (!(ret2 instanceof Promise4)) {
              ret2 = new Promise4(INTERNAL);
              ret2._captureStackTrace();
              ret2._setFulfilled();
              ret2._rejectionHandler0 = obj2;
            }
            return ret2;
          };
          Promise4.resolve = Promise4.fulfilled = Promise4.cast;
          Promise4.reject = Promise4.rejected = function(reason) {
            var ret2 = new Promise4(INTERNAL);
            ret2._captureStackTrace();
            ret2._rejectCallback(reason, true);
            return ret2;
          };
          Promise4.setScheduler = function(fn) {
            if (typeof fn !== "function") {
              throw new TypeError2("expecting a function but got " + util.classString(fn));
            }
            return async.setScheduler(fn);
          };
          Promise4.prototype._then = function(didFulfill, didReject, _2, receiver2, internalData) {
            var haveInternalData = internalData !== void 0;
            var promise = haveInternalData ? internalData : new Promise4(INTERNAL);
            var target = this._target();
            var bitField = target._bitField;
            if (!haveInternalData) {
              promise._propagateFrom(this, 3);
              promise._captureStackTrace();
              if (receiver2 === void 0 && (this._bitField & 2097152) !== 0) {
                if (!((bitField & 50397184) === 0)) {
                  receiver2 = this._boundValue();
                } else {
                  receiver2 = target === this ? void 0 : this._boundTo;
                }
              }
              this._fireEvent("promiseChained", this, promise);
            }
            var context = getContext();
            if (!((bitField & 50397184) === 0)) {
              var handler, value, settler = target._settlePromiseCtx;
              if ((bitField & 33554432) !== 0) {
                value = target._rejectionHandler0;
                handler = didFulfill;
              } else if ((bitField & 16777216) !== 0) {
                value = target._fulfillmentHandler0;
                handler = didReject;
                target._unsetRejectionIsUnhandled();
              } else {
                settler = target._settlePromiseLateCancellationObserver;
                value = new CancellationError("late cancellation observer");
                target._attachExtraTrace(value);
                handler = didReject;
              }
              async.invoke(settler, target, {
                handler: util.contextBind(context, handler),
                promise,
                receiver: receiver2,
                value
              });
            } else {
              target._addCallbacks(didFulfill, didReject, promise, receiver2, context);
            }
            return promise;
          };
          Promise4.prototype._length = function() {
            return this._bitField & 65535;
          };
          Promise4.prototype._isFateSealed = function() {
            return (this._bitField & 117506048) !== 0;
          };
          Promise4.prototype._isFollowing = function() {
            return (this._bitField & 67108864) === 67108864;
          };
          Promise4.prototype._setLength = function(len) {
            this._bitField = this._bitField & -65536 | len & 65535;
          };
          Promise4.prototype._setFulfilled = function() {
            this._bitField = this._bitField | 33554432;
            this._fireEvent("promiseFulfilled", this);
          };
          Promise4.prototype._setRejected = function() {
            this._bitField = this._bitField | 16777216;
            this._fireEvent("promiseRejected", this);
          };
          Promise4.prototype._setFollowing = function() {
            this._bitField = this._bitField | 67108864;
            this._fireEvent("promiseResolved", this);
          };
          Promise4.prototype._setIsFinal = function() {
            this._bitField = this._bitField | 4194304;
          };
          Promise4.prototype._isFinal = function() {
            return (this._bitField & 4194304) > 0;
          };
          Promise4.prototype._unsetCancelled = function() {
            this._bitField = this._bitField & ~65536;
          };
          Promise4.prototype._setCancelled = function() {
            this._bitField = this._bitField | 65536;
            this._fireEvent("promiseCancelled", this);
          };
          Promise4.prototype._setWillBeCancelled = function() {
            this._bitField = this._bitField | 8388608;
          };
          Promise4.prototype._setAsyncGuaranteed = function() {
            if (async.hasCustomScheduler())
              return;
            var bitField = this._bitField;
            this._bitField = bitField | (bitField & 536870912) >> 2 ^ 134217728;
          };
          Promise4.prototype._setNoAsyncGuarantee = function() {
            this._bitField = (this._bitField | 536870912) & ~134217728;
          };
          Promise4.prototype._receiverAt = function(index) {
            var ret2 = index === 0 ? this._receiver0 : this[index * 4 - 4 + 3];
            if (ret2 === UNDEFINED_BINDING) {
              return void 0;
            } else if (ret2 === void 0 && this._isBound()) {
              return this._boundValue();
            }
            return ret2;
          };
          Promise4.prototype._promiseAt = function(index) {
            return this[index * 4 - 4 + 2];
          };
          Promise4.prototype._fulfillmentHandlerAt = function(index) {
            return this[index * 4 - 4 + 0];
          };
          Promise4.prototype._rejectionHandlerAt = function(index) {
            return this[index * 4 - 4 + 1];
          };
          Promise4.prototype._boundValue = function() {
          };
          Promise4.prototype._migrateCallback0 = function(follower) {
            var bitField = follower._bitField;
            var fulfill = follower._fulfillmentHandler0;
            var reject = follower._rejectionHandler0;
            var promise = follower._promise0;
            var receiver2 = follower._receiverAt(0);
            if (receiver2 === void 0)
              receiver2 = UNDEFINED_BINDING;
            this._addCallbacks(fulfill, reject, promise, receiver2, null);
          };
          Promise4.prototype._migrateCallbackAt = function(follower, index) {
            var fulfill = follower._fulfillmentHandlerAt(index);
            var reject = follower._rejectionHandlerAt(index);
            var promise = follower._promiseAt(index);
            var receiver2 = follower._receiverAt(index);
            if (receiver2 === void 0)
              receiver2 = UNDEFINED_BINDING;
            this._addCallbacks(fulfill, reject, promise, receiver2, null);
          };
          Promise4.prototype._addCallbacks = function(fulfill, reject, promise, receiver2, context) {
            var index = this._length();
            if (index >= 65535 - 4) {
              index = 0;
              this._setLength(0);
            }
            if (index === 0) {
              this._promise0 = promise;
              this._receiver0 = receiver2;
              if (typeof fulfill === "function") {
                this._fulfillmentHandler0 = util.contextBind(context, fulfill);
              }
              if (typeof reject === "function") {
                this._rejectionHandler0 = util.contextBind(context, reject);
              }
            } else {
              var base2 = index * 4 - 4;
              this[base2 + 2] = promise;
              this[base2 + 3] = receiver2;
              if (typeof fulfill === "function") {
                this[base2 + 0] = util.contextBind(context, fulfill);
              }
              if (typeof reject === "function") {
                this[base2 + 1] = util.contextBind(context, reject);
              }
            }
            this._setLength(index + 1);
            return index;
          };
          Promise4.prototype._proxy = function(proxyable, arg) {
            this._addCallbacks(void 0, void 0, arg, proxyable, null);
          };
          Promise4.prototype._resolveCallback = function(value, shouldBind) {
            if ((this._bitField & 117506048) !== 0)
              return;
            if (value === this)
              return this._rejectCallback(makeSelfResolutionError(), false);
            var maybePromise = tryConvertToPromise(value, this);
            if (!(maybePromise instanceof Promise4))
              return this._fulfill(value);
            if (shouldBind)
              this._propagateFrom(maybePromise, 2);
            var promise = maybePromise._target();
            if (promise === this) {
              this._reject(makeSelfResolutionError());
              return;
            }
            var bitField = promise._bitField;
            if ((bitField & 50397184) === 0) {
              var len = this._length();
              if (len > 0)
                promise._migrateCallback0(this);
              for (var i3 = 1; i3 < len; ++i3) {
                promise._migrateCallbackAt(this, i3);
              }
              this._setFollowing();
              this._setLength(0);
              this._setFollowee(maybePromise);
            } else if ((bitField & 33554432) !== 0) {
              this._fulfill(promise._value());
            } else if ((bitField & 16777216) !== 0) {
              this._reject(promise._reason());
            } else {
              var reason = new CancellationError("late cancellation observer");
              promise._attachExtraTrace(reason);
              this._reject(reason);
            }
          };
          Promise4.prototype._rejectCallback = function(reason, synchronous, ignoreNonErrorWarnings) {
            var trace = util.ensureErrorObject(reason);
            var hasStack = trace === reason;
            if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
              var message = "a promise was rejected with a non-error: " + util.classString(reason);
              this._warn(message, true);
            }
            this._attachExtraTrace(trace, synchronous ? hasStack : false);
            this._reject(reason);
          };
          Promise4.prototype._resolveFromExecutor = function(executor) {
            if (executor === INTERNAL)
              return;
            var promise = this;
            this._captureStackTrace();
            this._pushContext();
            var synchronous = true;
            var r3 = this._execute(executor, function(value) {
              promise._resolveCallback(value);
            }, function(reason) {
              promise._rejectCallback(reason, synchronous);
            });
            synchronous = false;
            this._popContext();
            if (r3 !== void 0) {
              promise._rejectCallback(r3, true);
            }
          };
          Promise4.prototype._settlePromiseFromHandler = function(handler, receiver2, value, promise) {
            var bitField = promise._bitField;
            if ((bitField & 65536) !== 0)
              return;
            promise._pushContext();
            var x3;
            if (receiver2 === APPLY) {
              if (!value || typeof value.length !== "number") {
                x3 = errorObj2;
                x3.e = new TypeError2("cannot .spread() a non-array: " + util.classString(value));
              } else {
                x3 = tryCatch2(handler).apply(this._boundValue(), value);
              }
            } else {
              x3 = tryCatch2(handler).call(receiver2, value);
            }
            var promiseCreated = promise._popContext();
            bitField = promise._bitField;
            if ((bitField & 65536) !== 0)
              return;
            if (x3 === NEXT_FILTER) {
              promise._reject(value);
            } else if (x3 === errorObj2) {
              promise._rejectCallback(x3.e, false);
            } else {
              debug.checkForgottenReturns(x3, promiseCreated, "", promise, this);
              promise._resolveCallback(x3);
            }
          };
          Promise4.prototype._target = function() {
            var ret2 = this;
            while (ret2._isFollowing())
              ret2 = ret2._followee();
            return ret2;
          };
          Promise4.prototype._followee = function() {
            return this._rejectionHandler0;
          };
          Promise4.prototype._setFollowee = function(promise) {
            this._rejectionHandler0 = promise;
          };
          Promise4.prototype._settlePromise = function(promise, handler, receiver2, value) {
            var isPromise = promise instanceof Promise4;
            var bitField = this._bitField;
            var asyncGuaranteed = (bitField & 134217728) !== 0;
            if ((bitField & 65536) !== 0) {
              if (isPromise)
                promise._invokeInternalOnCancel();
              if (receiver2 instanceof PassThroughHandlerContext && receiver2.isFinallyHandler()) {
                receiver2.cancelPromise = promise;
                if (tryCatch2(handler).call(receiver2, value) === errorObj2) {
                  promise._reject(errorObj2.e);
                }
              } else if (handler === reflectHandler2) {
                promise._fulfill(reflectHandler2.call(receiver2));
              } else if (receiver2 instanceof Proxyable) {
                receiver2._promiseCancelled(promise);
              } else if (isPromise || promise instanceof PromiseArray) {
                promise._cancel();
              } else {
                receiver2.cancel();
              }
            } else if (typeof handler === "function") {
              if (!isPromise) {
                handler.call(receiver2, value, promise);
              } else {
                if (asyncGuaranteed)
                  promise._setAsyncGuaranteed();
                this._settlePromiseFromHandler(handler, receiver2, value, promise);
              }
            } else if (receiver2 instanceof Proxyable) {
              if (!receiver2._isResolved()) {
                if ((bitField & 33554432) !== 0) {
                  receiver2._promiseFulfilled(value, promise);
                } else {
                  receiver2._promiseRejected(value, promise);
                }
              }
            } else if (isPromise) {
              if (asyncGuaranteed)
                promise._setAsyncGuaranteed();
              if ((bitField & 33554432) !== 0) {
                promise._fulfill(value);
              } else {
                promise._reject(value);
              }
            }
          };
          Promise4.prototype._settlePromiseLateCancellationObserver = function(ctx) {
            var handler = ctx.handler;
            var promise = ctx.promise;
            var receiver2 = ctx.receiver;
            var value = ctx.value;
            if (typeof handler === "function") {
              if (!(promise instanceof Promise4)) {
                handler.call(receiver2, value, promise);
              } else {
                this._settlePromiseFromHandler(handler, receiver2, value, promise);
              }
            } else if (promise instanceof Promise4) {
              promise._reject(value);
            }
          };
          Promise4.prototype._settlePromiseCtx = function(ctx) {
            this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
          };
          Promise4.prototype._settlePromise0 = function(handler, value, bitField) {
            var promise = this._promise0;
            var receiver2 = this._receiverAt(0);
            this._promise0 = void 0;
            this._receiver0 = void 0;
            this._settlePromise(promise, handler, receiver2, value);
          };
          Promise4.prototype._clearCallbackDataAtIndex = function(index) {
            var base2 = index * 4 - 4;
            this[base2 + 2] = this[base2 + 3] = this[base2 + 0] = this[base2 + 1] = void 0;
          };
          Promise4.prototype._fulfill = function(value) {
            var bitField = this._bitField;
            if ((bitField & 117506048) >>> 16)
              return;
            if (value === this) {
              var err = makeSelfResolutionError();
              this._attachExtraTrace(err);
              return this._reject(err);
            }
            this._setFulfilled();
            this._rejectionHandler0 = value;
            if ((bitField & 65535) > 0) {
              if ((bitField & 134217728) !== 0) {
                this._settlePromises();
              } else {
                async.settlePromises(this);
              }
              this._dereferenceTrace();
            }
          };
          Promise4.prototype._reject = function(reason) {
            var bitField = this._bitField;
            if ((bitField & 117506048) >>> 16)
              return;
            this._setRejected();
            this._fulfillmentHandler0 = reason;
            if (this._isFinal()) {
              return async.fatalError(reason, util.isNode);
            }
            if ((bitField & 65535) > 0) {
              async.settlePromises(this);
            } else {
              this._ensurePossibleRejectionHandled();
            }
          };
          Promise4.prototype._fulfillPromises = function(len, value) {
            for (var i3 = 1; i3 < len; i3++) {
              var handler = this._fulfillmentHandlerAt(i3);
              var promise = this._promiseAt(i3);
              var receiver2 = this._receiverAt(i3);
              this._clearCallbackDataAtIndex(i3);
              this._settlePromise(promise, handler, receiver2, value);
            }
          };
          Promise4.prototype._rejectPromises = function(len, reason) {
            for (var i3 = 1; i3 < len; i3++) {
              var handler = this._rejectionHandlerAt(i3);
              var promise = this._promiseAt(i3);
              var receiver2 = this._receiverAt(i3);
              this._clearCallbackDataAtIndex(i3);
              this._settlePromise(promise, handler, receiver2, reason);
            }
          };
          Promise4.prototype._settlePromises = function() {
            var bitField = this._bitField;
            var len = bitField & 65535;
            if (len > 0) {
              if ((bitField & 16842752) !== 0) {
                var reason = this._fulfillmentHandler0;
                this._settlePromise0(this._rejectionHandler0, reason, bitField);
                this._rejectPromises(len, reason);
              } else {
                var value = this._rejectionHandler0;
                this._settlePromise0(this._fulfillmentHandler0, value, bitField);
                this._fulfillPromises(len, value);
              }
              this._setLength(0);
            }
            this._clearCancellationData();
          };
          Promise4.prototype._settledValue = function() {
            var bitField = this._bitField;
            if ((bitField & 33554432) !== 0) {
              return this._rejectionHandler0;
            } else if ((bitField & 16777216) !== 0) {
              return this._fulfillmentHandler0;
            }
          };
          if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            es52.defineProperty(Promise4.prototype, Symbol.toStringTag, {
              get: function() {
                return "Object";
              }
            });
          }
          function deferResolve(v3) {
            this.promise._resolveCallback(v3);
          }
          function deferReject(v3) {
            this.promise._rejectCallback(v3, false);
          }
          Promise4.defer = Promise4.pending = function() {
            debug.deprecated("Promise.defer", "new Promise");
            var promise = new Promise4(INTERNAL);
            return {
              promise,
              resolve: deferResolve,
              reject: deferReject
            };
          };
          util.notEnumerableProp(Promise4, "_makeSelfResolutionError", makeSelfResolutionError);
          _dereq_2("./method")(Promise4, INTERNAL, tryConvertToPromise, apiRejection, debug);
          _dereq_2("./bind")(Promise4, INTERNAL, tryConvertToPromise, debug);
          _dereq_2("./cancel")(Promise4, PromiseArray, apiRejection, debug);
          _dereq_2("./direct_resolve")(Promise4);
          _dereq_2("./synchronous_inspection")(Promise4);
          _dereq_2("./join")(Promise4, PromiseArray, tryConvertToPromise, INTERNAL, async);
          Promise4.Promise = Promise4;
          Promise4.version = "3.7.2";
          _dereq_2("./call_get.js")(Promise4);
          _dereq_2("./generators.js")(Promise4, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
          _dereq_2("./map.js")(Promise4, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
          _dereq_2("./nodeify.js")(Promise4);
          _dereq_2("./promisify.js")(Promise4, INTERNAL);
          _dereq_2("./props.js")(Promise4, PromiseArray, tryConvertToPromise, apiRejection);
          _dereq_2("./race.js")(Promise4, INTERNAL, tryConvertToPromise, apiRejection);
          _dereq_2("./reduce.js")(Promise4, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
          _dereq_2("./settle.js")(Promise4, PromiseArray, debug);
          _dereq_2("./some.js")(Promise4, PromiseArray, apiRejection);
          _dereq_2("./timers.js")(Promise4, INTERNAL, debug);
          _dereq_2("./using.js")(Promise4, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
          _dereq_2("./any.js")(Promise4);
          _dereq_2("./each.js")(Promise4, INTERNAL);
          _dereq_2("./filter.js")(Promise4, INTERNAL);
          util.toFastProperties(Promise4);
          util.toFastProperties(Promise4.prototype);
          function fillTypes(value) {
            var p2 = new Promise4(INTERNAL);
            p2._fulfillmentHandler0 = value;
            p2._rejectionHandler0 = value;
            p2._promise0 = value;
            p2._receiver0 = value;
          }
          fillTypes({ a: 1 });
          fillTypes({ b: 2 });
          fillTypes({ c: 3 });
          fillTypes(1);
          fillTypes(function() {
          });
          fillTypes(void 0);
          fillTypes(false);
          fillTypes(new Promise4(INTERNAL));
          debug.setBounds(Async.firstLineError, util.lastLineError);
          return Promise4;
        };
      }, { "./any.js": 1, "./async": 2, "./bind": 3, "./call_get.js": 5, "./cancel": 6, "./catch_filter": 7, "./context": 8, "./debuggability": 9, "./direct_resolve": 10, "./each.js": 11, "./errors": 12, "./es5": 13, "./filter.js": 14, "./finally": 15, "./generators.js": 16, "./join": 17, "./map.js": 18, "./method": 19, "./nodeback": 20, "./nodeify.js": 21, "./promise_array": 23, "./promisify.js": 24, "./props.js": 25, "./race.js": 27, "./reduce.js": 28, "./settle.js": 30, "./some.js": 31, "./synchronous_inspection": 32, "./thenables": 33, "./timers.js": 34, "./using.js": 35, "./util": 36, "async_hooks": void 0 }], 23: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4, INTERNAL, tryConvertToPromise, apiRejection, Proxyable) {
          var util = _dereq_2("./util");
          var isArray = util.isArray;
          function toResolutionValue(val) {
            switch (val) {
              case -2:
                return [];
              case -3:
                return {};
              case -6:
                return new Map();
            }
          }
          function PromiseArray(values) {
            var promise = this._promise = new Promise4(INTERNAL);
            if (values instanceof Promise4) {
              promise._propagateFrom(values, 3);
              values.suppressUnhandledRejections();
            }
            promise._setOnCancel(this);
            this._values = values;
            this._length = 0;
            this._totalResolved = 0;
            this._init(void 0, -2);
          }
          util.inherits(PromiseArray, Proxyable);
          PromiseArray.prototype.length = function() {
            return this._length;
          };
          PromiseArray.prototype.promise = function() {
            return this._promise;
          };
          PromiseArray.prototype._init = function init2(_2, resolveValueIfEmpty) {
            var values = tryConvertToPromise(this._values, this._promise);
            if (values instanceof Promise4) {
              values = values._target();
              var bitField = values._bitField;
              ;
              this._values = values;
              if ((bitField & 50397184) === 0) {
                this._promise._setAsyncGuaranteed();
                return values._then(init2, this._reject, void 0, this, resolveValueIfEmpty);
              } else if ((bitField & 33554432) !== 0) {
                values = values._value();
              } else if ((bitField & 16777216) !== 0) {
                return this._reject(values._reason());
              } else {
                return this._cancel();
              }
            }
            values = util.asArray(values);
            if (values === null) {
              var err = apiRejection("expecting an array or an iterable object but got " + util.classString(values)).reason();
              this._promise._rejectCallback(err, false);
              return;
            }
            if (values.length === 0) {
              if (resolveValueIfEmpty === -5) {
                this._resolveEmptyArray();
              } else {
                this._resolve(toResolutionValue(resolveValueIfEmpty));
              }
              return;
            }
            this._iterate(values);
          };
          PromiseArray.prototype._iterate = function(values) {
            var len = this.getActualLength(values.length);
            this._length = len;
            this._values = this.shouldCopyValues() ? new Array(len) : this._values;
            var result = this._promise;
            var isResolved = false;
            var bitField = null;
            for (var i3 = 0; i3 < len; ++i3) {
              var maybePromise = tryConvertToPromise(values[i3], result);
              if (maybePromise instanceof Promise4) {
                maybePromise = maybePromise._target();
                bitField = maybePromise._bitField;
              } else {
                bitField = null;
              }
              if (isResolved) {
                if (bitField !== null) {
                  maybePromise.suppressUnhandledRejections();
                }
              } else if (bitField !== null) {
                if ((bitField & 50397184) === 0) {
                  maybePromise._proxy(this, i3);
                  this._values[i3] = maybePromise;
                } else if ((bitField & 33554432) !== 0) {
                  isResolved = this._promiseFulfilled(maybePromise._value(), i3);
                } else if ((bitField & 16777216) !== 0) {
                  isResolved = this._promiseRejected(maybePromise._reason(), i3);
                } else {
                  isResolved = this._promiseCancelled(i3);
                }
              } else {
                isResolved = this._promiseFulfilled(maybePromise, i3);
              }
            }
            if (!isResolved)
              result._setAsyncGuaranteed();
          };
          PromiseArray.prototype._isResolved = function() {
            return this._values === null;
          };
          PromiseArray.prototype._resolve = function(value) {
            this._values = null;
            this._promise._fulfill(value);
          };
          PromiseArray.prototype._cancel = function() {
            if (this._isResolved() || !this._promise._isCancellable())
              return;
            this._values = null;
            this._promise._cancel();
          };
          PromiseArray.prototype._reject = function(reason) {
            this._values = null;
            this._promise._rejectCallback(reason, false);
          };
          PromiseArray.prototype._promiseFulfilled = function(value, index) {
            this._values[index] = value;
            var totalResolved = ++this._totalResolved;
            if (totalResolved >= this._length) {
              this._resolve(this._values);
              return true;
            }
            return false;
          };
          PromiseArray.prototype._promiseCancelled = function() {
            this._cancel();
            return true;
          };
          PromiseArray.prototype._promiseRejected = function(reason) {
            this._totalResolved++;
            this._reject(reason);
            return true;
          };
          PromiseArray.prototype._resultCancelled = function() {
            if (this._isResolved())
              return;
            var values = this._values;
            this._cancel();
            if (values instanceof Promise4) {
              values.cancel();
            } else {
              for (var i3 = 0; i3 < values.length; ++i3) {
                if (values[i3] instanceof Promise4) {
                  values[i3].cancel();
                }
              }
            }
          };
          PromiseArray.prototype.shouldCopyValues = function() {
            return true;
          };
          PromiseArray.prototype.getActualLength = function(len) {
            return len;
          };
          return PromiseArray;
        };
      }, { "./util": 36 }], 24: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4, INTERNAL) {
          var THIS = {};
          var util = _dereq_2("./util");
          var nodebackForPromise = _dereq_2("./nodeback");
          var withAppended2 = util.withAppended;
          var maybeWrapAsError2 = util.maybeWrapAsError;
          var canEvaluate2 = util.canEvaluate;
          var TypeError2 = _dereq_2("./errors").TypeError;
          var defaultSuffix = "Async";
          var defaultPromisified = { __isPromisified__: true };
          var noCopyProps = [
            "arity",
            "length",
            "name",
            "arguments",
            "caller",
            "callee",
            "prototype",
            "__isPromisified__"
          ];
          var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");
          var defaultFilter = function(name2) {
            return util.isIdentifier(name2) && name2.charAt(0) !== "_" && name2 !== "constructor";
          };
          function propsFilter(key2) {
            return !noCopyPropsPattern.test(key2);
          }
          function isPromisified(fn) {
            try {
              return fn.__isPromisified__ === true;
            } catch (e3) {
              return false;
            }
          }
          function hasPromisified(obj2, key2, suffix) {
            var val = util.getDataPropertyOrDefault(obj2, key2 + suffix, defaultPromisified);
            return val ? isPromisified(val) : false;
          }
          function checkValid(ret2, suffix, suffixRegexp) {
            for (var i3 = 0; i3 < ret2.length; i3 += 2) {
              var key2 = ret2[i3];
              if (suffixRegexp.test(key2)) {
                var keyWithoutAsyncSuffix = key2.replace(suffixRegexp, "");
                for (var j3 = 0; j3 < ret2.length; j3 += 2) {
                  if (ret2[j3] === keyWithoutAsyncSuffix) {
                    throw new TypeError2("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", suffix));
                  }
                }
              }
            }
          }
          function promisifiableMethods(obj2, suffix, suffixRegexp, filter2) {
            var keys = util.inheritedDataKeys(obj2);
            var ret2 = [];
            for (var i3 = 0; i3 < keys.length; ++i3) {
              var key2 = keys[i3];
              var value = obj2[key2];
              var passesDefaultFilter = filter2 === defaultFilter ? true : defaultFilter(key2, value, obj2);
              if (typeof value === "function" && !isPromisified(value) && !hasPromisified(obj2, key2, suffix) && filter2(key2, value, obj2, passesDefaultFilter)) {
                ret2.push(key2, value);
              }
            }
            checkValid(ret2, suffix, suffixRegexp);
            return ret2;
          }
          var escapeIdentRegex = function(str) {
            return str.replace(/([$])/, "\\$");
          };
          var makeNodePromisifiedEval;
          if (false) {
            var switchCaseArgumentOrder = function(likelyArgumentCount) {
              var ret2 = [likelyArgumentCount];
              var min = Math.max(0, likelyArgumentCount - 1 - 3);
              for (var i3 = likelyArgumentCount - 1; i3 >= min; --i3) {
                ret2.push(i3);
              }
              for (var i3 = likelyArgumentCount + 1; i3 <= 3; ++i3) {
                ret2.push(i3);
              }
              return ret2;
            };
            var argumentSequence = function(argumentCount) {
              return util.filledRange(argumentCount, "_arg", "");
            };
            var parameterDeclaration = function(parameterCount2) {
              return util.filledRange(Math.max(parameterCount2, 3), "_arg", "");
            };
            var parameterCount = function(fn) {
              if (typeof fn.length === "number") {
                return Math.max(Math.min(fn.length, 1023 + 1), 0);
              }
              return 0;
            };
            makeNodePromisifiedEval = function(callback, receiver2, originalName, fn, _2, multiArgs) {
              var newParameterCount = Math.max(0, parameterCount(fn) - 1);
              var argumentOrder = switchCaseArgumentOrder(newParameterCount);
              var shouldProxyThis = typeof callback === "string" || receiver2 === THIS;
              function generateCallForArgumentCount(count) {
                var args = argumentSequence(count).join(", ");
                var comma = count > 0 ? ", " : "";
                var ret2;
                if (shouldProxyThis) {
                  ret2 = "ret = callback.call(this, {{args}}, nodeback); break;\n";
                } else {
                  ret2 = receiver2 === void 0 ? "ret = callback({{args}}, nodeback); break;\n" : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
                }
                return ret2.replace("{{args}}", args).replace(", ", comma);
              }
              function generateArgumentSwitchCase() {
                var ret2 = "";
                for (var i3 = 0; i3 < argumentOrder.length; ++i3) {
                  ret2 += "case " + argumentOrder[i3] + ":" + generateCallForArgumentCount(argumentOrder[i3]);
                }
                ret2 += "                                                             \n        default:                                                             \n            var args = new Array(len + 1);                                   \n            var i = 0;                                                       \n            for (var i = 0; i < len; ++i) {                                  \n               args[i] = arguments[i];                                       \n            }                                                                \n            args[i] = nodeback;                                              \n            [CodeForCall]                                                    \n            break;                                                           \n        ".replace("[CodeForCall]", shouldProxyThis ? "ret = callback.apply(this, args);\n" : "ret = callback.apply(receiver, args);\n");
                return ret2;
              }
              var getFunctionCode = typeof callback === "string" ? "this != null ? this['" + callback + "'] : fn" : "fn";
              var body = "'use strict';                                                \n        var ret = function (Parameters) {                                    \n            'use strict';                                                    \n            var len = arguments.length;                                      \n            var promise = new Promise(INTERNAL);                             \n            promise._captureStackTrace();                                    \n            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n            var ret;                                                         \n            var callback = tryCatch([GetFunctionCode]);                      \n            switch(len) {                                                    \n                [CodeForSwitchCase]                                          \n            }                                                                \n            if (ret === errorObj) {                                          \n                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n            }                                                                \n            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n            return promise;                                                  \n        };                                                                   \n        notEnumerableProp(ret, '__isPromisified__', true);                   \n        return ret;                                                          \n    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase()).replace("[GetFunctionCode]", getFunctionCode);
              body = body.replace("Parameters", parameterDeclaration(newParameterCount));
              return new Function("Promise", "fn", "receiver", "withAppended", "maybeWrapAsError", "nodebackForPromise", "tryCatch", "errorObj", "notEnumerableProp", "INTERNAL", body)(Promise4, fn, receiver2, withAppended2, maybeWrapAsError2, nodebackForPromise, util.tryCatch, util.errorObj, util.notEnumerableProp, INTERNAL);
            };
          }
          function makeNodePromisifiedClosure(callback, receiver2, _2, fn, __, multiArgs) {
            var defaultThis = function() {
              return this;
            }();
            var method = callback;
            if (typeof method === "string") {
              callback = fn;
            }
            function promisified() {
              var _receiver = receiver2;
              if (receiver2 === THIS)
                _receiver = this;
              var promise = new Promise4(INTERNAL);
              promise._captureStackTrace();
              var cb = typeof method === "string" && this !== defaultThis ? this[method] : callback;
              var fn2 = nodebackForPromise(promise, multiArgs);
              try {
                cb.apply(_receiver, withAppended2(arguments, fn2));
              } catch (e3) {
                promise._rejectCallback(maybeWrapAsError2(e3), true, true);
              }
              if (!promise._isFateSealed())
                promise._setAsyncGuaranteed();
              return promise;
            }
            util.notEnumerableProp(promisified, "__isPromisified__", true);
            return promisified;
          }
          var makeNodePromisified = canEvaluate2 ? makeNodePromisifiedEval : makeNodePromisifiedClosure;
          function promisifyAll(obj2, suffix, filter2, promisifier, multiArgs) {
            var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
            var methods = promisifiableMethods(obj2, suffix, suffixRegexp, filter2);
            for (var i3 = 0, len = methods.length; i3 < len; i3 += 2) {
              var key2 = methods[i3];
              var fn = methods[i3 + 1];
              var promisifiedKey = key2 + suffix;
              if (promisifier === makeNodePromisified) {
                obj2[promisifiedKey] = makeNodePromisified(key2, THIS, key2, fn, suffix, multiArgs);
              } else {
                var promisified = promisifier(fn, function() {
                  return makeNodePromisified(key2, THIS, key2, fn, suffix, multiArgs);
                });
                util.notEnumerableProp(promisified, "__isPromisified__", true);
                obj2[promisifiedKey] = promisified;
              }
            }
            util.toFastProperties(obj2);
            return obj2;
          }
          function promisify(callback, receiver2, multiArgs) {
            return makeNodePromisified(callback, receiver2, void 0, callback, null, multiArgs);
          }
          Promise4.promisify = function(fn, options) {
            if (typeof fn !== "function") {
              throw new TypeError2("expecting a function but got " + util.classString(fn));
            }
            if (isPromisified(fn)) {
              return fn;
            }
            options = Object(options);
            var receiver2 = options.context === void 0 ? THIS : options.context;
            var multiArgs = !!options.multiArgs;
            var ret2 = promisify(fn, receiver2, multiArgs);
            util.copyDescriptors(fn, ret2, propsFilter);
            return ret2;
          };
          Promise4.promisifyAll = function(target, options) {
            if (typeof target !== "function" && typeof target !== "object") {
              throw new TypeError2("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
            }
            options = Object(options);
            var multiArgs = !!options.multiArgs;
            var suffix = options.suffix;
            if (typeof suffix !== "string")
              suffix = defaultSuffix;
            var filter2 = options.filter;
            if (typeof filter2 !== "function")
              filter2 = defaultFilter;
            var promisifier = options.promisifier;
            if (typeof promisifier !== "function")
              promisifier = makeNodePromisified;
            if (!util.isIdentifier(suffix)) {
              throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");
            }
            var keys = util.inheritedDataKeys(target);
            for (var i3 = 0; i3 < keys.length; ++i3) {
              var value = target[keys[i3]];
              if (keys[i3] !== "constructor" && util.isClass(value)) {
                promisifyAll(value.prototype, suffix, filter2, promisifier, multiArgs);
                promisifyAll(value, suffix, filter2, promisifier, multiArgs);
              }
            }
            return promisifyAll(target, suffix, filter2, promisifier, multiArgs);
          };
        };
      }, { "./errors": 12, "./nodeback": 20, "./util": 36 }], 25: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4, PromiseArray, tryConvertToPromise, apiRejection) {
          var util = _dereq_2("./util");
          var isObject2 = util.isObject;
          var es52 = _dereq_2("./es5");
          var Es6Map;
          if (typeof Map === "function")
            Es6Map = Map;
          var mapToEntries = function() {
            var index = 0;
            var size = 0;
            function extractEntry(value, key2) {
              this[index] = value;
              this[index + size] = key2;
              index++;
            }
            return function mapToEntries2(map3) {
              size = map3.size;
              index = 0;
              var ret2 = new Array(map3.size * 2);
              map3.forEach(extractEntry, ret2);
              return ret2;
            };
          }();
          var entriesToMap = function(entries) {
            var ret2 = new Es6Map();
            var length = entries.length / 2 | 0;
            for (var i3 = 0; i3 < length; ++i3) {
              var key2 = entries[length + i3];
              var value = entries[i3];
              ret2.set(key2, value);
            }
            return ret2;
          };
          function PropertiesPromiseArray(obj2) {
            var isMap = false;
            var entries;
            if (Es6Map !== void 0 && obj2 instanceof Es6Map) {
              entries = mapToEntries(obj2);
              isMap = true;
            } else {
              var keys = es52.keys(obj2);
              var len = keys.length;
              entries = new Array(len * 2);
              for (var i3 = 0; i3 < len; ++i3) {
                var key2 = keys[i3];
                entries[i3] = obj2[key2];
                entries[i3 + len] = key2;
              }
            }
            this.constructor$(entries);
            this._isMap = isMap;
            this._init$(void 0, isMap ? -6 : -3);
          }
          util.inherits(PropertiesPromiseArray, PromiseArray);
          PropertiesPromiseArray.prototype._init = function() {
          };
          PropertiesPromiseArray.prototype._promiseFulfilled = function(value, index) {
            this._values[index] = value;
            var totalResolved = ++this._totalResolved;
            if (totalResolved >= this._length) {
              var val;
              if (this._isMap) {
                val = entriesToMap(this._values);
              } else {
                val = {};
                var keyOffset = this.length();
                for (var i3 = 0, len = this.length(); i3 < len; ++i3) {
                  val[this._values[i3 + keyOffset]] = this._values[i3];
                }
              }
              this._resolve(val);
              return true;
            }
            return false;
          };
          PropertiesPromiseArray.prototype.shouldCopyValues = function() {
            return false;
          };
          PropertiesPromiseArray.prototype.getActualLength = function(len) {
            return len >> 1;
          };
          function props(promises) {
            var ret2;
            var castValue = tryConvertToPromise(promises);
            if (!isObject2(castValue)) {
              return apiRejection("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");
            } else if (castValue instanceof Promise4) {
              ret2 = castValue._then(Promise4.props, void 0, void 0, void 0, void 0);
            } else {
              ret2 = new PropertiesPromiseArray(castValue).promise();
            }
            if (castValue instanceof Promise4) {
              ret2._propagateFrom(castValue, 2);
            }
            return ret2;
          }
          Promise4.prototype.props = function() {
            return props(this);
          };
          Promise4.props = function(promises) {
            return props(promises);
          };
        };
      }, { "./es5": 13, "./util": 36 }], 26: [function(_dereq_2, module2, exports2) {
        "use strict";
        function arrayMove(src, srcIndex, dst, dstIndex, len) {
          for (var j3 = 0; j3 < len; ++j3) {
            dst[j3 + dstIndex] = src[j3 + srcIndex];
            src[j3 + srcIndex] = void 0;
          }
        }
        function Queue(capacity) {
          this._capacity = capacity;
          this._length = 0;
          this._front = 0;
        }
        Queue.prototype._willBeOverCapacity = function(size) {
          return this._capacity < size;
        };
        Queue.prototype._pushOne = function(arg) {
          var length = this.length();
          this._checkCapacity(length + 1);
          var i3 = this._front + length & this._capacity - 1;
          this[i3] = arg;
          this._length = length + 1;
        };
        Queue.prototype.push = function(fn, receiver2, arg) {
          var length = this.length() + 3;
          if (this._willBeOverCapacity(length)) {
            this._pushOne(fn);
            this._pushOne(receiver2);
            this._pushOne(arg);
            return;
          }
          var j3 = this._front + length - 3;
          this._checkCapacity(length);
          var wrapMask = this._capacity - 1;
          this[j3 + 0 & wrapMask] = fn;
          this[j3 + 1 & wrapMask] = receiver2;
          this[j3 + 2 & wrapMask] = arg;
          this._length = length;
        };
        Queue.prototype.shift = function() {
          var front = this._front, ret2 = this[front];
          this[front] = void 0;
          this._front = front + 1 & this._capacity - 1;
          this._length--;
          return ret2;
        };
        Queue.prototype.length = function() {
          return this._length;
        };
        Queue.prototype._checkCapacity = function(size) {
          if (this._capacity < size) {
            this._resizeTo(this._capacity << 1);
          }
        };
        Queue.prototype._resizeTo = function(capacity) {
          var oldCapacity = this._capacity;
          this._capacity = capacity;
          var front = this._front;
          var length = this._length;
          var moveItemsCount = front + length & oldCapacity - 1;
          arrayMove(this, 0, this, oldCapacity, moveItemsCount);
        };
        module2.exports = Queue;
      }, {}], 27: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4, INTERNAL, tryConvertToPromise, apiRejection) {
          var util = _dereq_2("./util");
          var raceLater = function(promise) {
            return promise.then(function(array) {
              return race(array, promise);
            });
          };
          function race(promises, parent) {
            var maybePromise = tryConvertToPromise(promises);
            if (maybePromise instanceof Promise4) {
              return raceLater(maybePromise);
            } else {
              promises = util.asArray(promises);
              if (promises === null)
                return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
            }
            var ret2 = new Promise4(INTERNAL);
            if (parent !== void 0) {
              ret2._propagateFrom(parent, 3);
            }
            var fulfill = ret2._fulfill;
            var reject = ret2._reject;
            for (var i3 = 0, len = promises.length; i3 < len; ++i3) {
              var val = promises[i3];
              if (val === void 0 && !(i3 in promises)) {
                continue;
              }
              Promise4.cast(val)._then(fulfill, reject, void 0, ret2, null);
            }
            return ret2;
          }
          Promise4.race = function(promises) {
            return race(promises, void 0);
          };
          Promise4.prototype.race = function() {
            return race(this, void 0);
          };
        };
      }, { "./util": 36 }], 28: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
          var util = _dereq_2("./util");
          var tryCatch2 = util.tryCatch;
          function ReductionPromiseArray(promises, fn, initialValue, _each) {
            this.constructor$(promises);
            var context = Promise4._getContext();
            this._fn = util.contextBind(context, fn);
            if (initialValue !== void 0) {
              initialValue = Promise4.resolve(initialValue);
              initialValue._attachCancellationCallback(this);
            }
            this._initialValue = initialValue;
            this._currentCancellable = null;
            if (_each === INTERNAL) {
              this._eachValues = Array(this._length);
            } else if (_each === 0) {
              this._eachValues = null;
            } else {
              this._eachValues = void 0;
            }
            this._promise._captureStackTrace();
            this._init$(void 0, -5);
          }
          util.inherits(ReductionPromiseArray, PromiseArray);
          ReductionPromiseArray.prototype._gotAccum = function(accum) {
            if (this._eachValues !== void 0 && this._eachValues !== null && accum !== INTERNAL) {
              this._eachValues.push(accum);
            }
          };
          ReductionPromiseArray.prototype._eachComplete = function(value) {
            if (this._eachValues !== null) {
              this._eachValues.push(value);
            }
            return this._eachValues;
          };
          ReductionPromiseArray.prototype._init = function() {
          };
          ReductionPromiseArray.prototype._resolveEmptyArray = function() {
            this._resolve(this._eachValues !== void 0 ? this._eachValues : this._initialValue);
          };
          ReductionPromiseArray.prototype.shouldCopyValues = function() {
            return false;
          };
          ReductionPromiseArray.prototype._resolve = function(value) {
            this._promise._resolveCallback(value);
            this._values = null;
          };
          ReductionPromiseArray.prototype._resultCancelled = function(sender) {
            if (sender === this._initialValue)
              return this._cancel();
            if (this._isResolved())
              return;
            this._resultCancelled$();
            if (this._currentCancellable instanceof Promise4) {
              this._currentCancellable.cancel();
            }
            if (this._initialValue instanceof Promise4) {
              this._initialValue.cancel();
            }
          };
          ReductionPromiseArray.prototype._iterate = function(values) {
            this._values = values;
            var value;
            var i3;
            var length = values.length;
            if (this._initialValue !== void 0) {
              value = this._initialValue;
              i3 = 0;
            } else {
              value = Promise4.resolve(values[0]);
              i3 = 1;
            }
            this._currentCancellable = value;
            for (var j3 = i3; j3 < length; ++j3) {
              var maybePromise = values[j3];
              if (maybePromise instanceof Promise4) {
                maybePromise.suppressUnhandledRejections();
              }
            }
            if (!value.isRejected()) {
              for (; i3 < length; ++i3) {
                var ctx = {
                  accum: null,
                  value: values[i3],
                  index: i3,
                  length,
                  array: this
                };
                value = value._then(gotAccum, void 0, void 0, ctx, void 0);
                if ((i3 & 127) === 0) {
                  value._setNoAsyncGuarantee();
                }
              }
            }
            if (this._eachValues !== void 0) {
              value = value._then(this._eachComplete, void 0, void 0, this, void 0);
            }
            value._then(completed, completed, void 0, value, this);
          };
          Promise4.prototype.reduce = function(fn, initialValue) {
            return reduce(this, fn, initialValue, null);
          };
          Promise4.reduce = function(promises, fn, initialValue, _each) {
            return reduce(promises, fn, initialValue, _each);
          };
          function completed(valueOrReason, array) {
            if (this.isFulfilled()) {
              array._resolve(valueOrReason);
            } else {
              array._reject(valueOrReason);
            }
          }
          function reduce(promises, fn, initialValue, _each) {
            if (typeof fn !== "function") {
              return apiRejection("expecting a function but got " + util.classString(fn));
            }
            var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
            return array.promise();
          }
          function gotAccum(accum) {
            this.accum = accum;
            this.array._gotAccum(accum);
            var value = tryConvertToPromise(this.value, this.array._promise);
            if (value instanceof Promise4) {
              this.array._currentCancellable = value;
              return value._then(gotValue, void 0, void 0, this, void 0);
            } else {
              return gotValue.call(this, value);
            }
          }
          function gotValue(value) {
            var array = this.array;
            var promise = array._promise;
            var fn = tryCatch2(array._fn);
            promise._pushContext();
            var ret2;
            if (array._eachValues !== void 0) {
              ret2 = fn.call(promise._boundValue(), value, this.index, this.length);
            } else {
              ret2 = fn.call(promise._boundValue(), this.accum, value, this.index, this.length);
            }
            if (ret2 instanceof Promise4) {
              array._currentCancellable = ret2;
            }
            var promiseCreated = promise._popContext();
            debug.checkForgottenReturns(ret2, promiseCreated, array._eachValues !== void 0 ? "Promise.each" : "Promise.reduce", promise);
            return ret2;
          }
        };
      }, { "./util": 36 }], 29: [function(_dereq_2, module2, exports2) {
        "use strict";
        var util = _dereq_2("./util");
        var schedule;
        var noAsyncScheduler = function() {
          throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
        };
        var NativePromise = util.getNativePromise();
        if (util.isNode && typeof MutationObserver === "undefined") {
          var GlobalSetImmediate = global.setImmediate;
          var ProcessNextTick = process.nextTick;
          schedule = util.isRecentNode ? function(fn) {
            GlobalSetImmediate.call(global, fn);
          } : function(fn) {
            ProcessNextTick.call(process, fn);
          };
        } else if (typeof NativePromise === "function" && typeof NativePromise.resolve === "function") {
          var nativePromise = NativePromise.resolve();
          schedule = function(fn) {
            nativePromise.then(fn);
          };
        } else if (typeof MutationObserver !== "undefined" && !(typeof window !== "undefined" && window.navigator && (window.navigator.standalone || window.cordova)) && "classList" in document.documentElement) {
          schedule = function() {
            var div = document.createElement("div");
            var opts = { attributes: true };
            var toggleScheduled = false;
            var div2 = document.createElement("div");
            var o22 = new MutationObserver(function() {
              div.classList.toggle("foo");
              toggleScheduled = false;
            });
            o22.observe(div2, opts);
            var scheduleToggle = function() {
              if (toggleScheduled)
                return;
              toggleScheduled = true;
              div2.classList.toggle("foo");
            };
            return function schedule2(fn) {
              var o3 = new MutationObserver(function() {
                o3.disconnect();
                fn();
              });
              o3.observe(div, opts);
              scheduleToggle();
            };
          }();
        } else if (typeof setImmediate !== "undefined") {
          schedule = function(fn) {
            setImmediate(fn);
          };
        } else if (typeof setTimeout !== "undefined") {
          schedule = function(fn) {
            setTimeout(fn, 0);
          };
        } else {
          schedule = noAsyncScheduler;
        }
        module2.exports = schedule;
      }, { "./util": 36 }], 30: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4, PromiseArray, debug) {
          var PromiseInspection = Promise4.PromiseInspection;
          var util = _dereq_2("./util");
          function SettledPromiseArray(values) {
            this.constructor$(values);
          }
          util.inherits(SettledPromiseArray, PromiseArray);
          SettledPromiseArray.prototype._promiseResolved = function(index, inspection) {
            this._values[index] = inspection;
            var totalResolved = ++this._totalResolved;
            if (totalResolved >= this._length) {
              this._resolve(this._values);
              return true;
            }
            return false;
          };
          SettledPromiseArray.prototype._promiseFulfilled = function(value, index) {
            var ret2 = new PromiseInspection();
            ret2._bitField = 33554432;
            ret2._settledValueField = value;
            return this._promiseResolved(index, ret2);
          };
          SettledPromiseArray.prototype._promiseRejected = function(reason, index) {
            var ret2 = new PromiseInspection();
            ret2._bitField = 16777216;
            ret2._settledValueField = reason;
            return this._promiseResolved(index, ret2);
          };
          Promise4.settle = function(promises) {
            debug.deprecated(".settle()", ".reflect()");
            return new SettledPromiseArray(promises).promise();
          };
          Promise4.allSettled = function(promises) {
            return new SettledPromiseArray(promises).promise();
          };
          Promise4.prototype.settle = function() {
            return Promise4.settle(this);
          };
        };
      }, { "./util": 36 }], 31: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4, PromiseArray, apiRejection) {
          var util = _dereq_2("./util");
          var RangeError2 = _dereq_2("./errors").RangeError;
          var AggregateError = _dereq_2("./errors").AggregateError;
          var isArray = util.isArray;
          var CANCELLATION = {};
          function SomePromiseArray(values) {
            this.constructor$(values);
            this._howMany = 0;
            this._unwrap = false;
            this._initialized = false;
          }
          util.inherits(SomePromiseArray, PromiseArray);
          SomePromiseArray.prototype._init = function() {
            if (!this._initialized) {
              return;
            }
            if (this._howMany === 0) {
              this._resolve([]);
              return;
            }
            this._init$(void 0, -5);
            var isArrayResolved = isArray(this._values);
            if (!this._isResolved() && isArrayResolved && this._howMany > this._canPossiblyFulfill()) {
              this._reject(this._getRangeError(this.length()));
            }
          };
          SomePromiseArray.prototype.init = function() {
            this._initialized = true;
            this._init();
          };
          SomePromiseArray.prototype.setUnwrap = function() {
            this._unwrap = true;
          };
          SomePromiseArray.prototype.howMany = function() {
            return this._howMany;
          };
          SomePromiseArray.prototype.setHowMany = function(count) {
            this._howMany = count;
          };
          SomePromiseArray.prototype._promiseFulfilled = function(value) {
            this._addFulfilled(value);
            if (this._fulfilled() === this.howMany()) {
              this._values.length = this.howMany();
              if (this.howMany() === 1 && this._unwrap) {
                this._resolve(this._values[0]);
              } else {
                this._resolve(this._values);
              }
              return true;
            }
            return false;
          };
          SomePromiseArray.prototype._promiseRejected = function(reason) {
            this._addRejected(reason);
            return this._checkOutcome();
          };
          SomePromiseArray.prototype._promiseCancelled = function() {
            if (this._values instanceof Promise4 || this._values == null) {
              return this._cancel();
            }
            this._addRejected(CANCELLATION);
            return this._checkOutcome();
          };
          SomePromiseArray.prototype._checkOutcome = function() {
            if (this.howMany() > this._canPossiblyFulfill()) {
              var e3 = new AggregateError();
              for (var i3 = this.length(); i3 < this._values.length; ++i3) {
                if (this._values[i3] !== CANCELLATION) {
                  e3.push(this._values[i3]);
                }
              }
              if (e3.length > 0) {
                this._reject(e3);
              } else {
                this._cancel();
              }
              return true;
            }
            return false;
          };
          SomePromiseArray.prototype._fulfilled = function() {
            return this._totalResolved;
          };
          SomePromiseArray.prototype._rejected = function() {
            return this._values.length - this.length();
          };
          SomePromiseArray.prototype._addRejected = function(reason) {
            this._values.push(reason);
          };
          SomePromiseArray.prototype._addFulfilled = function(value) {
            this._values[this._totalResolved++] = value;
          };
          SomePromiseArray.prototype._canPossiblyFulfill = function() {
            return this.length() - this._rejected();
          };
          SomePromiseArray.prototype._getRangeError = function(count) {
            var message = "Input array must contain at least " + this._howMany + " items but contains only " + count + " items";
            return new RangeError2(message);
          };
          SomePromiseArray.prototype._resolveEmptyArray = function() {
            this._reject(this._getRangeError(0));
          };
          function some(promises, howMany) {
            if ((howMany | 0) !== howMany || howMany < 0) {
              return apiRejection("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");
            }
            var ret2 = new SomePromiseArray(promises);
            var promise = ret2.promise();
            ret2.setHowMany(howMany);
            ret2.init();
            return promise;
          }
          Promise4.some = function(promises, howMany) {
            return some(promises, howMany);
          };
          Promise4.prototype.some = function(howMany) {
            return some(this, howMany);
          };
          Promise4._SomePromiseArray = SomePromiseArray;
        };
      }, { "./errors": 12, "./util": 36 }], 32: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4) {
          function PromiseInspection(promise) {
            if (promise !== void 0) {
              promise = promise._target();
              this._bitField = promise._bitField;
              this._settledValueField = promise._isFateSealed() ? promise._settledValue() : void 0;
            } else {
              this._bitField = 0;
              this._settledValueField = void 0;
            }
          }
          PromiseInspection.prototype._settledValue = function() {
            return this._settledValueField;
          };
          var value = PromiseInspection.prototype.value = function() {
            if (!this.isFulfilled()) {
              throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
            }
            return this._settledValue();
          };
          var reason = PromiseInspection.prototype.error = PromiseInspection.prototype.reason = function() {
            if (!this.isRejected()) {
              throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
            }
            return this._settledValue();
          };
          var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
            return (this._bitField & 33554432) !== 0;
          };
          var isRejected = PromiseInspection.prototype.isRejected = function() {
            return (this._bitField & 16777216) !== 0;
          };
          var isPending = PromiseInspection.prototype.isPending = function() {
            return (this._bitField & 50397184) === 0;
          };
          var isResolved = PromiseInspection.prototype.isResolved = function() {
            return (this._bitField & 50331648) !== 0;
          };
          PromiseInspection.prototype.isCancelled = function() {
            return (this._bitField & 8454144) !== 0;
          };
          Promise4.prototype.__isCancelled = function() {
            return (this._bitField & 65536) === 65536;
          };
          Promise4.prototype._isCancelled = function() {
            return this._target().__isCancelled();
          };
          Promise4.prototype.isCancelled = function() {
            return (this._target()._bitField & 8454144) !== 0;
          };
          Promise4.prototype.isPending = function() {
            return isPending.call(this._target());
          };
          Promise4.prototype.isRejected = function() {
            return isRejected.call(this._target());
          };
          Promise4.prototype.isFulfilled = function() {
            return isFulfilled.call(this._target());
          };
          Promise4.prototype.isResolved = function() {
            return isResolved.call(this._target());
          };
          Promise4.prototype.value = function() {
            return value.call(this._target());
          };
          Promise4.prototype.reason = function() {
            var target = this._target();
            target._unsetRejectionIsUnhandled();
            return reason.call(target);
          };
          Promise4.prototype._value = function() {
            return this._settledValue();
          };
          Promise4.prototype._reason = function() {
            this._unsetRejectionIsUnhandled();
            return this._settledValue();
          };
          Promise4.PromiseInspection = PromiseInspection;
        };
      }, {}], 33: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4, INTERNAL) {
          var util = _dereq_2("./util");
          var errorObj2 = util.errorObj;
          var isObject2 = util.isObject;
          function tryConvertToPromise(obj2, context) {
            if (isObject2(obj2)) {
              if (obj2 instanceof Promise4)
                return obj2;
              var then = getThen(obj2);
              if (then === errorObj2) {
                if (context)
                  context._pushContext();
                var ret2 = Promise4.reject(then.e);
                if (context)
                  context._popContext();
                return ret2;
              } else if (typeof then === "function") {
                if (isAnyBluebirdPromise(obj2)) {
                  var ret2 = new Promise4(INTERNAL);
                  obj2._then(ret2._fulfill, ret2._reject, void 0, ret2, null);
                  return ret2;
                }
                return doThenable(obj2, then, context);
              }
            }
            return obj2;
          }
          function doGetThen(obj2) {
            return obj2.then;
          }
          function getThen(obj2) {
            try {
              return doGetThen(obj2);
            } catch (e3) {
              errorObj2.e = e3;
              return errorObj2;
            }
          }
          var hasProp = {}.hasOwnProperty;
          function isAnyBluebirdPromise(obj2) {
            try {
              return hasProp.call(obj2, "_promise0");
            } catch (e3) {
              return false;
            }
          }
          function doThenable(x3, then, context) {
            var promise = new Promise4(INTERNAL);
            var ret2 = promise;
            if (context)
              context._pushContext();
            promise._captureStackTrace();
            if (context)
              context._popContext();
            var synchronous = true;
            var result = util.tryCatch(then).call(x3, resolve, reject);
            synchronous = false;
            if (promise && result === errorObj2) {
              promise._rejectCallback(result.e, true, true);
              promise = null;
            }
            function resolve(value) {
              if (!promise)
                return;
              promise._resolveCallback(value);
              promise = null;
            }
            function reject(reason) {
              if (!promise)
                return;
              promise._rejectCallback(reason, synchronous, true);
              promise = null;
            }
            return ret2;
          }
          return tryConvertToPromise;
        };
      }, { "./util": 36 }], 34: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4, INTERNAL, debug) {
          var util = _dereq_2("./util");
          var TimeoutError = Promise4.TimeoutError;
          function HandleWrapper(handle) {
            this.handle = handle;
          }
          HandleWrapper.prototype._resultCancelled = function() {
            clearTimeout(this.handle);
          };
          var afterValue = function(value) {
            return delay(+this).thenReturn(value);
          };
          var delay = Promise4.delay = function(ms, value) {
            var ret2;
            var handle;
            if (value !== void 0) {
              ret2 = Promise4.resolve(value)._then(afterValue, null, null, ms, void 0);
              if (debug.cancellation() && value instanceof Promise4) {
                ret2._setOnCancel(value);
              }
            } else {
              ret2 = new Promise4(INTERNAL);
              handle = setTimeout(function() {
                ret2._fulfill();
              }, +ms);
              if (debug.cancellation()) {
                ret2._setOnCancel(new HandleWrapper(handle));
              }
              ret2._captureStackTrace();
            }
            ret2._setAsyncGuaranteed();
            return ret2;
          };
          Promise4.prototype.delay = function(ms) {
            return delay(ms, this);
          };
          var afterTimeout = function(promise, message, parent) {
            var err;
            if (typeof message !== "string") {
              if (message instanceof Error) {
                err = message;
              } else {
                err = new TimeoutError("operation timed out");
              }
            } else {
              err = new TimeoutError(message);
            }
            util.markAsOriginatingFromRejection(err);
            promise._attachExtraTrace(err);
            promise._reject(err);
            if (parent != null) {
              parent.cancel();
            }
          };
          function successClear(value) {
            clearTimeout(this.handle);
            return value;
          }
          function failureClear(reason) {
            clearTimeout(this.handle);
            throw reason;
          }
          Promise4.prototype.timeout = function(ms, message) {
            ms = +ms;
            var ret2, parent;
            var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
              if (ret2.isPending()) {
                afterTimeout(ret2, message, parent);
              }
            }, ms));
            if (debug.cancellation()) {
              parent = this.then();
              ret2 = parent._then(successClear, failureClear, void 0, handleWrapper, void 0);
              ret2._setOnCancel(handleWrapper);
            } else {
              ret2 = this._then(successClear, failureClear, void 0, handleWrapper, void 0);
            }
            return ret2;
          };
        };
      }, { "./util": 36 }], 35: [function(_dereq_2, module2, exports2) {
        "use strict";
        module2.exports = function(Promise4, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug) {
          var util = _dereq_2("./util");
          var TypeError2 = _dereq_2("./errors").TypeError;
          var inherits2 = _dereq_2("./util").inherits;
          var errorObj2 = util.errorObj;
          var tryCatch2 = util.tryCatch;
          var NULL = {};
          function thrower2(e3) {
            setTimeout(function() {
              throw e3;
            }, 0);
          }
          function castPreservingDisposable(thenable) {
            var maybePromise = tryConvertToPromise(thenable);
            if (maybePromise !== thenable && typeof thenable._isDisposable === "function" && typeof thenable._getDisposer === "function" && thenable._isDisposable()) {
              maybePromise._setDisposable(thenable._getDisposer());
            }
            return maybePromise;
          }
          function dispose(resources, inspection) {
            var i3 = 0;
            var len = resources.length;
            var ret2 = new Promise4(INTERNAL);
            function iterator() {
              if (i3 >= len)
                return ret2._fulfill();
              var maybePromise = castPreservingDisposable(resources[i3++]);
              if (maybePromise instanceof Promise4 && maybePromise._isDisposable()) {
                try {
                  maybePromise = tryConvertToPromise(maybePromise._getDisposer().tryDispose(inspection), resources.promise);
                } catch (e3) {
                  return thrower2(e3);
                }
                if (maybePromise instanceof Promise4) {
                  return maybePromise._then(iterator, thrower2, null, null, null);
                }
              }
              iterator();
            }
            iterator();
            return ret2;
          }
          function Disposer(data, promise, context) {
            this._data = data;
            this._promise = promise;
            this._context = context;
          }
          Disposer.prototype.data = function() {
            return this._data;
          };
          Disposer.prototype.promise = function() {
            return this._promise;
          };
          Disposer.prototype.resource = function() {
            if (this.promise().isFulfilled()) {
              return this.promise().value();
            }
            return NULL;
          };
          Disposer.prototype.tryDispose = function(inspection) {
            var resource = this.resource();
            var context = this._context;
            if (context !== void 0)
              context._pushContext();
            var ret2 = resource !== NULL ? this.doDispose(resource, inspection) : null;
            if (context !== void 0)
              context._popContext();
            this._promise._unsetDisposable();
            this._data = null;
            return ret2;
          };
          Disposer.isDisposer = function(d2) {
            return d2 != null && typeof d2.resource === "function" && typeof d2.tryDispose === "function";
          };
          function FunctionDisposer(fn, promise, context) {
            this.constructor$(fn, promise, context);
          }
          inherits2(FunctionDisposer, Disposer);
          FunctionDisposer.prototype.doDispose = function(resource, inspection) {
            var fn = this.data();
            return fn.call(resource, resource, inspection);
          };
          function maybeUnwrapDisposer(value) {
            if (Disposer.isDisposer(value)) {
              this.resources[this.index]._setDisposable(value);
              return value.promise();
            }
            return value;
          }
          function ResourceList(length) {
            this.length = length;
            this.promise = null;
            this[length - 1] = null;
          }
          ResourceList.prototype._resultCancelled = function() {
            var len = this.length;
            for (var i3 = 0; i3 < len; ++i3) {
              var item = this[i3];
              if (item instanceof Promise4) {
                item.cancel();
              }
            }
          };
          Promise4.using = function() {
            var len = arguments.length;
            if (len < 2)
              return apiRejection("you must pass at least 2 arguments to Promise.using");
            var fn = arguments[len - 1];
            if (typeof fn !== "function") {
              return apiRejection("expecting a function but got " + util.classString(fn));
            }
            var input;
            var spreadArgs = true;
            if (len === 2 && Array.isArray(arguments[0])) {
              input = arguments[0];
              len = input.length;
              spreadArgs = false;
            } else {
              input = arguments;
              len--;
            }
            var resources = new ResourceList(len);
            for (var i3 = 0; i3 < len; ++i3) {
              var resource = input[i3];
              if (Disposer.isDisposer(resource)) {
                var disposer = resource;
                resource = resource.promise();
                resource._setDisposable(disposer);
              } else {
                var maybePromise = tryConvertToPromise(resource);
                if (maybePromise instanceof Promise4) {
                  resource = maybePromise._then(maybeUnwrapDisposer, null, null, {
                    resources,
                    index: i3
                  }, void 0);
                }
              }
              resources[i3] = resource;
            }
            var reflectedResources = new Array(resources.length);
            for (var i3 = 0; i3 < reflectedResources.length; ++i3) {
              reflectedResources[i3] = Promise4.resolve(resources[i3]).reflect();
            }
            var resultPromise = Promise4.all(reflectedResources).then(function(inspections) {
              for (var i4 = 0; i4 < inspections.length; ++i4) {
                var inspection = inspections[i4];
                if (inspection.isRejected()) {
                  errorObj2.e = inspection.error();
                  return errorObj2;
                } else if (!inspection.isFulfilled()) {
                  resultPromise.cancel();
                  return;
                }
                inspections[i4] = inspection.value();
              }
              promise._pushContext();
              fn = tryCatch2(fn);
              var ret2 = spreadArgs ? fn.apply(void 0, inspections) : fn(inspections);
              var promiseCreated = promise._popContext();
              debug.checkForgottenReturns(ret2, promiseCreated, "Promise.using", promise);
              return ret2;
            });
            var promise = resultPromise.lastly(function() {
              var inspection = new Promise4.PromiseInspection(resultPromise);
              return dispose(resources, inspection);
            });
            resources.promise = promise;
            promise._setOnCancel(resources);
            return promise;
          };
          Promise4.prototype._setDisposable = function(disposer) {
            this._bitField = this._bitField | 131072;
            this._disposer = disposer;
          };
          Promise4.prototype._isDisposable = function() {
            return (this._bitField & 131072) > 0;
          };
          Promise4.prototype._getDisposer = function() {
            return this._disposer;
          };
          Promise4.prototype._unsetDisposable = function() {
            this._bitField = this._bitField & ~131072;
            this._disposer = void 0;
          };
          Promise4.prototype.disposer = function(fn) {
            if (typeof fn === "function") {
              return new FunctionDisposer(fn, this, createContext());
            }
            throw new TypeError2();
          };
        };
      }, { "./errors": 12, "./util": 36 }], 36: [function(_dereq_, module, exports) {
        "use strict";
        var es5 = _dereq_("./es5");
        var canEvaluate = typeof navigator == "undefined";
        var errorObj = { e: {} };
        var tryCatchTarget;
        var globalObject = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this !== void 0 ? this : null;
        function tryCatcher() {
          try {
            var target = tryCatchTarget;
            tryCatchTarget = null;
            return target.apply(this, arguments);
          } catch (e3) {
            errorObj.e = e3;
            return errorObj;
          }
        }
        function tryCatch(fn) {
          tryCatchTarget = fn;
          return tryCatcher;
        }
        var inherits = function(Child, Parent) {
          var hasProp = {}.hasOwnProperty;
          function T3() {
            this.constructor = Child;
            this.constructor$ = Parent;
            for (var propertyName in Parent.prototype) {
              if (hasProp.call(Parent.prototype, propertyName) && propertyName.charAt(propertyName.length - 1) !== "$") {
                this[propertyName + "$"] = Parent.prototype[propertyName];
              }
            }
          }
          T3.prototype = Parent.prototype;
          Child.prototype = new T3();
          return Child.prototype;
        };
        function isPrimitive(val) {
          return val == null || val === true || val === false || typeof val === "string" || typeof val === "number";
        }
        function isObject(value) {
          return typeof value === "function" || typeof value === "object" && value !== null;
        }
        function maybeWrapAsError(maybeError) {
          if (!isPrimitive(maybeError))
            return maybeError;
          return new Error(safeToString(maybeError));
        }
        function withAppended(target, appendee) {
          var len = target.length;
          var ret2 = new Array(len + 1);
          var i3;
          for (i3 = 0; i3 < len; ++i3) {
            ret2[i3] = target[i3];
          }
          ret2[i3] = appendee;
          return ret2;
        }
        function getDataPropertyOrDefault(obj2, key2, defaultValue) {
          if (es5.isES5) {
            var desc = Object.getOwnPropertyDescriptor(obj2, key2);
            if (desc != null) {
              return desc.get == null && desc.set == null ? desc.value : defaultValue;
            }
          } else {
            return {}.hasOwnProperty.call(obj2, key2) ? obj2[key2] : void 0;
          }
        }
        function notEnumerableProp(obj2, name2, value) {
          if (isPrimitive(obj2))
            return obj2;
          var descriptor = {
            value,
            configurable: true,
            enumerable: false,
            writable: true
          };
          es5.defineProperty(obj2, name2, descriptor);
          return obj2;
        }
        function thrower(r3) {
          throw r3;
        }
        var inheritedDataKeys = function() {
          var excludedPrototypes = [
            Array.prototype,
            Object.prototype,
            Function.prototype
          ];
          var isExcludedProto = function(val) {
            for (var i3 = 0; i3 < excludedPrototypes.length; ++i3) {
              if (excludedPrototypes[i3] === val) {
                return true;
              }
            }
            return false;
          };
          if (es5.isES5) {
            var getKeys = Object.getOwnPropertyNames;
            return function(obj2) {
              var ret2 = [];
              var visitedKeys = Object.create(null);
              while (obj2 != null && !isExcludedProto(obj2)) {
                var keys;
                try {
                  keys = getKeys(obj2);
                } catch (e3) {
                  return ret2;
                }
                for (var i3 = 0; i3 < keys.length; ++i3) {
                  var key2 = keys[i3];
                  if (visitedKeys[key2])
                    continue;
                  visitedKeys[key2] = true;
                  var desc = Object.getOwnPropertyDescriptor(obj2, key2);
                  if (desc != null && desc.get == null && desc.set == null) {
                    ret2.push(key2);
                  }
                }
                obj2 = es5.getPrototypeOf(obj2);
              }
              return ret2;
            };
          } else {
            var hasProp = {}.hasOwnProperty;
            return function(obj2) {
              if (isExcludedProto(obj2))
                return [];
              var ret2 = [];
              enumeration:
                for (var key2 in obj2) {
                  if (hasProp.call(obj2, key2)) {
                    ret2.push(key2);
                  } else {
                    for (var i3 = 0; i3 < excludedPrototypes.length; ++i3) {
                      if (hasProp.call(excludedPrototypes[i3], key2)) {
                        continue enumeration;
                      }
                    }
                    ret2.push(key2);
                  }
                }
              return ret2;
            };
          }
        }();
        var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
        function isClass(fn) {
          try {
            if (typeof fn === "function") {
              var keys = es5.names(fn.prototype);
              var hasMethods = es5.isES5 && keys.length > 1;
              var hasMethodsOtherThanConstructor = keys.length > 0 && !(keys.length === 1 && keys[0] === "constructor");
              var hasThisAssignmentAndStaticMethods = thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;
              if (hasMethods || hasMethodsOtherThanConstructor || hasThisAssignmentAndStaticMethods) {
                return true;
              }
            }
            return false;
          } catch (e3) {
            return false;
          }
        }
        function toFastProperties(obj) {
          function FakeConstructor() {
          }
          FakeConstructor.prototype = obj;
          var receiver = new FakeConstructor();
          function ic() {
            return typeof receiver.foo;
          }
          ic();
          ic();
          return obj;
          eval(obj);
        }
        var rident = /^[a-z$_][a-z$_0-9]*$/i;
        function isIdentifier(str) {
          return rident.test(str);
        }
        function filledRange(count, prefix, suffix) {
          var ret2 = new Array(count);
          for (var i3 = 0; i3 < count; ++i3) {
            ret2[i3] = prefix + i3 + suffix;
          }
          return ret2;
        }
        function safeToString(obj2) {
          try {
            return obj2 + "";
          } catch (e3) {
            return "[no string representation]";
          }
        }
        function isError(obj2) {
          return obj2 instanceof Error || obj2 !== null && typeof obj2 === "object" && typeof obj2.message === "string" && typeof obj2.name === "string";
        }
        function markAsOriginatingFromRejection(e3) {
          try {
            notEnumerableProp(e3, "isOperational", true);
          } catch (ignore) {
          }
        }
        function originatesFromRejection(e3) {
          if (e3 == null)
            return false;
          return e3 instanceof Error["__BluebirdErrorTypes__"].OperationalError || e3["isOperational"] === true;
        }
        function canAttachTrace(obj2) {
          return isError(obj2) && es5.propertyIsWritable(obj2, "stack");
        }
        var ensureErrorObject = function() {
          if (!("stack" in new Error())) {
            return function(value) {
              if (canAttachTrace(value))
                return value;
              try {
                throw new Error(safeToString(value));
              } catch (err) {
                return err;
              }
            };
          } else {
            return function(value) {
              if (canAttachTrace(value))
                return value;
              return new Error(safeToString(value));
            };
          }
        }();
        function classString(obj2) {
          return {}.toString.call(obj2);
        }
        function copyDescriptors(from, to, filter2) {
          var keys = es5.names(from);
          for (var i3 = 0; i3 < keys.length; ++i3) {
            var key2 = keys[i3];
            if (filter2(key2)) {
              try {
                es5.defineProperty(to, key2, es5.getDescriptor(from, key2));
              } catch (ignore) {
              }
            }
          }
        }
        var asArray = function(v3) {
          if (es5.isArray(v3)) {
            return v3;
          }
          return null;
        };
        if (typeof Symbol !== "undefined" && Symbol.iterator) {
          var ArrayFrom = typeof Array.from === "function" ? function(v3) {
            return Array.from(v3);
          } : function(v3) {
            var ret2 = [];
            var it = v3[Symbol.iterator]();
            var itResult;
            while (!(itResult = it.next()).done) {
              ret2.push(itResult.value);
            }
            return ret2;
          };
          asArray = function(v3) {
            if (es5.isArray(v3)) {
              return v3;
            } else if (v3 != null && typeof v3[Symbol.iterator] === "function") {
              return ArrayFrom(v3);
            }
            return null;
          };
        }
        var isNode = typeof process !== "undefined" && classString(process).toLowerCase() === "[object process]";
        var hasEnvVariables = typeof process !== "undefined" && typeof process.env !== "undefined";
        function env(key2) {
          return hasEnvVariables ? process.env[key2] : void 0;
        }
        function getNativePromise() {
          if (typeof Promise === "function") {
            try {
              var promise = new Promise(function() {
              });
              if (classString(promise) === "[object Promise]") {
                return Promise;
              }
            } catch (e3) {
            }
          }
        }
        var reflectHandler;
        function contextBind(ctx, cb) {
          if (ctx === null || typeof cb !== "function" || cb === reflectHandler) {
            return cb;
          }
          if (ctx.domain !== null) {
            cb = ctx.domain.bind(cb);
          }
          var async = ctx.async;
          if (async !== null) {
            var old = cb;
            cb = function() {
              var args = new Array(2).concat([].slice.call(arguments));
              ;
              args[0] = old;
              args[1] = this;
              return async.runInAsyncScope.apply(async, args);
            };
          }
          return cb;
        }
        var ret = {
          setReflectHandler: function(fn) {
            reflectHandler = fn;
          },
          isClass,
          isIdentifier,
          inheritedDataKeys,
          getDataPropertyOrDefault,
          thrower,
          isArray: es5.isArray,
          asArray,
          notEnumerableProp,
          isPrimitive,
          isObject,
          isError,
          canEvaluate,
          errorObj,
          tryCatch,
          inherits,
          withAppended,
          maybeWrapAsError,
          toFastProperties,
          filledRange,
          toString: safeToString,
          canAttachTrace,
          ensureErrorObject,
          originatesFromRejection,
          markAsOriginatingFromRejection,
          classString,
          copyDescriptors,
          isNode,
          hasEnvVariables,
          env,
          global: globalObject,
          getNativePromise,
          contextBind
        };
        ret.isRecentNode = ret.isNode && function() {
          var version27;
          if (process.versions && process.versions.node) {
            version27 = process.versions.node.split(".").map(Number);
          } else if (process.version) {
            version27 = process.version.split(".").map(Number);
          }
          return version27[0] === 0 && version27[1] > 10 || version27[0] > 0;
        }();
        ret.nodeSupportsAsyncResource = ret.isNode && function() {
          var supportsAsync = false;
          try {
            var res = _dereq_("async_hooks").AsyncResource;
            supportsAsync = typeof res.prototype.runInAsyncScope === "function";
          } catch (e3) {
            supportsAsync = false;
          }
          return supportsAsync;
        }();
        if (ret.isNode)
          ret.toFastProperties(process);
        try {
          throw new Error();
        } catch (e3) {
          ret.lastLineError = e3;
        }
        module.exports = ret;
      }, { "./es5": 13, "async_hooks": void 0 }] }, {}, [4])(4);
    });
    if (typeof window !== "undefined" && window !== null) {
      window.P = window.Promise;
    } else if (typeof self !== "undefined" && self !== null) {
      self.P = self.Promise;
    }
  }
});

// node_modules/preact/dist/preact.module.js
var n;
var l;
var u;
var i;
var t;
var r;
var o;
var f;
var e = {};
var c = [];
var s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function a(n2, l3) {
  for (var u3 in l3)
    n2[u3] = l3[u3];
  return n2;
}
function h(n2) {
  var l3 = n2.parentNode;
  l3 && l3.removeChild(n2);
}
function v(l3, u3, i3) {
  var t3, r3, o3, f3 = {};
  for (o3 in u3)
    o3 == "key" ? t3 = u3[o3] : o3 == "ref" ? r3 = u3[o3] : f3[o3] = u3[o3];
  if (arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : i3), typeof l3 == "function" && l3.defaultProps != null)
    for (o3 in l3.defaultProps)
      f3[o3] === void 0 && (f3[o3] = l3.defaultProps[o3]);
  return y(l3, f3, t3, r3, null);
}
function y(n2, i3, t3, r3, o3) {
  var f3 = { type: n2, props: i3, key: t3, ref: r3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: o3 == null ? ++u : o3 };
  return o3 == null && l.vnode != null && l.vnode(f3), f3;
}
function d(n2) {
  return n2.children;
}
function _(n2, l3) {
  this.props = n2, this.context = l3;
}
function k(n2, l3) {
  if (l3 == null)
    return n2.__ ? k(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
  for (var u3; l3 < n2.__k.length; l3++)
    if ((u3 = n2.__k[l3]) != null && u3.__e != null)
      return u3.__e;
  return typeof n2.type == "function" ? k(n2) : null;
}
function b(n2) {
  var l3, u3;
  if ((n2 = n2.__) != null && n2.__c != null) {
    for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++)
      if ((u3 = n2.__k[l3]) != null && u3.__e != null) {
        n2.__e = n2.__c.base = u3.__e;
        break;
      }
    return b(n2);
  }
}
function m(n2) {
  (!n2.__d && (n2.__d = true) && t.push(n2) && !g.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(g);
}
function g() {
  for (var n2; g.__r = t.length; )
    n2 = t.sort(function(n3, l3) {
      return n3.__v.__b - l3.__v.__b;
    }), t = [], n2.some(function(n3) {
      var l3, u3, i3, t3, r3, o3;
      n3.__d && (r3 = (t3 = (l3 = n3).__v).__e, (o3 = l3.__P) && (u3 = [], (i3 = a({}, t3)).__v = t3.__v + 1, j(o3, t3, i3, l3.__n, o3.ownerSVGElement !== void 0, t3.__h != null ? [r3] : null, u3, r3 == null ? k(t3) : r3, t3.__h), z(u3, t3), t3.__e != r3 && b(t3)));
    });
}
function w(n2, l3, u3, i3, t3, r3, o3, f3, s2, a3) {
  var h2, v3, p2, _2, b3, m3, g3, w3 = i3 && i3.__k || c, A = w3.length;
  for (u3.__k = [], h2 = 0; h2 < l3.length; h2++)
    if ((_2 = u3.__k[h2] = (_2 = l3[h2]) == null || typeof _2 == "boolean" ? null : typeof _2 == "string" || typeof _2 == "number" || typeof _2 == "bigint" ? y(null, _2, null, null, _2) : Array.isArray(_2) ? y(d, { children: _2 }, null, null, null) : _2.__b > 0 ? y(_2.type, _2.props, _2.key, null, _2.__v) : _2) != null) {
      if (_2.__ = u3, _2.__b = u3.__b + 1, (p2 = w3[h2]) === null || p2 && _2.key == p2.key && _2.type === p2.type)
        w3[h2] = void 0;
      else
        for (v3 = 0; v3 < A; v3++) {
          if ((p2 = w3[v3]) && _2.key == p2.key && _2.type === p2.type) {
            w3[v3] = void 0;
            break;
          }
          p2 = null;
        }
      j(n2, _2, p2 = p2 || e, t3, r3, o3, f3, s2, a3), b3 = _2.__e, (v3 = _2.ref) && p2.ref != v3 && (g3 || (g3 = []), p2.ref && g3.push(p2.ref, null, _2), g3.push(v3, _2.__c || b3, _2)), b3 != null ? (m3 == null && (m3 = b3), typeof _2.type == "function" && _2.__k === p2.__k ? _2.__d = s2 = x(_2, s2, n2) : s2 = P(n2, _2, p2, w3, b3, s2), typeof u3.type == "function" && (u3.__d = s2)) : s2 && p2.__e == s2 && s2.parentNode != n2 && (s2 = k(p2));
    }
  for (u3.__e = m3, h2 = A; h2--; )
    w3[h2] != null && (typeof u3.type == "function" && w3[h2].__e != null && w3[h2].__e == u3.__d && (u3.__d = k(i3, h2 + 1)), N(w3[h2], w3[h2]));
  if (g3)
    for (h2 = 0; h2 < g3.length; h2++)
      M(g3[h2], g3[++h2], g3[++h2]);
}
function x(n2, l3, u3) {
  for (var i3, t3 = n2.__k, r3 = 0; t3 && r3 < t3.length; r3++)
    (i3 = t3[r3]) && (i3.__ = n2, l3 = typeof i3.type == "function" ? x(i3, l3, u3) : P(u3, i3, i3, t3, i3.__e, l3));
  return l3;
}
function P(n2, l3, u3, i3, t3, r3) {
  var o3, f3, e3;
  if (l3.__d !== void 0)
    o3 = l3.__d, l3.__d = void 0;
  else if (u3 == null || t3 != r3 || t3.parentNode == null)
    n:
      if (r3 == null || r3.parentNode !== n2)
        n2.appendChild(t3), o3 = null;
      else {
        for (f3 = r3, e3 = 0; (f3 = f3.nextSibling) && e3 < i3.length; e3 += 2)
          if (f3 == t3)
            break n;
        n2.insertBefore(t3, r3), o3 = r3;
      }
  return o3 !== void 0 ? o3 : t3.nextSibling;
}
function C(n2, l3, u3, i3, t3) {
  var r3;
  for (r3 in u3)
    r3 === "children" || r3 === "key" || r3 in l3 || H(n2, r3, null, u3[r3], i3);
  for (r3 in l3)
    t3 && typeof l3[r3] != "function" || r3 === "children" || r3 === "key" || r3 === "value" || r3 === "checked" || u3[r3] === l3[r3] || H(n2, r3, l3[r3], u3[r3], i3);
}
function $(n2, l3, u3) {
  l3[0] === "-" ? n2.setProperty(l3, u3) : n2[l3] = u3 == null ? "" : typeof u3 != "number" || s.test(l3) ? u3 : u3 + "px";
}
function H(n2, l3, u3, i3, t3) {
  var r3;
  n:
    if (l3 === "style")
      if (typeof u3 == "string")
        n2.style.cssText = u3;
      else {
        if (typeof i3 == "string" && (n2.style.cssText = i3 = ""), i3)
          for (l3 in i3)
            u3 && l3 in u3 || $(n2.style, l3, "");
        if (u3)
          for (l3 in u3)
            i3 && u3[l3] === i3[l3] || $(n2.style, l3, u3[l3]);
      }
    else if (l3[0] === "o" && l3[1] === "n")
      r3 = l3 !== (l3 = l3.replace(/Capture$/, "")), l3 = l3.toLowerCase() in n2 ? l3.toLowerCase().slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + r3] = u3, u3 ? i3 || n2.addEventListener(l3, r3 ? T : I, r3) : n2.removeEventListener(l3, r3 ? T : I, r3);
    else if (l3 !== "dangerouslySetInnerHTML") {
      if (t3)
        l3 = l3.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
      else if (l3 !== "href" && l3 !== "list" && l3 !== "form" && l3 !== "tabIndex" && l3 !== "download" && l3 in n2)
        try {
          n2[l3] = u3 == null ? "" : u3;
          break n;
        } catch (n3) {
        }
      typeof u3 == "function" || (u3 != null && (u3 !== false || l3[0] === "a" && l3[1] === "r") ? n2.setAttribute(l3, u3) : n2.removeAttribute(l3));
    }
}
function I(n2) {
  this.l[n2.type + false](l.event ? l.event(n2) : n2);
}
function T(n2) {
  this.l[n2.type + true](l.event ? l.event(n2) : n2);
}
function j(n2, u3, i3, t3, r3, o3, f3, e3, c3) {
  var s2, h2, v3, y3, p2, k3, b3, m3, g3, x3, A, P2 = u3.type;
  if (u3.constructor !== void 0)
    return null;
  i3.__h != null && (c3 = i3.__h, e3 = u3.__e = i3.__e, u3.__h = null, o3 = [e3]), (s2 = l.__b) && s2(u3);
  try {
    n:
      if (typeof P2 == "function") {
        if (m3 = u3.props, g3 = (s2 = P2.contextType) && t3[s2.__c], x3 = s2 ? g3 ? g3.props.value : s2.__ : t3, i3.__c ? b3 = (h2 = u3.__c = i3.__c).__ = h2.__E : ("prototype" in P2 && P2.prototype.render ? u3.__c = h2 = new P2(m3, x3) : (u3.__c = h2 = new _(m3, x3), h2.constructor = P2, h2.render = O), g3 && g3.sub(h2), h2.props = m3, h2.state || (h2.state = {}), h2.context = x3, h2.__n = t3, v3 = h2.__d = true, h2.__h = []), h2.__s == null && (h2.__s = h2.state), P2.getDerivedStateFromProps != null && (h2.__s == h2.state && (h2.__s = a({}, h2.__s)), a(h2.__s, P2.getDerivedStateFromProps(m3, h2.__s))), y3 = h2.props, p2 = h2.state, v3)
          P2.getDerivedStateFromProps == null && h2.componentWillMount != null && h2.componentWillMount(), h2.componentDidMount != null && h2.__h.push(h2.componentDidMount);
        else {
          if (P2.getDerivedStateFromProps == null && m3 !== y3 && h2.componentWillReceiveProps != null && h2.componentWillReceiveProps(m3, x3), !h2.__e && h2.shouldComponentUpdate != null && h2.shouldComponentUpdate(m3, h2.__s, x3) === false || u3.__v === i3.__v) {
            h2.props = m3, h2.state = h2.__s, u3.__v !== i3.__v && (h2.__d = false), h2.__v = u3, u3.__e = i3.__e, u3.__k = i3.__k, u3.__k.forEach(function(n3) {
              n3 && (n3.__ = u3);
            }), h2.__h.length && f3.push(h2);
            break n;
          }
          h2.componentWillUpdate != null && h2.componentWillUpdate(m3, h2.__s, x3), h2.componentDidUpdate != null && h2.__h.push(function() {
            h2.componentDidUpdate(y3, p2, k3);
          });
        }
        h2.context = x3, h2.props = m3, h2.state = h2.__s, (s2 = l.__r) && s2(u3), h2.__d = false, h2.__v = u3, h2.__P = n2, s2 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s, h2.getChildContext != null && (t3 = a(a({}, t3), h2.getChildContext())), v3 || h2.getSnapshotBeforeUpdate == null || (k3 = h2.getSnapshotBeforeUpdate(y3, p2)), A = s2 != null && s2.type === d && s2.key == null ? s2.props.children : s2, w(n2, Array.isArray(A) ? A : [A], u3, i3, t3, r3, o3, f3, e3, c3), h2.base = u3.__e, u3.__h = null, h2.__h.length && f3.push(h2), b3 && (h2.__E = h2.__ = null), h2.__e = false;
      } else
        o3 == null && u3.__v === i3.__v ? (u3.__k = i3.__k, u3.__e = i3.__e) : u3.__e = L(i3.__e, u3, i3, t3, r3, o3, f3, c3);
    (s2 = l.diffed) && s2(u3);
  } catch (n3) {
    u3.__v = null, (c3 || o3 != null) && (u3.__e = e3, u3.__h = !!c3, o3[o3.indexOf(e3)] = null), l.__e(n3, u3, i3);
  }
}
function z(n2, u3) {
  l.__c && l.__c(u3, n2), n2.some(function(u4) {
    try {
      n2 = u4.__h, u4.__h = [], n2.some(function(n3) {
        n3.call(u4);
      });
    } catch (n3) {
      l.__e(n3, u4.__v);
    }
  });
}
function L(l3, u3, i3, t3, r3, o3, f3, c3) {
  var s2, a3, v3, y3 = i3.props, p2 = u3.props, d2 = u3.type, _2 = 0;
  if (d2 === "svg" && (r3 = true), o3 != null) {
    for (; _2 < o3.length; _2++)
      if ((s2 = o3[_2]) && (s2 === l3 || (d2 ? s2.localName == d2 : s2.nodeType == 3))) {
        l3 = s2, o3[_2] = null;
        break;
      }
  }
  if (l3 == null) {
    if (d2 === null)
      return document.createTextNode(p2);
    l3 = r3 ? document.createElementNS("http://www.w3.org/2000/svg", d2) : document.createElement(d2, p2.is && p2), o3 = null, c3 = false;
  }
  if (d2 === null)
    y3 === p2 || c3 && l3.data === p2 || (l3.data = p2);
  else {
    if (o3 = o3 && n.call(l3.childNodes), a3 = (y3 = i3.props || e).dangerouslySetInnerHTML, v3 = p2.dangerouslySetInnerHTML, !c3) {
      if (o3 != null)
        for (y3 = {}, _2 = 0; _2 < l3.attributes.length; _2++)
          y3[l3.attributes[_2].name] = l3.attributes[_2].value;
      (v3 || a3) && (v3 && (a3 && v3.__html == a3.__html || v3.__html === l3.innerHTML) || (l3.innerHTML = v3 && v3.__html || ""));
    }
    if (C(l3, p2, y3, r3, c3), v3)
      u3.__k = [];
    else if (_2 = u3.props.children, w(l3, Array.isArray(_2) ? _2 : [_2], u3, i3, t3, r3 && d2 !== "foreignObject", o3, f3, o3 ? o3[0] : i3.__k && k(i3, 0), c3), o3 != null)
      for (_2 = o3.length; _2--; )
        o3[_2] != null && h(o3[_2]);
    c3 || ("value" in p2 && (_2 = p2.value) !== void 0 && (_2 !== l3.value || d2 === "progress" && !_2) && H(l3, "value", _2, y3.value, false), "checked" in p2 && (_2 = p2.checked) !== void 0 && _2 !== l3.checked && H(l3, "checked", _2, y3.checked, false));
  }
  return l3;
}
function M(n2, u3, i3) {
  try {
    typeof n2 == "function" ? n2(u3) : n2.current = u3;
  } catch (n3) {
    l.__e(n3, i3);
  }
}
function N(n2, u3, i3) {
  var t3, r3;
  if (l.unmount && l.unmount(n2), (t3 = n2.ref) && (t3.current && t3.current !== n2.__e || M(t3, null, u3)), (t3 = n2.__c) != null) {
    if (t3.componentWillUnmount)
      try {
        t3.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u3);
      }
    t3.base = t3.__P = null;
  }
  if (t3 = n2.__k)
    for (r3 = 0; r3 < t3.length; r3++)
      t3[r3] && N(t3[r3], u3, typeof n2.type != "function");
  i3 || n2.__e == null || h(n2.__e), n2.__e = n2.__d = void 0;
}
function O(n2, l3, u3) {
  return this.constructor(n2, u3);
}
function S(u3, i3, t3) {
  var r3, o3, f3;
  l.__ && l.__(u3, i3), o3 = (r3 = typeof t3 == "function") ? null : t3 && t3.__k || i3.__k, f3 = [], j(i3, u3 = (!r3 && t3 || i3).__k = v(d, null, [u3]), o3 || e, e, i3.ownerSVGElement !== void 0, !r3 && t3 ? [t3] : o3 ? null : i3.firstChild ? n.call(i3.childNodes) : null, f3, !r3 && t3 ? t3 : o3 ? o3.__e : i3.firstChild, r3), z(f3, u3);
}
function D(n2, l3) {
  var u3 = { __c: l3 = "__cC" + f++, __: n2, Consumer: function(n3, l4) {
    return n3.children(l4);
  }, Provider: function(n3) {
    var u4, i3;
    return this.getChildContext || (u4 = [], (i3 = {})[l3] = this, this.getChildContext = function() {
      return i3;
    }, this.shouldComponentUpdate = function(n4) {
      this.props.value !== n4.value && u4.some(m);
    }, this.sub = function(n4) {
      u4.push(n4);
      var l4 = n4.componentWillUnmount;
      n4.componentWillUnmount = function() {
        u4.splice(u4.indexOf(n4), 1), l4 && l4.call(n4);
      };
    }), n3.children;
  } };
  return u3.Provider.__ = u3.Consumer.contextType = u3;
}
n = c.slice, l = { __e: function(n2, l3) {
  for (var u3, i3, t3; l3 = l3.__; )
    if ((u3 = l3.__c) && !u3.__)
      try {
        if ((i3 = u3.constructor) && i3.getDerivedStateFromError != null && (u3.setState(i3.getDerivedStateFromError(n2)), t3 = u3.__d), u3.componentDidCatch != null && (u3.componentDidCatch(n2), t3 = u3.__d), t3)
          return u3.__E = u3;
      } catch (l4) {
        n2 = l4;
      }
  throw n2;
} }, u = 0, i = function(n2) {
  return n2 != null && n2.constructor === void 0;
}, _.prototype.setState = function(n2, l3) {
  var u3;
  u3 = this.__s != null && this.__s !== this.state ? this.__s : this.__s = a({}, this.state), typeof n2 == "function" && (n2 = n2(a({}, u3), this.props)), n2 && a(u3, n2), n2 != null && this.__v && (l3 && this.__h.push(l3), m(this));
}, _.prototype.forceUpdate = function(n2) {
  this.__v && (this.__e = true, n2 && this.__h.push(n2), m(this));
}, _.prototype.render = d, t = [], r = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, g.__r = 0, f = 0;

// node_modules/preact/hooks/dist/hooks.module.js
var t2;
var u2;
var r2;
var o2 = 0;
var i2 = [];
var c2 = l.__b;
var f2 = l.__r;
var e2 = l.diffed;
var a2 = l.__c;
var v2 = l.unmount;
function m2(t3, r3) {
  l.__h && l.__h(u2, t3, o2 || r3), o2 = 0;
  var i3 = u2.__H || (u2.__H = { __: [], __h: [] });
  return t3 >= i3.__.length && i3.__.push({}), i3.__[t3];
}
function l2(n2) {
  return o2 = 1, p(w2, n2);
}
function p(n2, r3, o3) {
  var i3 = m2(t2++, 2);
  return i3.t = n2, i3.__c || (i3.__ = [o3 ? o3(r3) : w2(void 0, r3), function(n3) {
    var t3 = i3.t(i3.__[0], n3);
    i3.__[0] !== t3 && (i3.__ = [t3, i3.__[1]], i3.__c.setState({}));
  }], i3.__c = u2), i3.__;
}
function y2(r3, o3) {
  var i3 = m2(t2++, 3);
  !l.__s && k2(i3.__H, o3) && (i3.__ = r3, i3.__H = o3, u2.__H.__h.push(i3));
}
function T2(n2) {
  var r3 = u2.context[n2.__c], o3 = m2(t2++, 9);
  return o3.c = n2, r3 ? (o3.__ == null && (o3.__ = true, r3.sub(u2)), r3.props.value) : n2.__;
}
function x2() {
  i2.forEach(function(t3) {
    if (t3.__P)
      try {
        t3.__H.__h.forEach(g2), t3.__H.__h.forEach(j2), t3.__H.__h = [];
      } catch (u3) {
        t3.__H.__h = [], l.__e(u3, t3.__v);
      }
  }), i2 = [];
}
l.__b = function(n2) {
  u2 = null, c2 && c2(n2);
}, l.__r = function(n2) {
  f2 && f2(n2), t2 = 0;
  var r3 = (u2 = n2.__c).__H;
  r3 && (r3.__h.forEach(g2), r3.__h.forEach(j2), r3.__h = []);
}, l.diffed = function(t3) {
  e2 && e2(t3);
  var o3 = t3.__c;
  o3 && o3.__H && o3.__H.__h.length && (i2.push(o3) !== 1 && r2 === l.requestAnimationFrame || ((r2 = l.requestAnimationFrame) || function(n2) {
    var t4, u3 = function() {
      clearTimeout(r3), b2 && cancelAnimationFrame(t4), setTimeout(n2);
    }, r3 = setTimeout(u3, 100);
    b2 && (t4 = requestAnimationFrame(u3));
  })(x2)), u2 = null;
}, l.__c = function(t3, u3) {
  u3.some(function(t4) {
    try {
      t4.__h.forEach(g2), t4.__h = t4.__h.filter(function(n2) {
        return !n2.__ || j2(n2);
      });
    } catch (r3) {
      u3.some(function(n2) {
        n2.__h && (n2.__h = []);
      }), u3 = [], l.__e(r3, t4.__v);
    }
  }), a2 && a2(t3, u3);
}, l.unmount = function(t3) {
  v2 && v2(t3);
  var u3 = t3.__c;
  if (u3 && u3.__H)
    try {
      u3.__H.__.forEach(g2);
    } catch (t4) {
      l.__e(t4, u3.__v);
    }
};
var b2 = typeof requestAnimationFrame == "function";
function g2(n2) {
  var t3 = u2;
  typeof n2.__c == "function" && n2.__c(), u2 = t3;
}
function j2(n2) {
  var t3 = u2;
  n2.__c = n2.__(), u2 = t3;
}
function k2(n2, t3) {
  return !n2 || n2.length !== t3.length || t3.some(function(t4, u3) {
    return t4 !== n2[u3];
  });
}
function w2(n2, t3) {
  return typeof t3 == "function" ? t3(n2) : t3;
}

// src/plugins/helpers/theme.ts
var colors = {
  muted: "#838383",
  gray: "#aaaaaa",
  background: "#151515",
  backgrounddark: "#252525",
  border: "#777",
  borderlight: "#5f5f5f",
  blueBackground: "#0a0a23",
  dfblue: "#00ADE1",
  dfgreen: "#00DC82",
  dfred: "#FF6492",
  dfyellow: "#e8e228",
  dfpurple: "#9189d9",
  dfwhite: "#ffffff",
  dfblack: "#000000",
  dfrare: "#6b68ff",
  dfepic: "#c13cff",
  dflegendary: "#f8b73e",
  dfmythic: "#ff44b7"
};

// src/plugins/components/Button.tsx
function Button({
  children = "",
  style = {},
  theme = "default",
  onClick = () => {
  },
  disabled = false
}) {
  const [isActive, setIsActive] = l2(false);
  const onClickAndDeactivate = () => {
    setIsActive(false);
    onClick();
  };
  return /* @__PURE__ */ v("button", {
    style: { ...styleButton(theme, isActive, disabled), ...style },
    onMouseEnter: () => setIsActive(true),
    onMouseLeave: () => setIsActive(false),
    onClick: onClickAndDeactivate,
    disabled
  }, children);
}
function styleButton(theme, isActive, disabled) {
  const styleBase = {
    padding: "2px 8px",
    border: 0,
    color: isActive ? colors.dfblack : colors.gray,
    outline: "none",
    cursor: disabled ? "default" : "pointer"
  };
  return { ...styleBase, ...themeButton(theme, isActive) };
}
function themeButton(theme, isActive) {
  switch (theme) {
    case "blue":
    case "info":
      return {
        background: isActive ? colors.dfblue : colors.backgrounddark
      };
    case "yellow":
    case "warning":
      return {
        background: isActive ? colors.dfyellow : colors.backgrounddark
      };
    case "green":
    case "success":
      return {
        background: isActive ? colors.dfgreen : colors.backgrounddark
      };
    case "red":
    case "danger":
      return {
        background: isActive ? colors.dfred : colors.backgrounddark
      };
    case "gray":
    case "default":
    default:
      return {
        background: isActive ? colors.muted : colors.backgrounddark
      };
  }
}

// node_modules/ethers/lib.esm/ethers.js
var ethers_exports = {};
__export(ethers_exports, {
  BaseContract: () => BaseContract,
  BigNumber: () => BigNumber,
  Contract: () => Contract,
  ContractFactory: () => ContractFactory,
  FixedNumber: () => FixedNumber,
  Signer: () => Signer,
  VoidSigner: () => VoidSigner,
  Wallet: () => Wallet,
  Wordlist: () => Wordlist,
  constants: () => lib_exports2,
  errors: () => ErrorCode,
  getDefaultProvider: () => getDefaultProvider,
  logger: () => logger45,
  providers: () => lib_exports4,
  utils: () => utils_exports,
  version: () => version26,
  wordlists: () => wordlists
});

// node_modules/@ethersproject/bignumber/lib.esm/bignumber.js
var import_bn = __toModule(require_bn());

// node_modules/@ethersproject/logger/lib.esm/_version.js
var version = "logger/5.5.0";

// node_modules/@ethersproject/logger/lib.esm/index.js
"use strict";
var _permanentCensorErrors = false;
var _censorErrors = false;
var LogLevels = { debug: 1, "default": 2, info: 2, warning: 3, error: 4, off: 5 };
var _logLevel = LogLevels["default"];
var _globalLogger = null;
function _checkNormalize() {
  try {
    const missing = [];
    ["NFD", "NFC", "NFKD", "NFKC"].forEach((form) => {
      try {
        if ("test".normalize(form) !== "test") {
          throw new Error("bad normalize");
        }
        ;
      } catch (error) {
        missing.push(form);
      }
    });
    if (missing.length) {
      throw new Error("missing " + missing.join(", "));
    }
    if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769)) {
      throw new Error("broken implementation");
    }
  } catch (error) {
    return error.message;
  }
  return null;
}
var _normalizeError = _checkNormalize();
var LogLevel;
(function(LogLevel2) {
  LogLevel2["DEBUG"] = "DEBUG";
  LogLevel2["INFO"] = "INFO";
  LogLevel2["WARNING"] = "WARNING";
  LogLevel2["ERROR"] = "ERROR";
  LogLevel2["OFF"] = "OFF";
})(LogLevel || (LogLevel = {}));
var ErrorCode;
(function(ErrorCode2) {
  ErrorCode2["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
  ErrorCode2["NOT_IMPLEMENTED"] = "NOT_IMPLEMENTED";
  ErrorCode2["UNSUPPORTED_OPERATION"] = "UNSUPPORTED_OPERATION";
  ErrorCode2["NETWORK_ERROR"] = "NETWORK_ERROR";
  ErrorCode2["SERVER_ERROR"] = "SERVER_ERROR";
  ErrorCode2["TIMEOUT"] = "TIMEOUT";
  ErrorCode2["BUFFER_OVERRUN"] = "BUFFER_OVERRUN";
  ErrorCode2["NUMERIC_FAULT"] = "NUMERIC_FAULT";
  ErrorCode2["MISSING_NEW"] = "MISSING_NEW";
  ErrorCode2["INVALID_ARGUMENT"] = "INVALID_ARGUMENT";
  ErrorCode2["MISSING_ARGUMENT"] = "MISSING_ARGUMENT";
  ErrorCode2["UNEXPECTED_ARGUMENT"] = "UNEXPECTED_ARGUMENT";
  ErrorCode2["CALL_EXCEPTION"] = "CALL_EXCEPTION";
  ErrorCode2["INSUFFICIENT_FUNDS"] = "INSUFFICIENT_FUNDS";
  ErrorCode2["NONCE_EXPIRED"] = "NONCE_EXPIRED";
  ErrorCode2["REPLACEMENT_UNDERPRICED"] = "REPLACEMENT_UNDERPRICED";
  ErrorCode2["UNPREDICTABLE_GAS_LIMIT"] = "UNPREDICTABLE_GAS_LIMIT";
  ErrorCode2["TRANSACTION_REPLACED"] = "TRANSACTION_REPLACED";
})(ErrorCode || (ErrorCode = {}));
var HEX = "0123456789abcdef";
var Logger = class {
  constructor(version27) {
    Object.defineProperty(this, "version", {
      enumerable: true,
      value: version27,
      writable: false
    });
  }
  _log(logLevel, args) {
    const level = logLevel.toLowerCase();
    if (LogLevels[level] == null) {
      this.throwArgumentError("invalid log level name", "logLevel", logLevel);
    }
    if (_logLevel > LogLevels[level]) {
      return;
    }
    console.log.apply(console, args);
  }
  debug(...args) {
    this._log(Logger.levels.DEBUG, args);
  }
  info(...args) {
    this._log(Logger.levels.INFO, args);
  }
  warn(...args) {
    this._log(Logger.levels.WARNING, args);
  }
  makeError(message, code, params) {
    if (_censorErrors) {
      return this.makeError("censored error", code, {});
    }
    if (!code) {
      code = Logger.errors.UNKNOWN_ERROR;
    }
    if (!params) {
      params = {};
    }
    const messageDetails = [];
    Object.keys(params).forEach((key2) => {
      const value = params[key2];
      try {
        if (value instanceof Uint8Array) {
          let hex = "";
          for (let i3 = 0; i3 < value.length; i3++) {
            hex += HEX[value[i3] >> 4];
            hex += HEX[value[i3] & 15];
          }
          messageDetails.push(key2 + "=Uint8Array(0x" + hex + ")");
        } else {
          messageDetails.push(key2 + "=" + JSON.stringify(value));
        }
      } catch (error2) {
        messageDetails.push(key2 + "=" + JSON.stringify(params[key2].toString()));
      }
    });
    messageDetails.push(`code=${code}`);
    messageDetails.push(`version=${this.version}`);
    const reason = message;
    if (messageDetails.length) {
      message += " (" + messageDetails.join(", ") + ")";
    }
    const error = new Error(message);
    error.reason = reason;
    error.code = code;
    Object.keys(params).forEach(function(key2) {
      error[key2] = params[key2];
    });
    return error;
  }
  throwError(message, code, params) {
    throw this.makeError(message, code, params);
  }
  throwArgumentError(message, name2, value) {
    return this.throwError(message, Logger.errors.INVALID_ARGUMENT, {
      argument: name2,
      value
    });
  }
  assert(condition, message, code, params) {
    if (!!condition) {
      return;
    }
    this.throwError(message, code, params);
  }
  assertArgument(condition, message, name2, value) {
    if (!!condition) {
      return;
    }
    this.throwArgumentError(message, name2, value);
  }
  checkNormalize(message) {
    if (message == null) {
      message = "platform missing String.prototype.normalize";
    }
    if (_normalizeError) {
      this.throwError("platform missing String.prototype.normalize", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "String.prototype.normalize",
        form: _normalizeError
      });
    }
  }
  checkSafeUint53(value, message) {
    if (typeof value !== "number") {
      return;
    }
    if (message == null) {
      message = "value not safe";
    }
    if (value < 0 || value >= 9007199254740991) {
      this.throwError(message, Logger.errors.NUMERIC_FAULT, {
        operation: "checkSafeInteger",
        fault: "out-of-safe-range",
        value
      });
    }
    if (value % 1) {
      this.throwError(message, Logger.errors.NUMERIC_FAULT, {
        operation: "checkSafeInteger",
        fault: "non-integer",
        value
      });
    }
  }
  checkArgumentCount(count, expectedCount, message) {
    if (message) {
      message = ": " + message;
    } else {
      message = "";
    }
    if (count < expectedCount) {
      this.throwError("missing argument" + message, Logger.errors.MISSING_ARGUMENT, {
        count,
        expectedCount
      });
    }
    if (count > expectedCount) {
      this.throwError("too many arguments" + message, Logger.errors.UNEXPECTED_ARGUMENT, {
        count,
        expectedCount
      });
    }
  }
  checkNew(target, kind) {
    if (target === Object || target == null) {
      this.throwError("missing new", Logger.errors.MISSING_NEW, { name: kind.name });
    }
  }
  checkAbstract(target, kind) {
    if (target === kind) {
      this.throwError("cannot instantiate abstract class " + JSON.stringify(kind.name) + " directly; use a sub-class", Logger.errors.UNSUPPORTED_OPERATION, { name: target.name, operation: "new" });
    } else if (target === Object || target == null) {
      this.throwError("missing new", Logger.errors.MISSING_NEW, { name: kind.name });
    }
  }
  static globalLogger() {
    if (!_globalLogger) {
      _globalLogger = new Logger(version);
    }
    return _globalLogger;
  }
  static setCensorship(censorship, permanent) {
    if (!censorship && permanent) {
      this.globalLogger().throwError("cannot permanently disable censorship", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "setCensorship"
      });
    }
    if (_permanentCensorErrors) {
      if (!censorship) {
        return;
      }
      this.globalLogger().throwError("error censorship permanent", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "setCensorship"
      });
    }
    _censorErrors = !!censorship;
    _permanentCensorErrors = !!permanent;
  }
  static setLogLevel(logLevel) {
    const level = LogLevels[logLevel.toLowerCase()];
    if (level == null) {
      Logger.globalLogger().warn("invalid log level - " + logLevel);
      return;
    }
    _logLevel = level;
  }
  static from(version27) {
    return new Logger(version27);
  }
};
Logger.errors = ErrorCode;
Logger.levels = LogLevel;

// node_modules/@ethersproject/bytes/lib.esm/_version.js
var version2 = "bytes/5.5.0";

// node_modules/@ethersproject/bytes/lib.esm/index.js
"use strict";
var logger = new Logger(version2);
function isHexable(value) {
  return !!value.toHexString;
}
function addSlice(array) {
  if (array.slice) {
    return array;
  }
  array.slice = function() {
    const args = Array.prototype.slice.call(arguments);
    return addSlice(new Uint8Array(Array.prototype.slice.apply(array, args)));
  };
  return array;
}
function isBytesLike(value) {
  return isHexString(value) && !(value.length % 2) || isBytes(value);
}
function isInteger(value) {
  return typeof value === "number" && value == value && value % 1 === 0;
}
function isBytes(value) {
  if (value == null) {
    return false;
  }
  if (value.constructor === Uint8Array) {
    return true;
  }
  if (typeof value === "string") {
    return false;
  }
  if (!isInteger(value.length) || value.length < 0) {
    return false;
  }
  for (let i3 = 0; i3 < value.length; i3++) {
    const v3 = value[i3];
    if (!isInteger(v3) || v3 < 0 || v3 >= 256) {
      return false;
    }
  }
  return true;
}
function arrayify(value, options) {
  if (!options) {
    options = {};
  }
  if (typeof value === "number") {
    logger.checkSafeUint53(value, "invalid arrayify value");
    const result = [];
    while (value) {
      result.unshift(value & 255);
      value = parseInt(String(value / 256));
    }
    if (result.length === 0) {
      result.push(0);
    }
    return addSlice(new Uint8Array(result));
  }
  if (options.allowMissingPrefix && typeof value === "string" && value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  }
  if (isHexable(value)) {
    value = value.toHexString();
  }
  if (isHexString(value)) {
    let hex = value.substring(2);
    if (hex.length % 2) {
      if (options.hexPad === "left") {
        hex = "0x0" + hex.substring(2);
      } else if (options.hexPad === "right") {
        hex += "0";
      } else {
        logger.throwArgumentError("hex data is odd-length", "value", value);
      }
    }
    const result = [];
    for (let i3 = 0; i3 < hex.length; i3 += 2) {
      result.push(parseInt(hex.substring(i3, i3 + 2), 16));
    }
    return addSlice(new Uint8Array(result));
  }
  if (isBytes(value)) {
    return addSlice(new Uint8Array(value));
  }
  return logger.throwArgumentError("invalid arrayify value", "value", value);
}
function concat(items) {
  const objects = items.map((item) => arrayify(item));
  const length = objects.reduce((accum, item) => accum + item.length, 0);
  const result = new Uint8Array(length);
  objects.reduce((offset, object) => {
    result.set(object, offset);
    return offset + object.length;
  }, 0);
  return addSlice(result);
}
function stripZeros(value) {
  let result = arrayify(value);
  if (result.length === 0) {
    return result;
  }
  let start = 0;
  while (start < result.length && result[start] === 0) {
    start++;
  }
  if (start) {
    result = result.slice(start);
  }
  return result;
}
function zeroPad(value, length) {
  value = arrayify(value);
  if (value.length > length) {
    logger.throwArgumentError("value out of range", "value", arguments[0]);
  }
  const result = new Uint8Array(length);
  result.set(value, length - value.length);
  return addSlice(result);
}
function isHexString(value, length) {
  if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }
  if (length && value.length !== 2 + 2 * length) {
    return false;
  }
  return true;
}
var HexCharacters = "0123456789abcdef";
function hexlify(value, options) {
  if (!options) {
    options = {};
  }
  if (typeof value === "number") {
    logger.checkSafeUint53(value, "invalid hexlify value");
    let hex = "";
    while (value) {
      hex = HexCharacters[value & 15] + hex;
      value = Math.floor(value / 16);
    }
    if (hex.length) {
      if (hex.length % 2) {
        hex = "0" + hex;
      }
      return "0x" + hex;
    }
    return "0x00";
  }
  if (typeof value === "bigint") {
    value = value.toString(16);
    if (value.length % 2) {
      return "0x0" + value;
    }
    return "0x" + value;
  }
  if (options.allowMissingPrefix && typeof value === "string" && value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  }
  if (isHexable(value)) {
    return value.toHexString();
  }
  if (isHexString(value)) {
    if (value.length % 2) {
      if (options.hexPad === "left") {
        value = "0x0" + value.substring(2);
      } else if (options.hexPad === "right") {
        value += "0";
      } else {
        logger.throwArgumentError("hex data is odd-length", "value", value);
      }
    }
    return value.toLowerCase();
  }
  if (isBytes(value)) {
    let result = "0x";
    for (let i3 = 0; i3 < value.length; i3++) {
      let v3 = value[i3];
      result += HexCharacters[(v3 & 240) >> 4] + HexCharacters[v3 & 15];
    }
    return result;
  }
  return logger.throwArgumentError("invalid hexlify value", "value", value);
}
function hexDataLength(data) {
  if (typeof data !== "string") {
    data = hexlify(data);
  } else if (!isHexString(data) || data.length % 2) {
    return null;
  }
  return (data.length - 2) / 2;
}
function hexDataSlice(data, offset, endOffset) {
  if (typeof data !== "string") {
    data = hexlify(data);
  } else if (!isHexString(data) || data.length % 2) {
    logger.throwArgumentError("invalid hexData", "value", data);
  }
  offset = 2 + 2 * offset;
  if (endOffset != null) {
    return "0x" + data.substring(offset, 2 + 2 * endOffset);
  }
  return "0x" + data.substring(offset);
}
function hexConcat(items) {
  let result = "0x";
  items.forEach((item) => {
    result += hexlify(item).substring(2);
  });
  return result;
}
function hexValue(value) {
  const trimmed = hexStripZeros(hexlify(value, { hexPad: "left" }));
  if (trimmed === "0x") {
    return "0x0";
  }
  return trimmed;
}
function hexStripZeros(value) {
  if (typeof value !== "string") {
    value = hexlify(value);
  }
  if (!isHexString(value)) {
    logger.throwArgumentError("invalid hex string", "value", value);
  }
  value = value.substring(2);
  let offset = 0;
  while (offset < value.length && value[offset] === "0") {
    offset++;
  }
  return "0x" + value.substring(offset);
}
function hexZeroPad(value, length) {
  if (typeof value !== "string") {
    value = hexlify(value);
  } else if (!isHexString(value)) {
    logger.throwArgumentError("invalid hex string", "value", value);
  }
  if (value.length > 2 * length + 2) {
    logger.throwArgumentError("value out of range", "value", arguments[1]);
  }
  while (value.length < 2 * length + 2) {
    value = "0x0" + value.substring(2);
  }
  return value;
}
function splitSignature(signature2) {
  const result = {
    r: "0x",
    s: "0x",
    _vs: "0x",
    recoveryParam: 0,
    v: 0
  };
  if (isBytesLike(signature2)) {
    const bytes = arrayify(signature2);
    if (bytes.length !== 65) {
      logger.throwArgumentError("invalid signature string; must be 65 bytes", "signature", signature2);
    }
    result.r = hexlify(bytes.slice(0, 32));
    result.s = hexlify(bytes.slice(32, 64));
    result.v = bytes[64];
    if (result.v < 27) {
      if (result.v === 0 || result.v === 1) {
        result.v += 27;
      } else {
        logger.throwArgumentError("signature invalid v byte", "signature", signature2);
      }
    }
    result.recoveryParam = 1 - result.v % 2;
    if (result.recoveryParam) {
      bytes[32] |= 128;
    }
    result._vs = hexlify(bytes.slice(32, 64));
  } else {
    result.r = signature2.r;
    result.s = signature2.s;
    result.v = signature2.v;
    result.recoveryParam = signature2.recoveryParam;
    result._vs = signature2._vs;
    if (result._vs != null) {
      const vs2 = zeroPad(arrayify(result._vs), 32);
      result._vs = hexlify(vs2);
      const recoveryParam = vs2[0] >= 128 ? 1 : 0;
      if (result.recoveryParam == null) {
        result.recoveryParam = recoveryParam;
      } else if (result.recoveryParam !== recoveryParam) {
        logger.throwArgumentError("signature recoveryParam mismatch _vs", "signature", signature2);
      }
      vs2[0] &= 127;
      const s2 = hexlify(vs2);
      if (result.s == null) {
        result.s = s2;
      } else if (result.s !== s2) {
        logger.throwArgumentError("signature v mismatch _vs", "signature", signature2);
      }
    }
    if (result.recoveryParam == null) {
      if (result.v == null) {
        logger.throwArgumentError("signature missing v and recoveryParam", "signature", signature2);
      } else if (result.v === 0 || result.v === 1) {
        result.recoveryParam = result.v;
      } else {
        result.recoveryParam = 1 - result.v % 2;
      }
    } else {
      if (result.v == null) {
        result.v = 27 + result.recoveryParam;
      } else {
        const recId = result.v === 0 || result.v === 1 ? result.v : 1 - result.v % 2;
        if (result.recoveryParam !== recId) {
          logger.throwArgumentError("signature recoveryParam mismatch v", "signature", signature2);
        }
      }
    }
    if (result.r == null || !isHexString(result.r)) {
      logger.throwArgumentError("signature missing or invalid r", "signature", signature2);
    } else {
      result.r = hexZeroPad(result.r, 32);
    }
    if (result.s == null || !isHexString(result.s)) {
      logger.throwArgumentError("signature missing or invalid s", "signature", signature2);
    } else {
      result.s = hexZeroPad(result.s, 32);
    }
    const vs = arrayify(result.s);
    if (vs[0] >= 128) {
      logger.throwArgumentError("signature s out of range", "signature", signature2);
    }
    if (result.recoveryParam) {
      vs[0] |= 128;
    }
    const _vs = hexlify(vs);
    if (result._vs) {
      if (!isHexString(result._vs)) {
        logger.throwArgumentError("signature invalid _vs", "signature", signature2);
      }
      result._vs = hexZeroPad(result._vs, 32);
    }
    if (result._vs == null) {
      result._vs = _vs;
    } else if (result._vs !== _vs) {
      logger.throwArgumentError("signature _vs mismatch v and s", "signature", signature2);
    }
  }
  return result;
}
function joinSignature(signature2) {
  signature2 = splitSignature(signature2);
  return hexlify(concat([
    signature2.r,
    signature2.s,
    signature2.recoveryParam ? "0x1c" : "0x1b"
  ]));
}

// node_modules/@ethersproject/bignumber/lib.esm/_version.js
var version3 = "bignumber/5.5.0";

// node_modules/@ethersproject/bignumber/lib.esm/bignumber.js
"use strict";
var BN = import_bn.default.BN;
var logger2 = new Logger(version3);
var _constructorGuard = {};
var MAX_SAFE = 9007199254740991;
function isBigNumberish(value) {
  return value != null && (BigNumber.isBigNumber(value) || typeof value === "number" && value % 1 === 0 || typeof value === "string" && !!value.match(/^-?[0-9]+$/) || isHexString(value) || typeof value === "bigint" || isBytes(value));
}
var _warnedToStringRadix = false;
var BigNumber = class {
  constructor(constructorGuard, hex) {
    logger2.checkNew(new.target, BigNumber);
    if (constructorGuard !== _constructorGuard) {
      logger2.throwError("cannot call constructor directly; use BigNumber.from", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "new (BigNumber)"
      });
    }
    this._hex = hex;
    this._isBigNumber = true;
    Object.freeze(this);
  }
  fromTwos(value) {
    return toBigNumber(toBN(this).fromTwos(value));
  }
  toTwos(value) {
    return toBigNumber(toBN(this).toTwos(value));
  }
  abs() {
    if (this._hex[0] === "-") {
      return BigNumber.from(this._hex.substring(1));
    }
    return this;
  }
  add(other) {
    return toBigNumber(toBN(this).add(toBN(other)));
  }
  sub(other) {
    return toBigNumber(toBN(this).sub(toBN(other)));
  }
  div(other) {
    const o3 = BigNumber.from(other);
    if (o3.isZero()) {
      throwFault("division by zero", "div");
    }
    return toBigNumber(toBN(this).div(toBN(other)));
  }
  mul(other) {
    return toBigNumber(toBN(this).mul(toBN(other)));
  }
  mod(other) {
    const value = toBN(other);
    if (value.isNeg()) {
      throwFault("cannot modulo negative values", "mod");
    }
    return toBigNumber(toBN(this).umod(value));
  }
  pow(other) {
    const value = toBN(other);
    if (value.isNeg()) {
      throwFault("cannot raise to negative values", "pow");
    }
    return toBigNumber(toBN(this).pow(value));
  }
  and(other) {
    const value = toBN(other);
    if (this.isNegative() || value.isNeg()) {
      throwFault("cannot 'and' negative values", "and");
    }
    return toBigNumber(toBN(this).and(value));
  }
  or(other) {
    const value = toBN(other);
    if (this.isNegative() || value.isNeg()) {
      throwFault("cannot 'or' negative values", "or");
    }
    return toBigNumber(toBN(this).or(value));
  }
  xor(other) {
    const value = toBN(other);
    if (this.isNegative() || value.isNeg()) {
      throwFault("cannot 'xor' negative values", "xor");
    }
    return toBigNumber(toBN(this).xor(value));
  }
  mask(value) {
    if (this.isNegative() || value < 0) {
      throwFault("cannot mask negative values", "mask");
    }
    return toBigNumber(toBN(this).maskn(value));
  }
  shl(value) {
    if (this.isNegative() || value < 0) {
      throwFault("cannot shift negative values", "shl");
    }
    return toBigNumber(toBN(this).shln(value));
  }
  shr(value) {
    if (this.isNegative() || value < 0) {
      throwFault("cannot shift negative values", "shr");
    }
    return toBigNumber(toBN(this).shrn(value));
  }
  eq(other) {
    return toBN(this).eq(toBN(other));
  }
  lt(other) {
    return toBN(this).lt(toBN(other));
  }
  lte(other) {
    return toBN(this).lte(toBN(other));
  }
  gt(other) {
    return toBN(this).gt(toBN(other));
  }
  gte(other) {
    return toBN(this).gte(toBN(other));
  }
  isNegative() {
    return this._hex[0] === "-";
  }
  isZero() {
    return toBN(this).isZero();
  }
  toNumber() {
    try {
      return toBN(this).toNumber();
    } catch (error) {
      throwFault("overflow", "toNumber", this.toString());
    }
    return null;
  }
  toBigInt() {
    try {
      return BigInt(this.toString());
    } catch (e3) {
    }
    return logger2.throwError("this platform does not support BigInt", Logger.errors.UNSUPPORTED_OPERATION, {
      value: this.toString()
    });
  }
  toString() {
    if (arguments.length > 0) {
      if (arguments[0] === 10) {
        if (!_warnedToStringRadix) {
          _warnedToStringRadix = true;
          logger2.warn("BigNumber.toString does not accept any parameters; base-10 is assumed");
        }
      } else if (arguments[0] === 16) {
        logger2.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()", Logger.errors.UNEXPECTED_ARGUMENT, {});
      } else {
        logger2.throwError("BigNumber.toString does not accept parameters", Logger.errors.UNEXPECTED_ARGUMENT, {});
      }
    }
    return toBN(this).toString(10);
  }
  toHexString() {
    return this._hex;
  }
  toJSON(key2) {
    return { type: "BigNumber", hex: this.toHexString() };
  }
  static from(value) {
    if (value instanceof BigNumber) {
      return value;
    }
    if (typeof value === "string") {
      if (value.match(/^-?0x[0-9a-f]+$/i)) {
        return new BigNumber(_constructorGuard, toHex(value));
      }
      if (value.match(/^-?[0-9]+$/)) {
        return new BigNumber(_constructorGuard, toHex(new BN(value)));
      }
      return logger2.throwArgumentError("invalid BigNumber string", "value", value);
    }
    if (typeof value === "number") {
      if (value % 1) {
        throwFault("underflow", "BigNumber.from", value);
      }
      if (value >= MAX_SAFE || value <= -MAX_SAFE) {
        throwFault("overflow", "BigNumber.from", value);
      }
      return BigNumber.from(String(value));
    }
    const anyValue = value;
    if (typeof anyValue === "bigint") {
      return BigNumber.from(anyValue.toString());
    }
    if (isBytes(anyValue)) {
      return BigNumber.from(hexlify(anyValue));
    }
    if (anyValue) {
      if (anyValue.toHexString) {
        const hex = anyValue.toHexString();
        if (typeof hex === "string") {
          return BigNumber.from(hex);
        }
      } else {
        let hex = anyValue._hex;
        if (hex == null && anyValue.type === "BigNumber") {
          hex = anyValue.hex;
        }
        if (typeof hex === "string") {
          if (isHexString(hex) || hex[0] === "-" && isHexString(hex.substring(1))) {
            return BigNumber.from(hex);
          }
        }
      }
    }
    return logger2.throwArgumentError("invalid BigNumber value", "value", value);
  }
  static isBigNumber(value) {
    return !!(value && value._isBigNumber);
  }
};
function toHex(value) {
  if (typeof value !== "string") {
    return toHex(value.toString(16));
  }
  if (value[0] === "-") {
    value = value.substring(1);
    if (value[0] === "-") {
      logger2.throwArgumentError("invalid hex", "value", value);
    }
    value = toHex(value);
    if (value === "0x00") {
      return value;
    }
    return "-" + value;
  }
  if (value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  }
  if (value === "0x") {
    return "0x00";
  }
  if (value.length % 2) {
    value = "0x0" + value.substring(2);
  }
  while (value.length > 4 && value.substring(0, 4) === "0x00") {
    value = "0x" + value.substring(4);
  }
  return value;
}
function toBigNumber(value) {
  return BigNumber.from(toHex(value));
}
function toBN(value) {
  const hex = BigNumber.from(value).toHexString();
  if (hex[0] === "-") {
    return new BN("-" + hex.substring(3), 16);
  }
  return new BN(hex.substring(2), 16);
}
function throwFault(fault, operation, value) {
  const params = { fault, operation };
  if (value != null) {
    params.value = value;
  }
  return logger2.throwError(fault, Logger.errors.NUMERIC_FAULT, params);
}
function _base36To16(value) {
  return new BN(value, 36).toString(16);
}
function _base16To36(value) {
  return new BN(value, 16).toString(36);
}

// node_modules/@ethersproject/bignumber/lib.esm/fixednumber.js
"use strict";
var logger3 = new Logger(version3);
var _constructorGuard2 = {};
var Zero = BigNumber.from(0);
var NegativeOne = BigNumber.from(-1);
function throwFault2(message, fault, operation, value) {
  const params = { fault, operation };
  if (value !== void 0) {
    params.value = value;
  }
  return logger3.throwError(message, Logger.errors.NUMERIC_FAULT, params);
}
var zeros = "0";
while (zeros.length < 256) {
  zeros += zeros;
}
function getMultiplier(decimals) {
  if (typeof decimals !== "number") {
    try {
      decimals = BigNumber.from(decimals).toNumber();
    } catch (e3) {
    }
  }
  if (typeof decimals === "number" && decimals >= 0 && decimals <= 256 && !(decimals % 1)) {
    return "1" + zeros.substring(0, decimals);
  }
  return logger3.throwArgumentError("invalid decimal size", "decimals", decimals);
}
function formatFixed(value, decimals) {
  if (decimals == null) {
    decimals = 0;
  }
  const multiplier = getMultiplier(decimals);
  value = BigNumber.from(value);
  const negative = value.lt(Zero);
  if (negative) {
    value = value.mul(NegativeOne);
  }
  let fraction = value.mod(multiplier).toString();
  while (fraction.length < multiplier.length - 1) {
    fraction = "0" + fraction;
  }
  fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];
  const whole = value.div(multiplier).toString();
  if (multiplier.length === 1) {
    value = whole;
  } else {
    value = whole + "." + fraction;
  }
  if (negative) {
    value = "-" + value;
  }
  return value;
}
function parseFixed(value, decimals) {
  if (decimals == null) {
    decimals = 0;
  }
  const multiplier = getMultiplier(decimals);
  if (typeof value !== "string" || !value.match(/^-?[0-9.]+$/)) {
    logger3.throwArgumentError("invalid decimal value", "value", value);
  }
  const negative = value.substring(0, 1) === "-";
  if (negative) {
    value = value.substring(1);
  }
  if (value === ".") {
    logger3.throwArgumentError("missing value", "value", value);
  }
  const comps = value.split(".");
  if (comps.length > 2) {
    logger3.throwArgumentError("too many decimal points", "value", value);
  }
  let whole = comps[0], fraction = comps[1];
  if (!whole) {
    whole = "0";
  }
  if (!fraction) {
    fraction = "0";
  }
  while (fraction[fraction.length - 1] === "0") {
    fraction = fraction.substring(0, fraction.length - 1);
  }
  if (fraction.length > multiplier.length - 1) {
    throwFault2("fractional component exceeds decimals", "underflow", "parseFixed");
  }
  if (fraction === "") {
    fraction = "0";
  }
  while (fraction.length < multiplier.length - 1) {
    fraction += "0";
  }
  const wholeValue = BigNumber.from(whole);
  const fractionValue = BigNumber.from(fraction);
  let wei = wholeValue.mul(multiplier).add(fractionValue);
  if (negative) {
    wei = wei.mul(NegativeOne);
  }
  return wei;
}
var FixedFormat = class {
  constructor(constructorGuard, signed, width, decimals) {
    if (constructorGuard !== _constructorGuard2) {
      logger3.throwError("cannot use FixedFormat constructor; use FixedFormat.from", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "new FixedFormat"
      });
    }
    this.signed = signed;
    this.width = width;
    this.decimals = decimals;
    this.name = (signed ? "" : "u") + "fixed" + String(width) + "x" + String(decimals);
    this._multiplier = getMultiplier(decimals);
    Object.freeze(this);
  }
  static from(value) {
    if (value instanceof FixedFormat) {
      return value;
    }
    if (typeof value === "number") {
      value = `fixed128x${value}`;
    }
    let signed = true;
    let width = 128;
    let decimals = 18;
    if (typeof value === "string") {
      if (value === "fixed") {
      } else if (value === "ufixed") {
        signed = false;
      } else {
        const match = value.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);
        if (!match) {
          logger3.throwArgumentError("invalid fixed format", "format", value);
        }
        signed = match[1] !== "u";
        width = parseInt(match[2]);
        decimals = parseInt(match[3]);
      }
    } else if (value) {
      const check = (key2, type, defaultValue) => {
        if (value[key2] == null) {
          return defaultValue;
        }
        if (typeof value[key2] !== type) {
          logger3.throwArgumentError("invalid fixed format (" + key2 + " not " + type + ")", "format." + key2, value[key2]);
        }
        return value[key2];
      };
      signed = check("signed", "boolean", signed);
      width = check("width", "number", width);
      decimals = check("decimals", "number", decimals);
    }
    if (width % 8) {
      logger3.throwArgumentError("invalid fixed format width (not byte aligned)", "format.width", width);
    }
    if (decimals > 80) {
      logger3.throwArgumentError("invalid fixed format (decimals too large)", "format.decimals", decimals);
    }
    return new FixedFormat(_constructorGuard2, signed, width, decimals);
  }
};
var FixedNumber = class {
  constructor(constructorGuard, hex, value, format) {
    logger3.checkNew(new.target, FixedNumber);
    if (constructorGuard !== _constructorGuard2) {
      logger3.throwError("cannot use FixedNumber constructor; use FixedNumber.from", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "new FixedFormat"
      });
    }
    this.format = format;
    this._hex = hex;
    this._value = value;
    this._isFixedNumber = true;
    Object.freeze(this);
  }
  _checkFormat(other) {
    if (this.format.name !== other.format.name) {
      logger3.throwArgumentError("incompatible format; use fixedNumber.toFormat", "other", other);
    }
  }
  addUnsafe(other) {
    this._checkFormat(other);
    const a3 = parseFixed(this._value, this.format.decimals);
    const b3 = parseFixed(other._value, other.format.decimals);
    return FixedNumber.fromValue(a3.add(b3), this.format.decimals, this.format);
  }
  subUnsafe(other) {
    this._checkFormat(other);
    const a3 = parseFixed(this._value, this.format.decimals);
    const b3 = parseFixed(other._value, other.format.decimals);
    return FixedNumber.fromValue(a3.sub(b3), this.format.decimals, this.format);
  }
  mulUnsafe(other) {
    this._checkFormat(other);
    const a3 = parseFixed(this._value, this.format.decimals);
    const b3 = parseFixed(other._value, other.format.decimals);
    return FixedNumber.fromValue(a3.mul(b3).div(this.format._multiplier), this.format.decimals, this.format);
  }
  divUnsafe(other) {
    this._checkFormat(other);
    const a3 = parseFixed(this._value, this.format.decimals);
    const b3 = parseFixed(other._value, other.format.decimals);
    return FixedNumber.fromValue(a3.mul(this.format._multiplier).div(b3), this.format.decimals, this.format);
  }
  floor() {
    const comps = this.toString().split(".");
    if (comps.length === 1) {
      comps.push("0");
    }
    let result = FixedNumber.from(comps[0], this.format);
    const hasFraction = !comps[1].match(/^(0*)$/);
    if (this.isNegative() && hasFraction) {
      result = result.subUnsafe(ONE.toFormat(result.format));
    }
    return result;
  }
  ceiling() {
    const comps = this.toString().split(".");
    if (comps.length === 1) {
      comps.push("0");
    }
    let result = FixedNumber.from(comps[0], this.format);
    const hasFraction = !comps[1].match(/^(0*)$/);
    if (!this.isNegative() && hasFraction) {
      result = result.addUnsafe(ONE.toFormat(result.format));
    }
    return result;
  }
  round(decimals) {
    if (decimals == null) {
      decimals = 0;
    }
    const comps = this.toString().split(".");
    if (comps.length === 1) {
      comps.push("0");
    }
    if (decimals < 0 || decimals > 80 || decimals % 1) {
      logger3.throwArgumentError("invalid decimal count", "decimals", decimals);
    }
    if (comps[1].length <= decimals) {
      return this;
    }
    const factor = FixedNumber.from("1" + zeros.substring(0, decimals), this.format);
    const bump = BUMP.toFormat(this.format);
    return this.mulUnsafe(factor).addUnsafe(bump).floor().divUnsafe(factor);
  }
  isZero() {
    return this._value === "0.0" || this._value === "0";
  }
  isNegative() {
    return this._value[0] === "-";
  }
  toString() {
    return this._value;
  }
  toHexString(width) {
    if (width == null) {
      return this._hex;
    }
    if (width % 8) {
      logger3.throwArgumentError("invalid byte width", "width", width);
    }
    const hex = BigNumber.from(this._hex).fromTwos(this.format.width).toTwos(width).toHexString();
    return hexZeroPad(hex, width / 8);
  }
  toUnsafeFloat() {
    return parseFloat(this.toString());
  }
  toFormat(format) {
    return FixedNumber.fromString(this._value, format);
  }
  static fromValue(value, decimals, format) {
    if (format == null && decimals != null && !isBigNumberish(decimals)) {
      format = decimals;
      decimals = null;
    }
    if (decimals == null) {
      decimals = 0;
    }
    if (format == null) {
      format = "fixed";
    }
    return FixedNumber.fromString(formatFixed(value, decimals), FixedFormat.from(format));
  }
  static fromString(value, format) {
    if (format == null) {
      format = "fixed";
    }
    const fixedFormat = FixedFormat.from(format);
    const numeric = parseFixed(value, fixedFormat.decimals);
    if (!fixedFormat.signed && numeric.lt(Zero)) {
      throwFault2("unsigned value cannot be negative", "overflow", "value", value);
    }
    let hex = null;
    if (fixedFormat.signed) {
      hex = numeric.toTwos(fixedFormat.width).toHexString();
    } else {
      hex = numeric.toHexString();
      hex = hexZeroPad(hex, fixedFormat.width / 8);
    }
    const decimal = formatFixed(numeric, fixedFormat.decimals);
    return new FixedNumber(_constructorGuard2, hex, decimal, fixedFormat);
  }
  static fromBytes(value, format) {
    if (format == null) {
      format = "fixed";
    }
    const fixedFormat = FixedFormat.from(format);
    if (arrayify(value).length > fixedFormat.width / 8) {
      throw new Error("overflow");
    }
    let numeric = BigNumber.from(value);
    if (fixedFormat.signed) {
      numeric = numeric.fromTwos(fixedFormat.width);
    }
    const hex = numeric.toTwos((fixedFormat.signed ? 0 : 1) + fixedFormat.width).toHexString();
    const decimal = formatFixed(numeric, fixedFormat.decimals);
    return new FixedNumber(_constructorGuard2, hex, decimal, fixedFormat);
  }
  static from(value, format) {
    if (typeof value === "string") {
      return FixedNumber.fromString(value, format);
    }
    if (isBytes(value)) {
      return FixedNumber.fromBytes(value, format);
    }
    try {
      return FixedNumber.fromValue(value, 0, format);
    } catch (error) {
      if (error.code !== Logger.errors.INVALID_ARGUMENT) {
        throw error;
      }
    }
    return logger3.throwArgumentError("invalid FixedNumber value", "value", value);
  }
  static isFixedNumber(value) {
    return !!(value && value._isFixedNumber);
  }
};
var ONE = FixedNumber.from(1);
var BUMP = FixedNumber.from("0.5");

// node_modules/@ethersproject/properties/lib.esm/_version.js
var version4 = "properties/5.5.0";

// node_modules/@ethersproject/properties/lib.esm/index.js
"use strict";
var __awaiter = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var logger4 = new Logger(version4);
function defineReadOnly(object, name2, value) {
  Object.defineProperty(object, name2, {
    enumerable: true,
    value,
    writable: false
  });
}
function getStatic(ctor, key2) {
  for (let i3 = 0; i3 < 32; i3++) {
    if (ctor[key2]) {
      return ctor[key2];
    }
    if (!ctor.prototype || typeof ctor.prototype !== "object") {
      break;
    }
    ctor = Object.getPrototypeOf(ctor.prototype).constructor;
  }
  return null;
}
function resolveProperties(object) {
  return __awaiter(this, void 0, void 0, function* () {
    const promises = Object.keys(object).map((key2) => {
      const value = object[key2];
      return Promise.resolve(value).then((v3) => ({ key: key2, value: v3 }));
    });
    const results = yield Promise.all(promises);
    return results.reduce((accum, result) => {
      accum[result.key] = result.value;
      return accum;
    }, {});
  });
}
function checkProperties(object, properties) {
  if (!object || typeof object !== "object") {
    logger4.throwArgumentError("invalid object", "object", object);
  }
  Object.keys(object).forEach((key2) => {
    if (!properties[key2]) {
      logger4.throwArgumentError("invalid object key - " + key2, "transaction:" + key2, object);
    }
  });
}
function shallowCopy(object) {
  const result = {};
  for (const key2 in object) {
    result[key2] = object[key2];
  }
  return result;
}
var opaque = { bigint: true, boolean: true, "function": true, number: true, string: true };
function _isFrozen(object) {
  if (object === void 0 || object === null || opaque[typeof object]) {
    return true;
  }
  if (Array.isArray(object) || typeof object === "object") {
    if (!Object.isFrozen(object)) {
      return false;
    }
    const keys = Object.keys(object);
    for (let i3 = 0; i3 < keys.length; i3++) {
      let value = null;
      try {
        value = object[keys[i3]];
      } catch (error) {
        continue;
      }
      if (!_isFrozen(value)) {
        return false;
      }
    }
    return true;
  }
  return logger4.throwArgumentError(`Cannot deepCopy ${typeof object}`, "object", object);
}
function _deepCopy(object) {
  if (_isFrozen(object)) {
    return object;
  }
  if (Array.isArray(object)) {
    return Object.freeze(object.map((item) => deepCopy(item)));
  }
  if (typeof object === "object") {
    const result = {};
    for (const key2 in object) {
      const value = object[key2];
      if (value === void 0) {
        continue;
      }
      defineReadOnly(result, key2, deepCopy(value));
    }
    return result;
  }
  return logger4.throwArgumentError(`Cannot deepCopy ${typeof object}`, "object", object);
}
function deepCopy(object) {
  return _deepCopy(object);
}
var Description = class {
  constructor(info) {
    for (const key2 in info) {
      this[key2] = deepCopy(info[key2]);
    }
  }
};

// node_modules/@ethersproject/abi/lib.esm/_version.js
var version5 = "abi/5.5.0";

// node_modules/@ethersproject/abi/lib.esm/fragments.js
"use strict";
var logger5 = new Logger(version5);
var _constructorGuard3 = {};
var ModifiersBytes = { calldata: true, memory: true, storage: true };
var ModifiersNest = { calldata: true, memory: true };
function checkModifier(type, name2) {
  if (type === "bytes" || type === "string") {
    if (ModifiersBytes[name2]) {
      return true;
    }
  } else if (type === "address") {
    if (name2 === "payable") {
      return true;
    }
  } else if (type.indexOf("[") >= 0 || type === "tuple") {
    if (ModifiersNest[name2]) {
      return true;
    }
  }
  if (ModifiersBytes[name2] || name2 === "payable") {
    logger5.throwArgumentError("invalid modifier", "name", name2);
  }
  return false;
}
function parseParamType(param, allowIndexed) {
  let originalParam = param;
  function throwError(i3) {
    logger5.throwArgumentError(`unexpected character at position ${i3}`, "param", param);
  }
  param = param.replace(/\s/g, " ");
  function newNode(parent2) {
    let node2 = { type: "", name: "", parent: parent2, state: { allowType: true } };
    if (allowIndexed) {
      node2.indexed = false;
    }
    return node2;
  }
  let parent = { type: "", name: "", state: { allowType: true } };
  let node = parent;
  for (let i3 = 0; i3 < param.length; i3++) {
    let c3 = param[i3];
    switch (c3) {
      case "(":
        if (node.state.allowType && node.type === "") {
          node.type = "tuple";
        } else if (!node.state.allowParams) {
          throwError(i3);
        }
        node.state.allowType = false;
        node.type = verifyType(node.type);
        node.components = [newNode(node)];
        node = node.components[0];
        break;
      case ")":
        delete node.state;
        if (node.name === "indexed") {
          if (!allowIndexed) {
            throwError(i3);
          }
          node.indexed = true;
          node.name = "";
        }
        if (checkModifier(node.type, node.name)) {
          node.name = "";
        }
        node.type = verifyType(node.type);
        let child = node;
        node = node.parent;
        if (!node) {
          throwError(i3);
        }
        delete child.parent;
        node.state.allowParams = false;
        node.state.allowName = true;
        node.state.allowArray = true;
        break;
      case ",":
        delete node.state;
        if (node.name === "indexed") {
          if (!allowIndexed) {
            throwError(i3);
          }
          node.indexed = true;
          node.name = "";
        }
        if (checkModifier(node.type, node.name)) {
          node.name = "";
        }
        node.type = verifyType(node.type);
        let sibling = newNode(node.parent);
        node.parent.components.push(sibling);
        delete node.parent;
        node = sibling;
        break;
      case " ":
        if (node.state.allowType) {
          if (node.type !== "") {
            node.type = verifyType(node.type);
            delete node.state.allowType;
            node.state.allowName = true;
            node.state.allowParams = true;
          }
        }
        if (node.state.allowName) {
          if (node.name !== "") {
            if (node.name === "indexed") {
              if (!allowIndexed) {
                throwError(i3);
              }
              if (node.indexed) {
                throwError(i3);
              }
              node.indexed = true;
              node.name = "";
            } else if (checkModifier(node.type, node.name)) {
              node.name = "";
            } else {
              node.state.allowName = false;
            }
          }
        }
        break;
      case "[":
        if (!node.state.allowArray) {
          throwError(i3);
        }
        node.type += c3;
        node.state.allowArray = false;
        node.state.allowName = false;
        node.state.readArray = true;
        break;
      case "]":
        if (!node.state.readArray) {
          throwError(i3);
        }
        node.type += c3;
        node.state.readArray = false;
        node.state.allowArray = true;
        node.state.allowName = true;
        break;
      default:
        if (node.state.allowType) {
          node.type += c3;
          node.state.allowParams = true;
          node.state.allowArray = true;
        } else if (node.state.allowName) {
          node.name += c3;
          delete node.state.allowArray;
        } else if (node.state.readArray) {
          node.type += c3;
        } else {
          throwError(i3);
        }
    }
  }
  if (node.parent) {
    logger5.throwArgumentError("unexpected eof", "param", param);
  }
  delete parent.state;
  if (node.name === "indexed") {
    if (!allowIndexed) {
      throwError(originalParam.length - 7);
    }
    if (node.indexed) {
      throwError(originalParam.length - 7);
    }
    node.indexed = true;
    node.name = "";
  } else if (checkModifier(node.type, node.name)) {
    node.name = "";
  }
  parent.type = verifyType(parent.type);
  return parent;
}
function populate(object, params) {
  for (let key2 in params) {
    defineReadOnly(object, key2, params[key2]);
  }
}
var FormatTypes = Object.freeze({
  sighash: "sighash",
  minimal: "minimal",
  full: "full",
  json: "json"
});
var paramTypeArray = new RegExp(/^(.*)\[([0-9]*)\]$/);
var ParamType = class {
  constructor(constructorGuard, params) {
    if (constructorGuard !== _constructorGuard3) {
      logger5.throwError("use fromString", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "new ParamType()"
      });
    }
    populate(this, params);
    let match = this.type.match(paramTypeArray);
    if (match) {
      populate(this, {
        arrayLength: parseInt(match[2] || "-1"),
        arrayChildren: ParamType.fromObject({
          type: match[1],
          components: this.components
        }),
        baseType: "array"
      });
    } else {
      populate(this, {
        arrayLength: null,
        arrayChildren: null,
        baseType: this.components != null ? "tuple" : this.type
      });
    }
    this._isParamType = true;
    Object.freeze(this);
  }
  format(format) {
    if (!format) {
      format = FormatTypes.sighash;
    }
    if (!FormatTypes[format]) {
      logger5.throwArgumentError("invalid format type", "format", format);
    }
    if (format === FormatTypes.json) {
      let result2 = {
        type: this.baseType === "tuple" ? "tuple" : this.type,
        name: this.name || void 0
      };
      if (typeof this.indexed === "boolean") {
        result2.indexed = this.indexed;
      }
      if (this.components) {
        result2.components = this.components.map((comp) => JSON.parse(comp.format(format)));
      }
      return JSON.stringify(result2);
    }
    let result = "";
    if (this.baseType === "array") {
      result += this.arrayChildren.format(format);
      result += "[" + (this.arrayLength < 0 ? "" : String(this.arrayLength)) + "]";
    } else {
      if (this.baseType === "tuple") {
        if (format !== FormatTypes.sighash) {
          result += this.type;
        }
        result += "(" + this.components.map((comp) => comp.format(format)).join(format === FormatTypes.full ? ", " : ",") + ")";
      } else {
        result += this.type;
      }
    }
    if (format !== FormatTypes.sighash) {
      if (this.indexed === true) {
        result += " indexed";
      }
      if (format === FormatTypes.full && this.name) {
        result += " " + this.name;
      }
    }
    return result;
  }
  static from(value, allowIndexed) {
    if (typeof value === "string") {
      return ParamType.fromString(value, allowIndexed);
    }
    return ParamType.fromObject(value);
  }
  static fromObject(value) {
    if (ParamType.isParamType(value)) {
      return value;
    }
    return new ParamType(_constructorGuard3, {
      name: value.name || null,
      type: verifyType(value.type),
      indexed: value.indexed == null ? null : !!value.indexed,
      components: value.components ? value.components.map(ParamType.fromObject) : null
    });
  }
  static fromString(value, allowIndexed) {
    function ParamTypify(node) {
      return ParamType.fromObject({
        name: node.name,
        type: node.type,
        indexed: node.indexed,
        components: node.components
      });
    }
    return ParamTypify(parseParamType(value, !!allowIndexed));
  }
  static isParamType(value) {
    return !!(value != null && value._isParamType);
  }
};
function parseParams(value, allowIndex) {
  return splitNesting(value).map((param) => ParamType.fromString(param, allowIndex));
}
var Fragment = class {
  constructor(constructorGuard, params) {
    if (constructorGuard !== _constructorGuard3) {
      logger5.throwError("use a static from method", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "new Fragment()"
      });
    }
    populate(this, params);
    this._isFragment = true;
    Object.freeze(this);
  }
  static from(value) {
    if (Fragment.isFragment(value)) {
      return value;
    }
    if (typeof value === "string") {
      return Fragment.fromString(value);
    }
    return Fragment.fromObject(value);
  }
  static fromObject(value) {
    if (Fragment.isFragment(value)) {
      return value;
    }
    switch (value.type) {
      case "function":
        return FunctionFragment.fromObject(value);
      case "event":
        return EventFragment.fromObject(value);
      case "constructor":
        return ConstructorFragment.fromObject(value);
      case "error":
        return ErrorFragment.fromObject(value);
      case "fallback":
      case "receive":
        return null;
    }
    return logger5.throwArgumentError("invalid fragment object", "value", value);
  }
  static fromString(value) {
    value = value.replace(/\s/g, " ");
    value = value.replace(/\(/g, " (").replace(/\)/g, ") ").replace(/\s+/g, " ");
    value = value.trim();
    if (value.split(" ")[0] === "event") {
      return EventFragment.fromString(value.substring(5).trim());
    } else if (value.split(" ")[0] === "function") {
      return FunctionFragment.fromString(value.substring(8).trim());
    } else if (value.split("(")[0].trim() === "constructor") {
      return ConstructorFragment.fromString(value.trim());
    } else if (value.split(" ")[0] === "error") {
      return ErrorFragment.fromString(value.substring(5).trim());
    }
    return logger5.throwArgumentError("unsupported fragment", "value", value);
  }
  static isFragment(value) {
    return !!(value && value._isFragment);
  }
};
var EventFragment = class extends Fragment {
  format(format) {
    if (!format) {
      format = FormatTypes.sighash;
    }
    if (!FormatTypes[format]) {
      logger5.throwArgumentError("invalid format type", "format", format);
    }
    if (format === FormatTypes.json) {
      return JSON.stringify({
        type: "event",
        anonymous: this.anonymous,
        name: this.name,
        inputs: this.inputs.map((input) => JSON.parse(input.format(format)))
      });
    }
    let result = "";
    if (format !== FormatTypes.sighash) {
      result += "event ";
    }
    result += this.name + "(" + this.inputs.map((input) => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
    if (format !== FormatTypes.sighash) {
      if (this.anonymous) {
        result += "anonymous ";
      }
    }
    return result.trim();
  }
  static from(value) {
    if (typeof value === "string") {
      return EventFragment.fromString(value);
    }
    return EventFragment.fromObject(value);
  }
  static fromObject(value) {
    if (EventFragment.isEventFragment(value)) {
      return value;
    }
    if (value.type !== "event") {
      logger5.throwArgumentError("invalid event object", "value", value);
    }
    const params = {
      name: verifyIdentifier(value.name),
      anonymous: value.anonymous,
      inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
      type: "event"
    };
    return new EventFragment(_constructorGuard3, params);
  }
  static fromString(value) {
    let match = value.match(regexParen);
    if (!match) {
      logger5.throwArgumentError("invalid event string", "value", value);
    }
    let anonymous = false;
    match[3].split(" ").forEach((modifier) => {
      switch (modifier.trim()) {
        case "anonymous":
          anonymous = true;
          break;
        case "":
          break;
        default:
          logger5.warn("unknown modifier: " + modifier);
      }
    });
    return EventFragment.fromObject({
      name: match[1].trim(),
      anonymous,
      inputs: parseParams(match[2], true),
      type: "event"
    });
  }
  static isEventFragment(value) {
    return value && value._isFragment && value.type === "event";
  }
};
function parseGas(value, params) {
  params.gas = null;
  let comps = value.split("@");
  if (comps.length !== 1) {
    if (comps.length > 2) {
      logger5.throwArgumentError("invalid human-readable ABI signature", "value", value);
    }
    if (!comps[1].match(/^[0-9]+$/)) {
      logger5.throwArgumentError("invalid human-readable ABI signature gas", "value", value);
    }
    params.gas = BigNumber.from(comps[1]);
    return comps[0];
  }
  return value;
}
function parseModifiers(value, params) {
  params.constant = false;
  params.payable = false;
  params.stateMutability = "nonpayable";
  value.split(" ").forEach((modifier) => {
    switch (modifier.trim()) {
      case "constant":
        params.constant = true;
        break;
      case "payable":
        params.payable = true;
        params.stateMutability = "payable";
        break;
      case "nonpayable":
        params.payable = false;
        params.stateMutability = "nonpayable";
        break;
      case "pure":
        params.constant = true;
        params.stateMutability = "pure";
        break;
      case "view":
        params.constant = true;
        params.stateMutability = "view";
        break;
      case "external":
      case "public":
      case "":
        break;
      default:
        console.log("unknown modifier: " + modifier);
    }
  });
}
function verifyState(value) {
  let result = {
    constant: false,
    payable: true,
    stateMutability: "payable"
  };
  if (value.stateMutability != null) {
    result.stateMutability = value.stateMutability;
    result.constant = result.stateMutability === "view" || result.stateMutability === "pure";
    if (value.constant != null) {
      if (!!value.constant !== result.constant) {
        logger5.throwArgumentError("cannot have constant function with mutability " + result.stateMutability, "value", value);
      }
    }
    result.payable = result.stateMutability === "payable";
    if (value.payable != null) {
      if (!!value.payable !== result.payable) {
        logger5.throwArgumentError("cannot have payable function with mutability " + result.stateMutability, "value", value);
      }
    }
  } else if (value.payable != null) {
    result.payable = !!value.payable;
    if (value.constant == null && !result.payable && value.type !== "constructor") {
      logger5.throwArgumentError("unable to determine stateMutability", "value", value);
    }
    result.constant = !!value.constant;
    if (result.constant) {
      result.stateMutability = "view";
    } else {
      result.stateMutability = result.payable ? "payable" : "nonpayable";
    }
    if (result.payable && result.constant) {
      logger5.throwArgumentError("cannot have constant payable function", "value", value);
    }
  } else if (value.constant != null) {
    result.constant = !!value.constant;
    result.payable = !result.constant;
    result.stateMutability = result.constant ? "view" : "payable";
  } else if (value.type !== "constructor") {
    logger5.throwArgumentError("unable to determine stateMutability", "value", value);
  }
  return result;
}
var ConstructorFragment = class extends Fragment {
  format(format) {
    if (!format) {
      format = FormatTypes.sighash;
    }
    if (!FormatTypes[format]) {
      logger5.throwArgumentError("invalid format type", "format", format);
    }
    if (format === FormatTypes.json) {
      return JSON.stringify({
        type: "constructor",
        stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
        payable: this.payable,
        gas: this.gas ? this.gas.toNumber() : void 0,
        inputs: this.inputs.map((input) => JSON.parse(input.format(format)))
      });
    }
    if (format === FormatTypes.sighash) {
      logger5.throwError("cannot format a constructor for sighash", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "format(sighash)"
      });
    }
    let result = "constructor(" + this.inputs.map((input) => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
    if (this.stateMutability && this.stateMutability !== "nonpayable") {
      result += this.stateMutability + " ";
    }
    return result.trim();
  }
  static from(value) {
    if (typeof value === "string") {
      return ConstructorFragment.fromString(value);
    }
    return ConstructorFragment.fromObject(value);
  }
  static fromObject(value) {
    if (ConstructorFragment.isConstructorFragment(value)) {
      return value;
    }
    if (value.type !== "constructor") {
      logger5.throwArgumentError("invalid constructor object", "value", value);
    }
    let state = verifyState(value);
    if (state.constant) {
      logger5.throwArgumentError("constructor cannot be constant", "value", value);
    }
    const params = {
      name: null,
      type: value.type,
      inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
      payable: state.payable,
      stateMutability: state.stateMutability,
      gas: value.gas ? BigNumber.from(value.gas) : null
    };
    return new ConstructorFragment(_constructorGuard3, params);
  }
  static fromString(value) {
    let params = { type: "constructor" };
    value = parseGas(value, params);
    let parens = value.match(regexParen);
    if (!parens || parens[1].trim() !== "constructor") {
      logger5.throwArgumentError("invalid constructor string", "value", value);
    }
    params.inputs = parseParams(parens[2].trim(), false);
    parseModifiers(parens[3].trim(), params);
    return ConstructorFragment.fromObject(params);
  }
  static isConstructorFragment(value) {
    return value && value._isFragment && value.type === "constructor";
  }
};
var FunctionFragment = class extends ConstructorFragment {
  format(format) {
    if (!format) {
      format = FormatTypes.sighash;
    }
    if (!FormatTypes[format]) {
      logger5.throwArgumentError("invalid format type", "format", format);
    }
    if (format === FormatTypes.json) {
      return JSON.stringify({
        type: "function",
        name: this.name,
        constant: this.constant,
        stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
        payable: this.payable,
        gas: this.gas ? this.gas.toNumber() : void 0,
        inputs: this.inputs.map((input) => JSON.parse(input.format(format))),
        outputs: this.outputs.map((output) => JSON.parse(output.format(format)))
      });
    }
    let result = "";
    if (format !== FormatTypes.sighash) {
      result += "function ";
    }
    result += this.name + "(" + this.inputs.map((input) => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
    if (format !== FormatTypes.sighash) {
      if (this.stateMutability) {
        if (this.stateMutability !== "nonpayable") {
          result += this.stateMutability + " ";
        }
      } else if (this.constant) {
        result += "view ";
      }
      if (this.outputs && this.outputs.length) {
        result += "returns (" + this.outputs.map((output) => output.format(format)).join(", ") + ") ";
      }
      if (this.gas != null) {
        result += "@" + this.gas.toString() + " ";
      }
    }
    return result.trim();
  }
  static from(value) {
    if (typeof value === "string") {
      return FunctionFragment.fromString(value);
    }
    return FunctionFragment.fromObject(value);
  }
  static fromObject(value) {
    if (FunctionFragment.isFunctionFragment(value)) {
      return value;
    }
    if (value.type !== "function") {
      logger5.throwArgumentError("invalid function object", "value", value);
    }
    let state = verifyState(value);
    const params = {
      type: value.type,
      name: verifyIdentifier(value.name),
      constant: state.constant,
      inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
      outputs: value.outputs ? value.outputs.map(ParamType.fromObject) : [],
      payable: state.payable,
      stateMutability: state.stateMutability,
      gas: value.gas ? BigNumber.from(value.gas) : null
    };
    return new FunctionFragment(_constructorGuard3, params);
  }
  static fromString(value) {
    let params = { type: "function" };
    value = parseGas(value, params);
    let comps = value.split(" returns ");
    if (comps.length > 2) {
      logger5.throwArgumentError("invalid function string", "value", value);
    }
    let parens = comps[0].match(regexParen);
    if (!parens) {
      logger5.throwArgumentError("invalid function signature", "value", value);
    }
    params.name = parens[1].trim();
    if (params.name) {
      verifyIdentifier(params.name);
    }
    params.inputs = parseParams(parens[2], false);
    parseModifiers(parens[3].trim(), params);
    if (comps.length > 1) {
      let returns = comps[1].match(regexParen);
      if (returns[1].trim() != "" || returns[3].trim() != "") {
        logger5.throwArgumentError("unexpected tokens", "value", value);
      }
      params.outputs = parseParams(returns[2], false);
    } else {
      params.outputs = [];
    }
    return FunctionFragment.fromObject(params);
  }
  static isFunctionFragment(value) {
    return value && value._isFragment && value.type === "function";
  }
};
function checkForbidden(fragment) {
  const sig = fragment.format();
  if (sig === "Error(string)" || sig === "Panic(uint256)") {
    logger5.throwArgumentError(`cannot specify user defined ${sig} error`, "fragment", fragment);
  }
  return fragment;
}
var ErrorFragment = class extends Fragment {
  format(format) {
    if (!format) {
      format = FormatTypes.sighash;
    }
    if (!FormatTypes[format]) {
      logger5.throwArgumentError("invalid format type", "format", format);
    }
    if (format === FormatTypes.json) {
      return JSON.stringify({
        type: "error",
        name: this.name,
        inputs: this.inputs.map((input) => JSON.parse(input.format(format)))
      });
    }
    let result = "";
    if (format !== FormatTypes.sighash) {
      result += "error ";
    }
    result += this.name + "(" + this.inputs.map((input) => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
    return result.trim();
  }
  static from(value) {
    if (typeof value === "string") {
      return ErrorFragment.fromString(value);
    }
    return ErrorFragment.fromObject(value);
  }
  static fromObject(value) {
    if (ErrorFragment.isErrorFragment(value)) {
      return value;
    }
    if (value.type !== "error") {
      logger5.throwArgumentError("invalid error object", "value", value);
    }
    const params = {
      type: value.type,
      name: verifyIdentifier(value.name),
      inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : []
    };
    return checkForbidden(new ErrorFragment(_constructorGuard3, params));
  }
  static fromString(value) {
    let params = { type: "error" };
    let parens = value.match(regexParen);
    if (!parens) {
      logger5.throwArgumentError("invalid error signature", "value", value);
    }
    params.name = parens[1].trim();
    if (params.name) {
      verifyIdentifier(params.name);
    }
    params.inputs = parseParams(parens[2], false);
    return checkForbidden(ErrorFragment.fromObject(params));
  }
  static isErrorFragment(value) {
    return value && value._isFragment && value.type === "error";
  }
};
function verifyType(type) {
  if (type.match(/^uint($|[^1-9])/)) {
    type = "uint256" + type.substring(4);
  } else if (type.match(/^int($|[^1-9])/)) {
    type = "int256" + type.substring(3);
  }
  return type;
}
var regexIdentifier = new RegExp("^[a-zA-Z$_][a-zA-Z0-9$_]*$");
function verifyIdentifier(value) {
  if (!value || !value.match(regexIdentifier)) {
    logger5.throwArgumentError(`invalid identifier "${value}"`, "value", value);
  }
  return value;
}
var regexParen = new RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$");
function splitNesting(value) {
  value = value.trim();
  let result = [];
  let accum = "";
  let depth = 0;
  for (let offset = 0; offset < value.length; offset++) {
    let c3 = value[offset];
    if (c3 === "," && depth === 0) {
      result.push(accum);
      accum = "";
    } else {
      accum += c3;
      if (c3 === "(") {
        depth++;
      } else if (c3 === ")") {
        depth--;
        if (depth === -1) {
          logger5.throwArgumentError("unbalanced parenthesis", "value", value);
        }
      }
    }
  }
  if (accum) {
    result.push(accum);
  }
  return result;
}

// node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js
"use strict";
var logger6 = new Logger(version5);
function checkResultErrors(result) {
  const errors = [];
  const checkErrors = function(path, object) {
    if (!Array.isArray(object)) {
      return;
    }
    for (let key2 in object) {
      const childPath = path.slice();
      childPath.push(key2);
      try {
        checkErrors(childPath, object[key2]);
      } catch (error) {
        errors.push({ path: childPath, error });
      }
    }
  };
  checkErrors([], result);
  return errors;
}
var Coder = class {
  constructor(name2, type, localName, dynamic) {
    this.name = name2;
    this.type = type;
    this.localName = localName;
    this.dynamic = dynamic;
  }
  _throwError(message, value) {
    logger6.throwArgumentError(message, this.localName, value);
  }
};
var Writer = class {
  constructor(wordSize) {
    defineReadOnly(this, "wordSize", wordSize || 32);
    this._data = [];
    this._dataLength = 0;
    this._padding = new Uint8Array(wordSize);
  }
  get data() {
    return hexConcat(this._data);
  }
  get length() {
    return this._dataLength;
  }
  _writeData(data) {
    this._data.push(data);
    this._dataLength += data.length;
    return data.length;
  }
  appendWriter(writer) {
    return this._writeData(concat(writer._data));
  }
  writeBytes(value) {
    let bytes = arrayify(value);
    const paddingOffset = bytes.length % this.wordSize;
    if (paddingOffset) {
      bytes = concat([bytes, this._padding.slice(paddingOffset)]);
    }
    return this._writeData(bytes);
  }
  _getValue(value) {
    let bytes = arrayify(BigNumber.from(value));
    if (bytes.length > this.wordSize) {
      logger6.throwError("value out-of-bounds", Logger.errors.BUFFER_OVERRUN, {
        length: this.wordSize,
        offset: bytes.length
      });
    }
    if (bytes.length % this.wordSize) {
      bytes = concat([this._padding.slice(bytes.length % this.wordSize), bytes]);
    }
    return bytes;
  }
  writeValue(value) {
    return this._writeData(this._getValue(value));
  }
  writeUpdatableValue() {
    const offset = this._data.length;
    this._data.push(this._padding);
    this._dataLength += this.wordSize;
    return (value) => {
      this._data[offset] = this._getValue(value);
    };
  }
};
var Reader = class {
  constructor(data, wordSize, coerceFunc, allowLoose) {
    defineReadOnly(this, "_data", arrayify(data));
    defineReadOnly(this, "wordSize", wordSize || 32);
    defineReadOnly(this, "_coerceFunc", coerceFunc);
    defineReadOnly(this, "allowLoose", allowLoose);
    this._offset = 0;
  }
  get data() {
    return hexlify(this._data);
  }
  get consumed() {
    return this._offset;
  }
  static coerce(name2, value) {
    let match = name2.match("^u?int([0-9]+)$");
    if (match && parseInt(match[1]) <= 48) {
      value = value.toNumber();
    }
    return value;
  }
  coerce(name2, value) {
    if (this._coerceFunc) {
      return this._coerceFunc(name2, value);
    }
    return Reader.coerce(name2, value);
  }
  _peekBytes(offset, length, loose) {
    let alignedLength = Math.ceil(length / this.wordSize) * this.wordSize;
    if (this._offset + alignedLength > this._data.length) {
      if (this.allowLoose && loose && this._offset + length <= this._data.length) {
        alignedLength = length;
      } else {
        logger6.throwError("data out-of-bounds", Logger.errors.BUFFER_OVERRUN, {
          length: this._data.length,
          offset: this._offset + alignedLength
        });
      }
    }
    return this._data.slice(this._offset, this._offset + alignedLength);
  }
  subReader(offset) {
    return new Reader(this._data.slice(this._offset + offset), this.wordSize, this._coerceFunc, this.allowLoose);
  }
  readBytes(length, loose) {
    let bytes = this._peekBytes(0, length, !!loose);
    this._offset += bytes.length;
    return bytes.slice(0, length);
  }
  readValue() {
    return BigNumber.from(this.readBytes(this.wordSize));
  }
};

// node_modules/@ethersproject/keccak256/lib.esm/index.js
var import_js_sha3 = __toModule(require_sha3());
"use strict";
function keccak256(data) {
  return "0x" + import_js_sha3.default.keccak_256(arrayify(data));
}

// node_modules/@ethersproject/rlp/lib.esm/index.js
var lib_exports = {};
__export(lib_exports, {
  decode: () => decode,
  encode: () => encode
});

// node_modules/@ethersproject/rlp/lib.esm/_version.js
var version6 = "rlp/5.5.0";

// node_modules/@ethersproject/rlp/lib.esm/index.js
"use strict";
var logger7 = new Logger(version6);
function arrayifyInteger(value) {
  const result = [];
  while (value) {
    result.unshift(value & 255);
    value >>= 8;
  }
  return result;
}
function unarrayifyInteger(data, offset, length) {
  let result = 0;
  for (let i3 = 0; i3 < length; i3++) {
    result = result * 256 + data[offset + i3];
  }
  return result;
}
function _encode(object) {
  if (Array.isArray(object)) {
    let payload = [];
    object.forEach(function(child) {
      payload = payload.concat(_encode(child));
    });
    if (payload.length <= 55) {
      payload.unshift(192 + payload.length);
      return payload;
    }
    const length2 = arrayifyInteger(payload.length);
    length2.unshift(247 + length2.length);
    return length2.concat(payload);
  }
  if (!isBytesLike(object)) {
    logger7.throwArgumentError("RLP object must be BytesLike", "object", object);
  }
  const data = Array.prototype.slice.call(arrayify(object));
  if (data.length === 1 && data[0] <= 127) {
    return data;
  } else if (data.length <= 55) {
    data.unshift(128 + data.length);
    return data;
  }
  const length = arrayifyInteger(data.length);
  length.unshift(183 + length.length);
  return length.concat(data);
}
function encode(object) {
  return hexlify(_encode(object));
}
function _decodeChildren(data, offset, childOffset, length) {
  const result = [];
  while (childOffset < offset + 1 + length) {
    const decoded = _decode(data, childOffset);
    result.push(decoded.result);
    childOffset += decoded.consumed;
    if (childOffset > offset + 1 + length) {
      logger7.throwError("child data too short", Logger.errors.BUFFER_OVERRUN, {});
    }
  }
  return { consumed: 1 + length, result };
}
function _decode(data, offset) {
  if (data.length === 0) {
    logger7.throwError("data too short", Logger.errors.BUFFER_OVERRUN, {});
  }
  if (data[offset] >= 248) {
    const lengthLength = data[offset] - 247;
    if (offset + 1 + lengthLength > data.length) {
      logger7.throwError("data short segment too short", Logger.errors.BUFFER_OVERRUN, {});
    }
    const length = unarrayifyInteger(data, offset + 1, lengthLength);
    if (offset + 1 + lengthLength + length > data.length) {
      logger7.throwError("data long segment too short", Logger.errors.BUFFER_OVERRUN, {});
    }
    return _decodeChildren(data, offset, offset + 1 + lengthLength, lengthLength + length);
  } else if (data[offset] >= 192) {
    const length = data[offset] - 192;
    if (offset + 1 + length > data.length) {
      logger7.throwError("data array too short", Logger.errors.BUFFER_OVERRUN, {});
    }
    return _decodeChildren(data, offset, offset + 1, length);
  } else if (data[offset] >= 184) {
    const lengthLength = data[offset] - 183;
    if (offset + 1 + lengthLength > data.length) {
      logger7.throwError("data array too short", Logger.errors.BUFFER_OVERRUN, {});
    }
    const length = unarrayifyInteger(data, offset + 1, lengthLength);
    if (offset + 1 + lengthLength + length > data.length) {
      logger7.throwError("data array too short", Logger.errors.BUFFER_OVERRUN, {});
    }
    const result = hexlify(data.slice(offset + 1 + lengthLength, offset + 1 + lengthLength + length));
    return { consumed: 1 + lengthLength + length, result };
  } else if (data[offset] >= 128) {
    const length = data[offset] - 128;
    if (offset + 1 + length > data.length) {
      logger7.throwError("data too short", Logger.errors.BUFFER_OVERRUN, {});
    }
    const result = hexlify(data.slice(offset + 1, offset + 1 + length));
    return { consumed: 1 + length, result };
  }
  return { consumed: 1, result: hexlify(data[offset]) };
}
function decode(data) {
  const bytes = arrayify(data);
  const decoded = _decode(bytes, 0);
  if (decoded.consumed !== bytes.length) {
    logger7.throwArgumentError("invalid rlp data", "data", data);
  }
  return decoded.result;
}

// node_modules/@ethersproject/address/lib.esm/_version.js
var version7 = "address/5.5.0";

// node_modules/@ethersproject/address/lib.esm/index.js
"use strict";
var logger8 = new Logger(version7);
function getChecksumAddress(address) {
  if (!isHexString(address, 20)) {
    logger8.throwArgumentError("invalid address", "address", address);
  }
  address = address.toLowerCase();
  const chars = address.substring(2).split("");
  const expanded = new Uint8Array(40);
  for (let i3 = 0; i3 < 40; i3++) {
    expanded[i3] = chars[i3].charCodeAt(0);
  }
  const hashed = arrayify(keccak256(expanded));
  for (let i3 = 0; i3 < 40; i3 += 2) {
    if (hashed[i3 >> 1] >> 4 >= 8) {
      chars[i3] = chars[i3].toUpperCase();
    }
    if ((hashed[i3 >> 1] & 15) >= 8) {
      chars[i3 + 1] = chars[i3 + 1].toUpperCase();
    }
  }
  return "0x" + chars.join("");
}
var MAX_SAFE_INTEGER = 9007199254740991;
function log10(x3) {
  if (Math.log10) {
    return Math.log10(x3);
  }
  return Math.log(x3) / Math.LN10;
}
var ibanLookup = {};
for (let i3 = 0; i3 < 10; i3++) {
  ibanLookup[String(i3)] = String(i3);
}
for (let i3 = 0; i3 < 26; i3++) {
  ibanLookup[String.fromCharCode(65 + i3)] = String(10 + i3);
}
var safeDigits = Math.floor(log10(MAX_SAFE_INTEGER));
function ibanChecksum(address) {
  address = address.toUpperCase();
  address = address.substring(4) + address.substring(0, 2) + "00";
  let expanded = address.split("").map((c3) => {
    return ibanLookup[c3];
  }).join("");
  while (expanded.length >= safeDigits) {
    let block = expanded.substring(0, safeDigits);
    expanded = parseInt(block, 10) % 97 + expanded.substring(block.length);
  }
  let checksum = String(98 - parseInt(expanded, 10) % 97);
  while (checksum.length < 2) {
    checksum = "0" + checksum;
  }
  return checksum;
}
function getAddress(address) {
  let result = null;
  if (typeof address !== "string") {
    logger8.throwArgumentError("invalid address", "address", address);
  }
  if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    if (address.substring(0, 2) !== "0x") {
      address = "0x" + address;
    }
    result = getChecksumAddress(address);
    if (address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && result !== address) {
      logger8.throwArgumentError("bad address checksum", "address", address);
    }
  } else if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    if (address.substring(2, 4) !== ibanChecksum(address)) {
      logger8.throwArgumentError("bad icap checksum", "address", address);
    }
    result = _base36To16(address.substring(4));
    while (result.length < 40) {
      result = "0" + result;
    }
    result = getChecksumAddress("0x" + result);
  } else {
    logger8.throwArgumentError("invalid address", "address", address);
  }
  return result;
}
function isAddress(address) {
  try {
    getAddress(address);
    return true;
  } catch (error) {
  }
  return false;
}
function getIcapAddress(address) {
  let base36 = _base16To36(getAddress(address).substring(2)).toUpperCase();
  while (base36.length < 30) {
    base36 = "0" + base36;
  }
  return "XE" + ibanChecksum("XE00" + base36) + base36;
}
function getContractAddress(transaction) {
  let from = null;
  try {
    from = getAddress(transaction.from);
  } catch (error) {
    logger8.throwArgumentError("missing from address", "transaction", transaction);
  }
  const nonce = stripZeros(arrayify(BigNumber.from(transaction.nonce).toHexString()));
  return getAddress(hexDataSlice(keccak256(encode([from, nonce])), 12));
}
function getCreate2Address(from, salt, initCodeHash) {
  if (hexDataLength(salt) !== 32) {
    logger8.throwArgumentError("salt must be 32 bytes", "salt", salt);
  }
  if (hexDataLength(initCodeHash) !== 32) {
    logger8.throwArgumentError("initCodeHash must be 32 bytes", "initCodeHash", initCodeHash);
  }
  return getAddress(hexDataSlice(keccak256(concat(["0xff", getAddress(from), salt, initCodeHash])), 12));
}

// node_modules/@ethersproject/abi/lib.esm/coders/address.js
"use strict";
var AddressCoder = class extends Coder {
  constructor(localName) {
    super("address", "address", localName, false);
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000";
  }
  encode(writer, value) {
    try {
      value = getAddress(value);
    } catch (error) {
      this._throwError(error.message, value);
    }
    return writer.writeValue(value);
  }
  decode(reader) {
    return getAddress(hexZeroPad(reader.readValue().toHexString(), 20));
  }
};

// node_modules/@ethersproject/abi/lib.esm/coders/anonymous.js
"use strict";
var AnonymousCoder = class extends Coder {
  constructor(coder) {
    super(coder.name, coder.type, void 0, coder.dynamic);
    this.coder = coder;
  }
  defaultValue() {
    return this.coder.defaultValue();
  }
  encode(writer, value) {
    return this.coder.encode(writer, value);
  }
  decode(reader) {
    return this.coder.decode(reader);
  }
};

// node_modules/@ethersproject/abi/lib.esm/coders/array.js
"use strict";
var logger9 = new Logger(version5);
function pack(writer, coders, values) {
  let arrayValues = null;
  if (Array.isArray(values)) {
    arrayValues = values;
  } else if (values && typeof values === "object") {
    let unique = {};
    arrayValues = coders.map((coder) => {
      const name2 = coder.localName;
      if (!name2) {
        logger9.throwError("cannot encode object for signature with missing names", Logger.errors.INVALID_ARGUMENT, {
          argument: "values",
          coder,
          value: values
        });
      }
      if (unique[name2]) {
        logger9.throwError("cannot encode object for signature with duplicate names", Logger.errors.INVALID_ARGUMENT, {
          argument: "values",
          coder,
          value: values
        });
      }
      unique[name2] = true;
      return values[name2];
    });
  } else {
    logger9.throwArgumentError("invalid tuple value", "tuple", values);
  }
  if (coders.length !== arrayValues.length) {
    logger9.throwArgumentError("types/value length mismatch", "tuple", values);
  }
  let staticWriter = new Writer(writer.wordSize);
  let dynamicWriter = new Writer(writer.wordSize);
  let updateFuncs = [];
  coders.forEach((coder, index) => {
    let value = arrayValues[index];
    if (coder.dynamic) {
      let dynamicOffset = dynamicWriter.length;
      coder.encode(dynamicWriter, value);
      let updateFunc = staticWriter.writeUpdatableValue();
      updateFuncs.push((baseOffset) => {
        updateFunc(baseOffset + dynamicOffset);
      });
    } else {
      coder.encode(staticWriter, value);
    }
  });
  updateFuncs.forEach((func) => {
    func(staticWriter.length);
  });
  let length = writer.appendWriter(staticWriter);
  length += writer.appendWriter(dynamicWriter);
  return length;
}
function unpack(reader, coders) {
  let values = [];
  let baseReader = reader.subReader(0);
  coders.forEach((coder) => {
    let value = null;
    if (coder.dynamic) {
      let offset = reader.readValue();
      let offsetReader = baseReader.subReader(offset.toNumber());
      try {
        value = coder.decode(offsetReader);
      } catch (error) {
        if (error.code === Logger.errors.BUFFER_OVERRUN) {
          throw error;
        }
        value = error;
        value.baseType = coder.name;
        value.name = coder.localName;
        value.type = coder.type;
      }
    } else {
      try {
        value = coder.decode(reader);
      } catch (error) {
        if (error.code === Logger.errors.BUFFER_OVERRUN) {
          throw error;
        }
        value = error;
        value.baseType = coder.name;
        value.name = coder.localName;
        value.type = coder.type;
      }
    }
    if (value != void 0) {
      values.push(value);
    }
  });
  const uniqueNames = coders.reduce((accum, coder) => {
    const name2 = coder.localName;
    if (name2) {
      if (!accum[name2]) {
        accum[name2] = 0;
      }
      accum[name2]++;
    }
    return accum;
  }, {});
  coders.forEach((coder, index) => {
    let name2 = coder.localName;
    if (!name2 || uniqueNames[name2] !== 1) {
      return;
    }
    if (name2 === "length") {
      name2 = "_length";
    }
    if (values[name2] != null) {
      return;
    }
    const value = values[index];
    if (value instanceof Error) {
      Object.defineProperty(values, name2, {
        enumerable: true,
        get: () => {
          throw value;
        }
      });
    } else {
      values[name2] = value;
    }
  });
  for (let i3 = 0; i3 < values.length; i3++) {
    const value = values[i3];
    if (value instanceof Error) {
      Object.defineProperty(values, i3, {
        enumerable: true,
        get: () => {
          throw value;
        }
      });
    }
  }
  return Object.freeze(values);
}
var ArrayCoder = class extends Coder {
  constructor(coder, length, localName) {
    const type = coder.type + "[" + (length >= 0 ? length : "") + "]";
    const dynamic = length === -1 || coder.dynamic;
    super("array", type, localName, dynamic);
    this.coder = coder;
    this.length = length;
  }
  defaultValue() {
    const defaultChild = this.coder.defaultValue();
    const result = [];
    for (let i3 = 0; i3 < this.length; i3++) {
      result.push(defaultChild);
    }
    return result;
  }
  encode(writer, value) {
    if (!Array.isArray(value)) {
      this._throwError("expected array value", value);
    }
    let count = this.length;
    if (count === -1) {
      count = value.length;
      writer.writeValue(value.length);
    }
    logger9.checkArgumentCount(value.length, count, "coder array" + (this.localName ? " " + this.localName : ""));
    let coders = [];
    for (let i3 = 0; i3 < value.length; i3++) {
      coders.push(this.coder);
    }
    return pack(writer, coders, value);
  }
  decode(reader) {
    let count = this.length;
    if (count === -1) {
      count = reader.readValue().toNumber();
      if (count * 32 > reader._data.length) {
        logger9.throwError("insufficient data length", Logger.errors.BUFFER_OVERRUN, {
          length: reader._data.length,
          count
        });
      }
    }
    let coders = [];
    for (let i3 = 0; i3 < count; i3++) {
      coders.push(new AnonymousCoder(this.coder));
    }
    return reader.coerce(this.name, unpack(reader, coders));
  }
};

// node_modules/@ethersproject/abi/lib.esm/coders/boolean.js
"use strict";
var BooleanCoder = class extends Coder {
  constructor(localName) {
    super("bool", "bool", localName, false);
  }
  defaultValue() {
    return false;
  }
  encode(writer, value) {
    return writer.writeValue(value ? 1 : 0);
  }
  decode(reader) {
    return reader.coerce(this.type, !reader.readValue().isZero());
  }
};

// node_modules/@ethersproject/abi/lib.esm/coders/bytes.js
"use strict";
var DynamicBytesCoder = class extends Coder {
  constructor(type, localName) {
    super(type, type, localName, true);
  }
  defaultValue() {
    return "0x";
  }
  encode(writer, value) {
    value = arrayify(value);
    let length = writer.writeValue(value.length);
    length += writer.writeBytes(value);
    return length;
  }
  decode(reader) {
    return reader.readBytes(reader.readValue().toNumber(), true);
  }
};
var BytesCoder = class extends DynamicBytesCoder {
  constructor(localName) {
    super("bytes", localName);
  }
  decode(reader) {
    return reader.coerce(this.name, hexlify(super.decode(reader)));
  }
};

// node_modules/@ethersproject/abi/lib.esm/coders/fixed-bytes.js
"use strict";
var FixedBytesCoder = class extends Coder {
  constructor(size, localName) {
    let name2 = "bytes" + String(size);
    super(name2, name2, localName, false);
    this.size = size;
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(0, 2 + this.size * 2);
  }
  encode(writer, value) {
    let data = arrayify(value);
    if (data.length !== this.size) {
      this._throwError("incorrect data length", value);
    }
    return writer.writeBytes(data);
  }
  decode(reader) {
    return reader.coerce(this.name, hexlify(reader.readBytes(this.size)));
  }
};

// node_modules/@ethersproject/abi/lib.esm/coders/null.js
"use strict";
var NullCoder = class extends Coder {
  constructor(localName) {
    super("null", "", localName, false);
  }
  defaultValue() {
    return null;
  }
  encode(writer, value) {
    if (value != null) {
      this._throwError("not null", value);
    }
    return writer.writeBytes([]);
  }
  decode(reader) {
    reader.readBytes(0);
    return reader.coerce(this.name, null);
  }
};

// node_modules/@ethersproject/constants/lib.esm/index.js
var lib_exports2 = {};
__export(lib_exports2, {
  AddressZero: () => AddressZero,
  EtherSymbol: () => EtherSymbol,
  HashZero: () => HashZero,
  MaxInt256: () => MaxInt256,
  MaxUint256: () => MaxUint256,
  MinInt256: () => MinInt256,
  NegativeOne: () => NegativeOne2,
  One: () => One,
  Two: () => Two,
  WeiPerEther: () => WeiPerEther,
  Zero: () => Zero2
});

// node_modules/@ethersproject/constants/lib.esm/addresses.js
var AddressZero = "0x0000000000000000000000000000000000000000";

// node_modules/@ethersproject/constants/lib.esm/bignumbers.js
var NegativeOne2 = /* @__PURE__ */ BigNumber.from(-1);
var Zero2 = /* @__PURE__ */ BigNumber.from(0);
var One = /* @__PURE__ */ BigNumber.from(1);
var Two = /* @__PURE__ */ BigNumber.from(2);
var WeiPerEther = /* @__PURE__ */ BigNumber.from("1000000000000000000");
var MaxUint256 = /* @__PURE__ */ BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
var MinInt256 = /* @__PURE__ */ BigNumber.from("-0x8000000000000000000000000000000000000000000000000000000000000000");
var MaxInt256 = /* @__PURE__ */ BigNumber.from("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

// node_modules/@ethersproject/constants/lib.esm/hashes.js
var HashZero = "0x0000000000000000000000000000000000000000000000000000000000000000";

// node_modules/@ethersproject/constants/lib.esm/strings.js
var EtherSymbol = "\u039E";

// node_modules/@ethersproject/constants/lib.esm/index.js
"use strict";

// node_modules/@ethersproject/abi/lib.esm/coders/number.js
"use strict";
var NumberCoder = class extends Coder {
  constructor(size, signed, localName) {
    const name2 = (signed ? "int" : "uint") + size * 8;
    super(name2, name2, localName, false);
    this.size = size;
    this.signed = signed;
  }
  defaultValue() {
    return 0;
  }
  encode(writer, value) {
    let v3 = BigNumber.from(value);
    let maxUintValue = MaxUint256.mask(writer.wordSize * 8);
    if (this.signed) {
      let bounds = maxUintValue.mask(this.size * 8 - 1);
      if (v3.gt(bounds) || v3.lt(bounds.add(One).mul(NegativeOne2))) {
        this._throwError("value out-of-bounds", value);
      }
    } else if (v3.lt(Zero2) || v3.gt(maxUintValue.mask(this.size * 8))) {
      this._throwError("value out-of-bounds", value);
    }
    v3 = v3.toTwos(this.size * 8).mask(this.size * 8);
    if (this.signed) {
      v3 = v3.fromTwos(this.size * 8).toTwos(8 * writer.wordSize);
    }
    return writer.writeValue(v3);
  }
  decode(reader) {
    let value = reader.readValue().mask(this.size * 8);
    if (this.signed) {
      value = value.fromTwos(this.size * 8);
    }
    return reader.coerce(this.name, value);
  }
};

// node_modules/@ethersproject/strings/lib.esm/_version.js
var version8 = "strings/5.5.0";

// node_modules/@ethersproject/strings/lib.esm/utf8.js
"use strict";
var logger10 = new Logger(version8);
var UnicodeNormalizationForm;
(function(UnicodeNormalizationForm2) {
  UnicodeNormalizationForm2["current"] = "";
  UnicodeNormalizationForm2["NFC"] = "NFC";
  UnicodeNormalizationForm2["NFD"] = "NFD";
  UnicodeNormalizationForm2["NFKC"] = "NFKC";
  UnicodeNormalizationForm2["NFKD"] = "NFKD";
})(UnicodeNormalizationForm || (UnicodeNormalizationForm = {}));
var Utf8ErrorReason;
(function(Utf8ErrorReason2) {
  Utf8ErrorReason2["UNEXPECTED_CONTINUE"] = "unexpected continuation byte";
  Utf8ErrorReason2["BAD_PREFIX"] = "bad codepoint prefix";
  Utf8ErrorReason2["OVERRUN"] = "string overrun";
  Utf8ErrorReason2["MISSING_CONTINUE"] = "missing continuation byte";
  Utf8ErrorReason2["OUT_OF_RANGE"] = "out of UTF-8 range";
  Utf8ErrorReason2["UTF16_SURROGATE"] = "UTF-16 surrogate";
  Utf8ErrorReason2["OVERLONG"] = "overlong representation";
})(Utf8ErrorReason || (Utf8ErrorReason = {}));
function errorFunc(reason, offset, bytes, output, badCodepoint) {
  return logger10.throwArgumentError(`invalid codepoint at offset ${offset}; ${reason}`, "bytes", bytes);
}
function ignoreFunc(reason, offset, bytes, output, badCodepoint) {
  if (reason === Utf8ErrorReason.BAD_PREFIX || reason === Utf8ErrorReason.UNEXPECTED_CONTINUE) {
    let i3 = 0;
    for (let o3 = offset + 1; o3 < bytes.length; o3++) {
      if (bytes[o3] >> 6 !== 2) {
        break;
      }
      i3++;
    }
    return i3;
  }
  if (reason === Utf8ErrorReason.OVERRUN) {
    return bytes.length - offset - 1;
  }
  return 0;
}
function replaceFunc(reason, offset, bytes, output, badCodepoint) {
  if (reason === Utf8ErrorReason.OVERLONG) {
    output.push(badCodepoint);
    return 0;
  }
  output.push(65533);
  return ignoreFunc(reason, offset, bytes, output, badCodepoint);
}
var Utf8ErrorFuncs = Object.freeze({
  error: errorFunc,
  ignore: ignoreFunc,
  replace: replaceFunc
});
function getUtf8CodePoints(bytes, onError) {
  if (onError == null) {
    onError = Utf8ErrorFuncs.error;
  }
  bytes = arrayify(bytes);
  const result = [];
  let i3 = 0;
  while (i3 < bytes.length) {
    const c3 = bytes[i3++];
    if (c3 >> 7 === 0) {
      result.push(c3);
      continue;
    }
    let extraLength = null;
    let overlongMask = null;
    if ((c3 & 224) === 192) {
      extraLength = 1;
      overlongMask = 127;
    } else if ((c3 & 240) === 224) {
      extraLength = 2;
      overlongMask = 2047;
    } else if ((c3 & 248) === 240) {
      extraLength = 3;
      overlongMask = 65535;
    } else {
      if ((c3 & 192) === 128) {
        i3 += onError(Utf8ErrorReason.UNEXPECTED_CONTINUE, i3 - 1, bytes, result);
      } else {
        i3 += onError(Utf8ErrorReason.BAD_PREFIX, i3 - 1, bytes, result);
      }
      continue;
    }
    if (i3 - 1 + extraLength >= bytes.length) {
      i3 += onError(Utf8ErrorReason.OVERRUN, i3 - 1, bytes, result);
      continue;
    }
    let res = c3 & (1 << 8 - extraLength - 1) - 1;
    for (let j3 = 0; j3 < extraLength; j3++) {
      let nextChar = bytes[i3];
      if ((nextChar & 192) != 128) {
        i3 += onError(Utf8ErrorReason.MISSING_CONTINUE, i3, bytes, result);
        res = null;
        break;
      }
      ;
      res = res << 6 | nextChar & 63;
      i3++;
    }
    if (res === null) {
      continue;
    }
    if (res > 1114111) {
      i3 += onError(Utf8ErrorReason.OUT_OF_RANGE, i3 - 1 - extraLength, bytes, result, res);
      continue;
    }
    if (res >= 55296 && res <= 57343) {
      i3 += onError(Utf8ErrorReason.UTF16_SURROGATE, i3 - 1 - extraLength, bytes, result, res);
      continue;
    }
    if (res <= overlongMask) {
      i3 += onError(Utf8ErrorReason.OVERLONG, i3 - 1 - extraLength, bytes, result, res);
      continue;
    }
    result.push(res);
  }
  return result;
}
function toUtf8Bytes(str, form = UnicodeNormalizationForm.current) {
  if (form != UnicodeNormalizationForm.current) {
    logger10.checkNormalize();
    str = str.normalize(form);
  }
  let result = [];
  for (let i3 = 0; i3 < str.length; i3++) {
    const c3 = str.charCodeAt(i3);
    if (c3 < 128) {
      result.push(c3);
    } else if (c3 < 2048) {
      result.push(c3 >> 6 | 192);
      result.push(c3 & 63 | 128);
    } else if ((c3 & 64512) == 55296) {
      i3++;
      const c22 = str.charCodeAt(i3);
      if (i3 >= str.length || (c22 & 64512) !== 56320) {
        throw new Error("invalid utf-8 string");
      }
      const pair = 65536 + ((c3 & 1023) << 10) + (c22 & 1023);
      result.push(pair >> 18 | 240);
      result.push(pair >> 12 & 63 | 128);
      result.push(pair >> 6 & 63 | 128);
      result.push(pair & 63 | 128);
    } else {
      result.push(c3 >> 12 | 224);
      result.push(c3 >> 6 & 63 | 128);
      result.push(c3 & 63 | 128);
    }
  }
  return arrayify(result);
}
function escapeChar(value) {
  const hex = "0000" + value.toString(16);
  return "\\u" + hex.substring(hex.length - 4);
}
function _toEscapedUtf8String(bytes, onError) {
  return '"' + getUtf8CodePoints(bytes, onError).map((codePoint) => {
    if (codePoint < 256) {
      switch (codePoint) {
        case 8:
          return "\\b";
        case 9:
          return "\\t";
        case 10:
          return "\\n";
        case 13:
          return "\\r";
        case 34:
          return '\\"';
        case 92:
          return "\\\\";
      }
      if (codePoint >= 32 && codePoint < 127) {
        return String.fromCharCode(codePoint);
      }
    }
    if (codePoint <= 65535) {
      return escapeChar(codePoint);
    }
    codePoint -= 65536;
    return escapeChar((codePoint >> 10 & 1023) + 55296) + escapeChar((codePoint & 1023) + 56320);
  }).join("") + '"';
}
function _toUtf8String(codePoints) {
  return codePoints.map((codePoint) => {
    if (codePoint <= 65535) {
      return String.fromCharCode(codePoint);
    }
    codePoint -= 65536;
    return String.fromCharCode((codePoint >> 10 & 1023) + 55296, (codePoint & 1023) + 56320);
  }).join("");
}
function toUtf8String(bytes, onError) {
  return _toUtf8String(getUtf8CodePoints(bytes, onError));
}
function toUtf8CodePoints(str, form = UnicodeNormalizationForm.current) {
  return getUtf8CodePoints(toUtf8Bytes(str, form));
}

// node_modules/@ethersproject/strings/lib.esm/bytes32.js
"use strict";
function formatBytes32String(text) {
  const bytes = toUtf8Bytes(text);
  if (bytes.length > 31) {
    throw new Error("bytes32 string must be less than 32 bytes");
  }
  return hexlify(concat([bytes, HashZero]).slice(0, 32));
}
function parseBytes32String(bytes) {
  const data = arrayify(bytes);
  if (data.length !== 32) {
    throw new Error("invalid bytes32 - not 32 bytes long");
  }
  if (data[31] !== 0) {
    throw new Error("invalid bytes32 string - no null terminator");
  }
  let length = 31;
  while (data[length - 1] === 0) {
    length--;
  }
  return toUtf8String(data.slice(0, length));
}

// node_modules/@ethersproject/strings/lib.esm/idna.js
"use strict";
function bytes2(data) {
  if (data.length % 4 !== 0) {
    throw new Error("bad data");
  }
  let result = [];
  for (let i3 = 0; i3 < data.length; i3 += 4) {
    result.push(parseInt(data.substring(i3, i3 + 4), 16));
  }
  return result;
}
function createTable(data, func) {
  if (!func) {
    func = function(value) {
      return [parseInt(value, 16)];
    };
  }
  let lo = 0;
  let result = {};
  data.split(",").forEach((pair) => {
    let comps = pair.split(":");
    lo += parseInt(comps[0], 16);
    result[lo] = func(comps[1]);
  });
  return result;
}
function createRangeTable(data) {
  let hi = 0;
  return data.split(",").map((v3) => {
    let comps = v3.split("-");
    if (comps.length === 1) {
      comps[1] = "0";
    } else if (comps[1] === "") {
      comps[1] = "1";
    }
    let lo = hi + parseInt(comps[0], 16);
    hi = parseInt(comps[1], 16);
    return { l: lo, h: hi };
  });
}
function matchMap(value, ranges) {
  let lo = 0;
  for (let i3 = 0; i3 < ranges.length; i3++) {
    let range = ranges[i3];
    lo += range.l;
    if (value >= lo && value <= lo + range.h && (value - lo) % (range.d || 1) === 0) {
      if (range.e && range.e.indexOf(value - lo) !== -1) {
        continue;
      }
      return range;
    }
  }
  return null;
}
var Table_A_1_ranges = createRangeTable("221,13-1b,5f-,40-10,51-f,11-3,3-3,2-2,2-4,8,2,15,2d,28-8,88,48,27-,3-5,11-20,27-,8,28,3-5,12,18,b-a,1c-4,6-16,2-d,2-2,2,1b-4,17-9,8f-,10,f,1f-2,1c-34,33-14e,4,36-,13-,6-2,1a-f,4,9-,3-,17,8,2-2,5-,2,8-,3-,4-8,2-3,3,6-,16-6,2-,7-3,3-,17,8,3,3,3-,2,6-3,3-,4-a,5,2-6,10-b,4,8,2,4,17,8,3,6-,b,4,4-,2-e,2-4,b-10,4,9-,3-,17,8,3-,5-,9-2,3-,4-7,3-3,3,4-3,c-10,3,7-2,4,5-2,3,2,3-2,3-2,4-2,9,4-3,6-2,4,5-8,2-e,d-d,4,9,4,18,b,6-3,8,4,5-6,3-8,3-3,b-11,3,9,4,18,b,6-3,8,4,5-6,3-6,2,3-3,b-11,3,9,4,18,11-3,7-,4,5-8,2-7,3-3,b-11,3,13-2,19,a,2-,8-2,2-3,7,2,9-11,4-b,3b-3,1e-24,3,2-,3,2-,2-5,5,8,4,2,2-,3,e,4-,6,2,7-,b-,3-21,49,23-5,1c-3,9,25,10-,2-2f,23,6,3,8-2,5-5,1b-45,27-9,2a-,2-3,5b-4,45-4,53-5,8,40,2,5-,8,2,5-,28,2,5-,20,2,5-,8,2,5-,8,8,18,20,2,5-,8,28,14-5,1d-22,56-b,277-8,1e-2,52-e,e,8-a,18-8,15-b,e,4,3-b,5e-2,b-15,10,b-5,59-7,2b-555,9d-3,5b-5,17-,7-,27-,7-,9,2,2,2,20-,36,10,f-,7,14-,4,a,54-3,2-6,6-5,9-,1c-10,13-1d,1c-14,3c-,10-6,32-b,240-30,28-18,c-14,a0,115-,3,66-,b-76,5,5-,1d,24,2,5-2,2,8-,35-2,19,f-10,1d-3,311-37f,1b,5a-b,d7-19,d-3,41,57-,68-4,29-3,5f,29-37,2e-2,25-c,2c-2,4e-3,30,78-3,64-,20,19b7-49,51a7-59,48e-2,38-738,2ba5-5b,222f-,3c-94,8-b,6-4,1b,6,2,3,3,6d-20,16e-f,41-,37-7,2e-2,11-f,5-b,18-,b,14,5-3,6,88-,2,bf-2,7-,7-,7-,4-2,8,8-9,8-2ff,20,5-b,1c-b4,27-,27-cbb1,f7-9,28-2,b5-221,56,48,3-,2-,3-,5,d,2,5,3,42,5-,9,8,1d,5,6,2-2,8,153-3,123-3,33-27fd,a6da-5128,21f-5df,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3,2-1d,61-ff7d");
var Table_B_1_flags = "ad,34f,1806,180b,180c,180d,200b,200c,200d,2060,feff".split(",").map((v3) => parseInt(v3, 16));
var Table_B_2_ranges = [
  { h: 25, s: 32, l: 65 },
  { h: 30, s: 32, e: [23], l: 127 },
  { h: 54, s: 1, e: [48], l: 64, d: 2 },
  { h: 14, s: 1, l: 57, d: 2 },
  { h: 44, s: 1, l: 17, d: 2 },
  { h: 10, s: 1, e: [2, 6, 8], l: 61, d: 2 },
  { h: 16, s: 1, l: 68, d: 2 },
  { h: 84, s: 1, e: [18, 24, 66], l: 19, d: 2 },
  { h: 26, s: 32, e: [17], l: 435 },
  { h: 22, s: 1, l: 71, d: 2 },
  { h: 15, s: 80, l: 40 },
  { h: 31, s: 32, l: 16 },
  { h: 32, s: 1, l: 80, d: 2 },
  { h: 52, s: 1, l: 42, d: 2 },
  { h: 12, s: 1, l: 55, d: 2 },
  { h: 40, s: 1, e: [38], l: 15, d: 2 },
  { h: 14, s: 1, l: 48, d: 2 },
  { h: 37, s: 48, l: 49 },
  { h: 148, s: 1, l: 6351, d: 2 },
  { h: 88, s: 1, l: 160, d: 2 },
  { h: 15, s: 16, l: 704 },
  { h: 25, s: 26, l: 854 },
  { h: 25, s: 32, l: 55915 },
  { h: 37, s: 40, l: 1247 },
  { h: 25, s: -119711, l: 53248 },
  { h: 25, s: -119763, l: 52 },
  { h: 25, s: -119815, l: 52 },
  { h: 25, s: -119867, e: [1, 4, 5, 7, 8, 11, 12, 17], l: 52 },
  { h: 25, s: -119919, l: 52 },
  { h: 24, s: -119971, e: [2, 7, 8, 17], l: 52 },
  { h: 24, s: -120023, e: [2, 7, 13, 15, 16, 17], l: 52 },
  { h: 25, s: -120075, l: 52 },
  { h: 25, s: -120127, l: 52 },
  { h: 25, s: -120179, l: 52 },
  { h: 25, s: -120231, l: 52 },
  { h: 25, s: -120283, l: 52 },
  { h: 25, s: -120335, l: 52 },
  { h: 24, s: -119543, e: [17], l: 56 },
  { h: 24, s: -119601, e: [17], l: 58 },
  { h: 24, s: -119659, e: [17], l: 58 },
  { h: 24, s: -119717, e: [17], l: 58 },
  { h: 24, s: -119775, e: [17], l: 58 }
];
var Table_B_2_lut_abs = createTable("b5:3bc,c3:ff,7:73,2:253,5:254,3:256,1:257,5:259,1:25b,3:260,1:263,2:269,1:268,5:26f,1:272,2:275,7:280,3:283,5:288,3:28a,1:28b,5:292,3f:195,1:1bf,29:19e,125:3b9,8b:3b2,1:3b8,1:3c5,3:3c6,1:3c0,1a:3ba,1:3c1,1:3c3,2:3b8,1:3b5,1bc9:3b9,1c:1f76,1:1f77,f:1f7a,1:1f7b,d:1f78,1:1f79,1:1f7c,1:1f7d,107:63,5:25b,4:68,1:68,1:68,3:69,1:69,1:6c,3:6e,4:70,1:71,1:72,1:72,1:72,7:7a,2:3c9,2:7a,2:6b,1:e5,1:62,1:63,3:65,1:66,2:6d,b:3b3,1:3c0,6:64,1b574:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3");
var Table_B_2_lut_rel = createTable("179:1,2:1,2:1,5:1,2:1,a:4f,a:1,8:1,2:1,2:1,3:1,5:1,3:1,4:1,2:1,3:1,4:1,8:2,1:1,2:2,1:1,2:2,27:2,195:26,2:25,1:25,1:25,2:40,2:3f,1:3f,33:1,11:-6,1:-9,1ac7:-3a,6d:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,b:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,c:-8,2:-8,2:-8,2:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,49:-8,1:-8,1:-4a,1:-4a,d:-56,1:-56,1:-56,1:-56,d:-8,1:-8,f:-8,1:-8,3:-7");
var Table_B_2_complex = createTable("df:00730073,51:00690307,19:02BC006E,a7:006A030C,18a:002003B9,16:03B903080301,20:03C503080301,1d7:05650582,190f:00680331,1:00740308,1:0077030A,1:0079030A,1:006102BE,b6:03C50313,2:03C503130300,2:03C503130301,2:03C503130342,2a:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,3:1F7003B9,1:03B103B9,1:03AC03B9,2:03B10342,1:03B1034203B9,5:03B103B9,6:1F7403B9,1:03B703B9,1:03AE03B9,2:03B70342,1:03B7034203B9,5:03B703B9,6:03B903080300,1:03B903080301,3:03B90342,1:03B903080342,b:03C503080300,1:03C503080301,1:03C10313,2:03C50342,1:03C503080342,b:1F7C03B9,1:03C903B9,1:03CE03B9,2:03C90342,1:03C9034203B9,5:03C903B9,ac:00720073,5b:00B00063,6:00B00066,d:006E006F,a:0073006D,1:00740065006C,1:0074006D,124f:006800700061,2:00610075,2:006F0076,b:00700061,1:006E0061,1:03BC0061,1:006D0061,1:006B0061,1:006B0062,1:006D0062,1:00670062,3:00700066,1:006E0066,1:03BC0066,4:0068007A,1:006B0068007A,1:006D0068007A,1:00670068007A,1:00740068007A,15:00700061,1:006B00700061,1:006D00700061,1:006700700061,8:00700076,1:006E0076,1:03BC0076,1:006D0076,1:006B0076,1:006D0076,1:00700077,1:006E0077,1:03BC0077,1:006D0077,1:006B0077,1:006D0077,1:006B03C9,1:006D03C9,2:00620071,3:00632215006B0067,1:0063006F002E,1:00640062,1:00670079,2:00680070,2:006B006B,1:006B006D,9:00700068,2:00700070006D,1:00700072,2:00730076,1:00770062,c723:00660066,1:00660069,1:0066006C,1:006600660069,1:00660066006C,1:00730074,1:00730074,d:05740576,1:05740565,1:0574056B,1:057E0576,1:0574056D", bytes2);
var Table_C_ranges = createRangeTable("80-20,2a0-,39c,32,f71,18e,7f2-f,19-7,30-4,7-5,f81-b,5,a800-20ff,4d1-1f,110,fa-6,d174-7,2e84-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,2,1f-5f,ff7f-20001");
function flatten(values) {
  return values.reduce((accum, value) => {
    value.forEach((value2) => {
      accum.push(value2);
    });
    return accum;
  }, []);
}
function _nameprepTableA1(codepoint) {
  return !!matchMap(codepoint, Table_A_1_ranges);
}
function _nameprepTableB2(codepoint) {
  let range = matchMap(codepoint, Table_B_2_ranges);
  if (range) {
    return [codepoint + range.s];
  }
  let codes = Table_B_2_lut_abs[codepoint];
  if (codes) {
    return codes;
  }
  let shift = Table_B_2_lut_rel[codepoint];
  if (shift) {
    return [codepoint + shift[0]];
  }
  let complex = Table_B_2_complex[codepoint];
  if (complex) {
    return complex;
  }
  return null;
}
function _nameprepTableC(codepoint) {
  return !!matchMap(codepoint, Table_C_ranges);
}
function nameprep(value) {
  if (value.match(/^[a-z0-9-]*$/i) && value.length <= 59) {
    return value.toLowerCase();
  }
  let codes = toUtf8CodePoints(value);
  codes = flatten(codes.map((code) => {
    if (Table_B_1_flags.indexOf(code) >= 0) {
      return [];
    }
    if (code >= 65024 && code <= 65039) {
      return [];
    }
    let codesTableB2 = _nameprepTableB2(code);
    if (codesTableB2) {
      return codesTableB2;
    }
    return [code];
  }));
  codes = toUtf8CodePoints(_toUtf8String(codes), UnicodeNormalizationForm.NFKC);
  codes.forEach((code) => {
    if (_nameprepTableC(code)) {
      throw new Error("STRINGPREP_CONTAINS_PROHIBITED");
    }
  });
  codes.forEach((code) => {
    if (_nameprepTableA1(code)) {
      throw new Error("STRINGPREP_CONTAINS_UNASSIGNED");
    }
  });
  let name2 = _toUtf8String(codes);
  if (name2.substring(0, 1) === "-" || name2.substring(2, 4) === "--" || name2.substring(name2.length - 1) === "-") {
    throw new Error("invalid hyphen");
  }
  if (name2.length > 63) {
    throw new Error("too long");
  }
  return name2;
}

// node_modules/@ethersproject/strings/lib.esm/index.js
"use strict";

// node_modules/@ethersproject/abi/lib.esm/coders/string.js
"use strict";
var StringCoder = class extends DynamicBytesCoder {
  constructor(localName) {
    super("string", localName);
  }
  defaultValue() {
    return "";
  }
  encode(writer, value) {
    return super.encode(writer, toUtf8Bytes(value));
  }
  decode(reader) {
    return toUtf8String(super.decode(reader));
  }
};

// node_modules/@ethersproject/abi/lib.esm/coders/tuple.js
"use strict";
var TupleCoder = class extends Coder {
  constructor(coders, localName) {
    let dynamic = false;
    const types = [];
    coders.forEach((coder) => {
      if (coder.dynamic) {
        dynamic = true;
      }
      types.push(coder.type);
    });
    const type = "tuple(" + types.join(",") + ")";
    super("tuple", type, localName, dynamic);
    this.coders = coders;
  }
  defaultValue() {
    const values = [];
    this.coders.forEach((coder) => {
      values.push(coder.defaultValue());
    });
    const uniqueNames = this.coders.reduce((accum, coder) => {
      const name2 = coder.localName;
      if (name2) {
        if (!accum[name2]) {
          accum[name2] = 0;
        }
        accum[name2]++;
      }
      return accum;
    }, {});
    this.coders.forEach((coder, index) => {
      let name2 = coder.localName;
      if (!name2 || uniqueNames[name2] !== 1) {
        return;
      }
      if (name2 === "length") {
        name2 = "_length";
      }
      if (values[name2] != null) {
        return;
      }
      values[name2] = values[index];
    });
    return Object.freeze(values);
  }
  encode(writer, value) {
    return pack(writer, this.coders, value);
  }
  decode(reader) {
    return reader.coerce(this.name, unpack(reader, this.coders));
  }
};

// node_modules/@ethersproject/abi/lib.esm/abi-coder.js
"use strict";
var logger11 = new Logger(version5);
var paramTypeBytes = new RegExp(/^bytes([0-9]*)$/);
var paramTypeNumber = new RegExp(/^(u?int)([0-9]*)$/);
var AbiCoder = class {
  constructor(coerceFunc) {
    logger11.checkNew(new.target, AbiCoder);
    defineReadOnly(this, "coerceFunc", coerceFunc || null);
  }
  _getCoder(param) {
    switch (param.baseType) {
      case "address":
        return new AddressCoder(param.name);
      case "bool":
        return new BooleanCoder(param.name);
      case "string":
        return new StringCoder(param.name);
      case "bytes":
        return new BytesCoder(param.name);
      case "array":
        return new ArrayCoder(this._getCoder(param.arrayChildren), param.arrayLength, param.name);
      case "tuple":
        return new TupleCoder((param.components || []).map((component) => {
          return this._getCoder(component);
        }), param.name);
      case "":
        return new NullCoder(param.name);
    }
    let match = param.type.match(paramTypeNumber);
    if (match) {
      let size = parseInt(match[2] || "256");
      if (size === 0 || size > 256 || size % 8 !== 0) {
        logger11.throwArgumentError("invalid " + match[1] + " bit length", "param", param);
      }
      return new NumberCoder(size / 8, match[1] === "int", param.name);
    }
    match = param.type.match(paramTypeBytes);
    if (match) {
      let size = parseInt(match[1]);
      if (size === 0 || size > 32) {
        logger11.throwArgumentError("invalid bytes length", "param", param);
      }
      return new FixedBytesCoder(size, param.name);
    }
    return logger11.throwArgumentError("invalid type", "type", param.type);
  }
  _getWordSize() {
    return 32;
  }
  _getReader(data, allowLoose) {
    return new Reader(data, this._getWordSize(), this.coerceFunc, allowLoose);
  }
  _getWriter() {
    return new Writer(this._getWordSize());
  }
  getDefaultValue(types) {
    const coders = types.map((type) => this._getCoder(ParamType.from(type)));
    const coder = new TupleCoder(coders, "_");
    return coder.defaultValue();
  }
  encode(types, values) {
    if (types.length !== values.length) {
      logger11.throwError("types/values length mismatch", Logger.errors.INVALID_ARGUMENT, {
        count: { types: types.length, values: values.length },
        value: { types, values }
      });
    }
    const coders = types.map((type) => this._getCoder(ParamType.from(type)));
    const coder = new TupleCoder(coders, "_");
    const writer = this._getWriter();
    coder.encode(writer, values);
    return writer.data;
  }
  decode(types, data, loose) {
    const coders = types.map((type) => this._getCoder(ParamType.from(type)));
    const coder = new TupleCoder(coders, "_");
    return coder.decode(this._getReader(arrayify(data), loose));
  }
};
var defaultAbiCoder = new AbiCoder();

// node_modules/@ethersproject/hash/lib.esm/id.js
function id(text) {
  return keccak256(toUtf8Bytes(text));
}

// node_modules/@ethersproject/hash/lib.esm/_version.js
var version9 = "hash/5.5.0";

// node_modules/@ethersproject/hash/lib.esm/namehash.js
var logger12 = new Logger(version9);
var Zeros = new Uint8Array(32);
Zeros.fill(0);
var Partition = new RegExp("^((.*)\\.)?([^.]+)$");
function isValidName(name2) {
  try {
    const comps = name2.split(".");
    for (let i3 = 0; i3 < comps.length; i3++) {
      if (nameprep(comps[i3]).length === 0) {
        throw new Error("empty");
      }
    }
    return true;
  } catch (error) {
  }
  return false;
}
function namehash(name2) {
  if (typeof name2 !== "string") {
    logger12.throwArgumentError("invalid ENS name; not a string", "name", name2);
  }
  let current = name2;
  let result = Zeros;
  while (current.length) {
    const partition = current.match(Partition);
    if (partition == null || partition[2] === "") {
      logger12.throwArgumentError("invalid ENS address; missing component", "name", name2);
    }
    const label = toUtf8Bytes(nameprep(partition[3]));
    result = keccak256(concat([result, keccak256(label)]));
    current = partition[2] || "";
  }
  return hexlify(result);
}

// node_modules/@ethersproject/hash/lib.esm/message.js
var messagePrefix = "Ethereum Signed Message:\n";
function hashMessage(message) {
  if (typeof message === "string") {
    message = toUtf8Bytes(message);
  }
  return keccak256(concat([
    toUtf8Bytes(messagePrefix),
    toUtf8Bytes(String(message.length)),
    message
  ]));
}

// node_modules/@ethersproject/hash/lib.esm/typed-data.js
var __awaiter2 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var logger13 = new Logger(version9);
var padding = new Uint8Array(32);
padding.fill(0);
var NegativeOne3 = BigNumber.from(-1);
var Zero3 = BigNumber.from(0);
var One2 = BigNumber.from(1);
var MaxUint2562 = BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
function hexPadRight(value) {
  const bytes = arrayify(value);
  const padOffset = bytes.length % 32;
  if (padOffset) {
    return hexConcat([bytes, padding.slice(padOffset)]);
  }
  return hexlify(bytes);
}
var hexTrue = hexZeroPad(One2.toHexString(), 32);
var hexFalse = hexZeroPad(Zero3.toHexString(), 32);
var domainFieldTypes = {
  name: "string",
  version: "string",
  chainId: "uint256",
  verifyingContract: "address",
  salt: "bytes32"
};
var domainFieldNames = [
  "name",
  "version",
  "chainId",
  "verifyingContract",
  "salt"
];
function checkString(key2) {
  return function(value) {
    if (typeof value !== "string") {
      logger13.throwArgumentError(`invalid domain value for ${JSON.stringify(key2)}`, `domain.${key2}`, value);
    }
    return value;
  };
}
var domainChecks = {
  name: checkString("name"),
  version: checkString("version"),
  chainId: function(value) {
    try {
      return BigNumber.from(value).toString();
    } catch (error) {
    }
    return logger13.throwArgumentError(`invalid domain value for "chainId"`, "domain.chainId", value);
  },
  verifyingContract: function(value) {
    try {
      return getAddress(value).toLowerCase();
    } catch (error) {
    }
    return logger13.throwArgumentError(`invalid domain value "verifyingContract"`, "domain.verifyingContract", value);
  },
  salt: function(value) {
    try {
      const bytes = arrayify(value);
      if (bytes.length !== 32) {
        throw new Error("bad length");
      }
      return hexlify(bytes);
    } catch (error) {
    }
    return logger13.throwArgumentError(`invalid domain value "salt"`, "domain.salt", value);
  }
};
function getBaseEncoder(type) {
  {
    const match = type.match(/^(u?)int(\d*)$/);
    if (match) {
      const signed = match[1] === "";
      const width = parseInt(match[2] || "256");
      if (width % 8 !== 0 || width > 256 || match[2] && match[2] !== String(width)) {
        logger13.throwArgumentError("invalid numeric width", "type", type);
      }
      const boundsUpper = MaxUint2562.mask(signed ? width - 1 : width);
      const boundsLower = signed ? boundsUpper.add(One2).mul(NegativeOne3) : Zero3;
      return function(value) {
        const v3 = BigNumber.from(value);
        if (v3.lt(boundsLower) || v3.gt(boundsUpper)) {
          logger13.throwArgumentError(`value out-of-bounds for ${type}`, "value", value);
        }
        return hexZeroPad(v3.toTwos(256).toHexString(), 32);
      };
    }
  }
  {
    const match = type.match(/^bytes(\d+)$/);
    if (match) {
      const width = parseInt(match[1]);
      if (width === 0 || width > 32 || match[1] !== String(width)) {
        logger13.throwArgumentError("invalid bytes width", "type", type);
      }
      return function(value) {
        const bytes = arrayify(value);
        if (bytes.length !== width) {
          logger13.throwArgumentError(`invalid length for ${type}`, "value", value);
        }
        return hexPadRight(value);
      };
    }
  }
  switch (type) {
    case "address":
      return function(value) {
        return hexZeroPad(getAddress(value), 32);
      };
    case "bool":
      return function(value) {
        return !value ? hexFalse : hexTrue;
      };
    case "bytes":
      return function(value) {
        return keccak256(value);
      };
    case "string":
      return function(value) {
        return id(value);
      };
  }
  return null;
}
function encodeType(name2, fields) {
  return `${name2}(${fields.map(({ name: name3, type }) => type + " " + name3).join(",")})`;
}
var TypedDataEncoder = class {
  constructor(types) {
    defineReadOnly(this, "types", Object.freeze(deepCopy(types)));
    defineReadOnly(this, "_encoderCache", {});
    defineReadOnly(this, "_types", {});
    const links = {};
    const parents = {};
    const subtypes = {};
    Object.keys(types).forEach((type) => {
      links[type] = {};
      parents[type] = [];
      subtypes[type] = {};
    });
    for (const name2 in types) {
      const uniqueNames = {};
      types[name2].forEach((field) => {
        if (uniqueNames[field.name]) {
          logger13.throwArgumentError(`duplicate variable name ${JSON.stringify(field.name)} in ${JSON.stringify(name2)}`, "types", types);
        }
        uniqueNames[field.name] = true;
        const baseType = field.type.match(/^([^\x5b]*)(\x5b|$)/)[1];
        if (baseType === name2) {
          logger13.throwArgumentError(`circular type reference to ${JSON.stringify(baseType)}`, "types", types);
        }
        const encoder = getBaseEncoder(baseType);
        if (encoder) {
          return;
        }
        if (!parents[baseType]) {
          logger13.throwArgumentError(`unknown type ${JSON.stringify(baseType)}`, "types", types);
        }
        parents[baseType].push(name2);
        links[name2][baseType] = true;
      });
    }
    const primaryTypes = Object.keys(parents).filter((n2) => parents[n2].length === 0);
    if (primaryTypes.length === 0) {
      logger13.throwArgumentError("missing primary type", "types", types);
    } else if (primaryTypes.length > 1) {
      logger13.throwArgumentError(`ambiguous primary types or unused types: ${primaryTypes.map((t3) => JSON.stringify(t3)).join(", ")}`, "types", types);
    }
    defineReadOnly(this, "primaryType", primaryTypes[0]);
    function checkCircular(type, found) {
      if (found[type]) {
        logger13.throwArgumentError(`circular type reference to ${JSON.stringify(type)}`, "types", types);
      }
      found[type] = true;
      Object.keys(links[type]).forEach((child) => {
        if (!parents[child]) {
          return;
        }
        checkCircular(child, found);
        Object.keys(found).forEach((subtype) => {
          subtypes[subtype][child] = true;
        });
      });
      delete found[type];
    }
    checkCircular(this.primaryType, {});
    for (const name2 in subtypes) {
      const st = Object.keys(subtypes[name2]);
      st.sort();
      this._types[name2] = encodeType(name2, types[name2]) + st.map((t3) => encodeType(t3, types[t3])).join("");
    }
  }
  getEncoder(type) {
    let encoder = this._encoderCache[type];
    if (!encoder) {
      encoder = this._encoderCache[type] = this._getEncoder(type);
    }
    return encoder;
  }
  _getEncoder(type) {
    {
      const encoder = getBaseEncoder(type);
      if (encoder) {
        return encoder;
      }
    }
    const match = type.match(/^(.*)(\x5b(\d*)\x5d)$/);
    if (match) {
      const subtype = match[1];
      const subEncoder = this.getEncoder(subtype);
      const length = parseInt(match[3]);
      return (value) => {
        if (length >= 0 && value.length !== length) {
          logger13.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", value);
        }
        let result = value.map(subEncoder);
        if (this._types[subtype]) {
          result = result.map(keccak256);
        }
        return keccak256(hexConcat(result));
      };
    }
    const fields = this.types[type];
    if (fields) {
      const encodedType = id(this._types[type]);
      return (value) => {
        const values = fields.map(({ name: name2, type: type2 }) => {
          const result = this.getEncoder(type2)(value[name2]);
          if (this._types[type2]) {
            return keccak256(result);
          }
          return result;
        });
        values.unshift(encodedType);
        return hexConcat(values);
      };
    }
    return logger13.throwArgumentError(`unknown type: ${type}`, "type", type);
  }
  encodeType(name2) {
    const result = this._types[name2];
    if (!result) {
      logger13.throwArgumentError(`unknown type: ${JSON.stringify(name2)}`, "name", name2);
    }
    return result;
  }
  encodeData(type, value) {
    return this.getEncoder(type)(value);
  }
  hashStruct(name2, value) {
    return keccak256(this.encodeData(name2, value));
  }
  encode(value) {
    return this.encodeData(this.primaryType, value);
  }
  hash(value) {
    return this.hashStruct(this.primaryType, value);
  }
  _visit(type, value, callback) {
    {
      const encoder = getBaseEncoder(type);
      if (encoder) {
        return callback(type, value);
      }
    }
    const match = type.match(/^(.*)(\x5b(\d*)\x5d)$/);
    if (match) {
      const subtype = match[1];
      const length = parseInt(match[3]);
      if (length >= 0 && value.length !== length) {
        logger13.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", value);
      }
      return value.map((v3) => this._visit(subtype, v3, callback));
    }
    const fields = this.types[type];
    if (fields) {
      return fields.reduce((accum, { name: name2, type: type2 }) => {
        accum[name2] = this._visit(type2, value[name2], callback);
        return accum;
      }, {});
    }
    return logger13.throwArgumentError(`unknown type: ${type}`, "type", type);
  }
  visit(value, callback) {
    return this._visit(this.primaryType, value, callback);
  }
  static from(types) {
    return new TypedDataEncoder(types);
  }
  static getPrimaryType(types) {
    return TypedDataEncoder.from(types).primaryType;
  }
  static hashStruct(name2, types, value) {
    return TypedDataEncoder.from(types).hashStruct(name2, value);
  }
  static hashDomain(domain) {
    const domainFields = [];
    for (const name2 in domain) {
      const type = domainFieldTypes[name2];
      if (!type) {
        logger13.throwArgumentError(`invalid typed-data domain key: ${JSON.stringify(name2)}`, "domain", domain);
      }
      domainFields.push({ name: name2, type });
    }
    domainFields.sort((a3, b3) => {
      return domainFieldNames.indexOf(a3.name) - domainFieldNames.indexOf(b3.name);
    });
    return TypedDataEncoder.hashStruct("EIP712Domain", { EIP712Domain: domainFields }, domain);
  }
  static encode(domain, types, value) {
    return hexConcat([
      "0x1901",
      TypedDataEncoder.hashDomain(domain),
      TypedDataEncoder.from(types).hash(value)
    ]);
  }
  static hash(domain, types, value) {
    return keccak256(TypedDataEncoder.encode(domain, types, value));
  }
  static resolveNames(domain, types, value, resolveName2) {
    return __awaiter2(this, void 0, void 0, function* () {
      domain = shallowCopy(domain);
      const ensCache = {};
      if (domain.verifyingContract && !isHexString(domain.verifyingContract, 20)) {
        ensCache[domain.verifyingContract] = "0x";
      }
      const encoder = TypedDataEncoder.from(types);
      encoder.visit(value, (type, value2) => {
        if (type === "address" && !isHexString(value2, 20)) {
          ensCache[value2] = "0x";
        }
        return value2;
      });
      for (const name2 in ensCache) {
        ensCache[name2] = yield resolveName2(name2);
      }
      if (domain.verifyingContract && ensCache[domain.verifyingContract]) {
        domain.verifyingContract = ensCache[domain.verifyingContract];
      }
      value = encoder.visit(value, (type, value2) => {
        if (type === "address" && ensCache[value2]) {
          return ensCache[value2];
        }
        return value2;
      });
      return { domain, value };
    });
  }
  static getPayload(domain, types, value) {
    TypedDataEncoder.hashDomain(domain);
    const domainValues = {};
    const domainTypes = [];
    domainFieldNames.forEach((name2) => {
      const value2 = domain[name2];
      if (value2 == null) {
        return;
      }
      domainValues[name2] = domainChecks[name2](value2);
      domainTypes.push({ name: name2, type: domainFieldTypes[name2] });
    });
    const encoder = TypedDataEncoder.from(types);
    const typesWithDomain = shallowCopy(types);
    if (typesWithDomain.EIP712Domain) {
      logger13.throwArgumentError("types must not contain EIP712Domain type", "types.EIP712Domain", types);
    } else {
      typesWithDomain.EIP712Domain = domainTypes;
    }
    encoder.encode(value);
    return {
      types: typesWithDomain,
      domain: domainValues,
      primaryType: encoder.primaryType,
      message: encoder.visit(value, (type, value2) => {
        if (type.match(/^bytes(\d*)/)) {
          return hexlify(arrayify(value2));
        }
        if (type.match(/^u?int/)) {
          return BigNumber.from(value2).toString();
        }
        switch (type) {
          case "address":
            return value2.toLowerCase();
          case "bool":
            return !!value2;
          case "string":
            if (typeof value2 !== "string") {
              logger13.throwArgumentError(`invalid string`, "value", value2);
            }
            return value2;
        }
        return logger13.throwArgumentError("unsupported type", "type", type);
      })
    };
  }
};

// node_modules/@ethersproject/hash/lib.esm/index.js
"use strict";

// node_modules/@ethersproject/abi/lib.esm/interface.js
"use strict";
var logger14 = new Logger(version5);
var LogDescription = class extends Description {
};
var TransactionDescription = class extends Description {
};
var ErrorDescription = class extends Description {
};
var Indexed = class extends Description {
  static isIndexed(value) {
    return !!(value && value._isIndexed);
  }
};
var BuiltinErrors = {
  "0x08c379a0": { signature: "Error(string)", name: "Error", inputs: ["string"], reason: true },
  "0x4e487b71": { signature: "Panic(uint256)", name: "Panic", inputs: ["uint256"] }
};
function wrapAccessError(property, error) {
  const wrap = new Error(`deferred error during ABI decoding triggered accessing ${property}`);
  wrap.error = error;
  return wrap;
}
var Interface = class {
  constructor(fragments) {
    logger14.checkNew(new.target, Interface);
    let abi = [];
    if (typeof fragments === "string") {
      abi = JSON.parse(fragments);
    } else {
      abi = fragments;
    }
    defineReadOnly(this, "fragments", abi.map((fragment) => {
      return Fragment.from(fragment);
    }).filter((fragment) => fragment != null));
    defineReadOnly(this, "_abiCoder", getStatic(new.target, "getAbiCoder")());
    defineReadOnly(this, "functions", {});
    defineReadOnly(this, "errors", {});
    defineReadOnly(this, "events", {});
    defineReadOnly(this, "structs", {});
    this.fragments.forEach((fragment) => {
      let bucket = null;
      switch (fragment.type) {
        case "constructor":
          if (this.deploy) {
            logger14.warn("duplicate definition - constructor");
            return;
          }
          defineReadOnly(this, "deploy", fragment);
          return;
        case "function":
          bucket = this.functions;
          break;
        case "event":
          bucket = this.events;
          break;
        case "error":
          bucket = this.errors;
          break;
        default:
          return;
      }
      let signature2 = fragment.format();
      if (bucket[signature2]) {
        logger14.warn("duplicate definition - " + signature2);
        return;
      }
      bucket[signature2] = fragment;
    });
    if (!this.deploy) {
      defineReadOnly(this, "deploy", ConstructorFragment.from({
        payable: false,
        type: "constructor"
      }));
    }
    defineReadOnly(this, "_isInterface", true);
  }
  format(format) {
    if (!format) {
      format = FormatTypes.full;
    }
    if (format === FormatTypes.sighash) {
      logger14.throwArgumentError("interface does not support formatting sighash", "format", format);
    }
    const abi = this.fragments.map((fragment) => fragment.format(format));
    if (format === FormatTypes.json) {
      return JSON.stringify(abi.map((j3) => JSON.parse(j3)));
    }
    return abi;
  }
  static getAbiCoder() {
    return defaultAbiCoder;
  }
  static getAddress(address) {
    return getAddress(address);
  }
  static getSighash(fragment) {
    return hexDataSlice(id(fragment.format()), 0, 4);
  }
  static getEventTopic(eventFragment) {
    return id(eventFragment.format());
  }
  getFunction(nameOrSignatureOrSighash) {
    if (isHexString(nameOrSignatureOrSighash)) {
      for (const name2 in this.functions) {
        if (nameOrSignatureOrSighash === this.getSighash(name2)) {
          return this.functions[name2];
        }
      }
      logger14.throwArgumentError("no matching function", "sighash", nameOrSignatureOrSighash);
    }
    if (nameOrSignatureOrSighash.indexOf("(") === -1) {
      const name2 = nameOrSignatureOrSighash.trim();
      const matching = Object.keys(this.functions).filter((f3) => f3.split("(")[0] === name2);
      if (matching.length === 0) {
        logger14.throwArgumentError("no matching function", "name", name2);
      } else if (matching.length > 1) {
        logger14.throwArgumentError("multiple matching functions", "name", name2);
      }
      return this.functions[matching[0]];
    }
    const result = this.functions[FunctionFragment.fromString(nameOrSignatureOrSighash).format()];
    if (!result) {
      logger14.throwArgumentError("no matching function", "signature", nameOrSignatureOrSighash);
    }
    return result;
  }
  getEvent(nameOrSignatureOrTopic) {
    if (isHexString(nameOrSignatureOrTopic)) {
      const topichash = nameOrSignatureOrTopic.toLowerCase();
      for (const name2 in this.events) {
        if (topichash === this.getEventTopic(name2)) {
          return this.events[name2];
        }
      }
      logger14.throwArgumentError("no matching event", "topichash", topichash);
    }
    if (nameOrSignatureOrTopic.indexOf("(") === -1) {
      const name2 = nameOrSignatureOrTopic.trim();
      const matching = Object.keys(this.events).filter((f3) => f3.split("(")[0] === name2);
      if (matching.length === 0) {
        logger14.throwArgumentError("no matching event", "name", name2);
      } else if (matching.length > 1) {
        logger14.throwArgumentError("multiple matching events", "name", name2);
      }
      return this.events[matching[0]];
    }
    const result = this.events[EventFragment.fromString(nameOrSignatureOrTopic).format()];
    if (!result) {
      logger14.throwArgumentError("no matching event", "signature", nameOrSignatureOrTopic);
    }
    return result;
  }
  getError(nameOrSignatureOrSighash) {
    if (isHexString(nameOrSignatureOrSighash)) {
      const getSighash = getStatic(this.constructor, "getSighash");
      for (const name2 in this.errors) {
        const error = this.errors[name2];
        if (nameOrSignatureOrSighash === getSighash(error)) {
          return this.errors[name2];
        }
      }
      logger14.throwArgumentError("no matching error", "sighash", nameOrSignatureOrSighash);
    }
    if (nameOrSignatureOrSighash.indexOf("(") === -1) {
      const name2 = nameOrSignatureOrSighash.trim();
      const matching = Object.keys(this.errors).filter((f3) => f3.split("(")[0] === name2);
      if (matching.length === 0) {
        logger14.throwArgumentError("no matching error", "name", name2);
      } else if (matching.length > 1) {
        logger14.throwArgumentError("multiple matching errors", "name", name2);
      }
      return this.errors[matching[0]];
    }
    const result = this.errors[FunctionFragment.fromString(nameOrSignatureOrSighash).format()];
    if (!result) {
      logger14.throwArgumentError("no matching error", "signature", nameOrSignatureOrSighash);
    }
    return result;
  }
  getSighash(fragment) {
    if (typeof fragment === "string") {
      try {
        fragment = this.getFunction(fragment);
      } catch (error) {
        try {
          fragment = this.getError(fragment);
        } catch (_2) {
          throw error;
        }
      }
    }
    return getStatic(this.constructor, "getSighash")(fragment);
  }
  getEventTopic(eventFragment) {
    if (typeof eventFragment === "string") {
      eventFragment = this.getEvent(eventFragment);
    }
    return getStatic(this.constructor, "getEventTopic")(eventFragment);
  }
  _decodeParams(params, data) {
    return this._abiCoder.decode(params, data);
  }
  _encodeParams(params, values) {
    return this._abiCoder.encode(params, values);
  }
  encodeDeploy(values) {
    return this._encodeParams(this.deploy.inputs, values || []);
  }
  decodeErrorResult(fragment, data) {
    if (typeof fragment === "string") {
      fragment = this.getError(fragment);
    }
    const bytes = arrayify(data);
    if (hexlify(bytes.slice(0, 4)) !== this.getSighash(fragment)) {
      logger14.throwArgumentError(`data signature does not match error ${fragment.name}.`, "data", hexlify(bytes));
    }
    return this._decodeParams(fragment.inputs, bytes.slice(4));
  }
  encodeErrorResult(fragment, values) {
    if (typeof fragment === "string") {
      fragment = this.getError(fragment);
    }
    return hexlify(concat([
      this.getSighash(fragment),
      this._encodeParams(fragment.inputs, values || [])
    ]));
  }
  decodeFunctionData(functionFragment, data) {
    if (typeof functionFragment === "string") {
      functionFragment = this.getFunction(functionFragment);
    }
    const bytes = arrayify(data);
    if (hexlify(bytes.slice(0, 4)) !== this.getSighash(functionFragment)) {
      logger14.throwArgumentError(`data signature does not match function ${functionFragment.name}.`, "data", hexlify(bytes));
    }
    return this._decodeParams(functionFragment.inputs, bytes.slice(4));
  }
  encodeFunctionData(functionFragment, values) {
    if (typeof functionFragment === "string") {
      functionFragment = this.getFunction(functionFragment);
    }
    return hexlify(concat([
      this.getSighash(functionFragment),
      this._encodeParams(functionFragment.inputs, values || [])
    ]));
  }
  decodeFunctionResult(functionFragment, data) {
    if (typeof functionFragment === "string") {
      functionFragment = this.getFunction(functionFragment);
    }
    let bytes = arrayify(data);
    let reason = null;
    let errorArgs = null;
    let errorName = null;
    let errorSignature = null;
    switch (bytes.length % this._abiCoder._getWordSize()) {
      case 0:
        try {
          return this._abiCoder.decode(functionFragment.outputs, bytes);
        } catch (error) {
        }
        break;
      case 4: {
        const selector = hexlify(bytes.slice(0, 4));
        const builtin = BuiltinErrors[selector];
        if (builtin) {
          errorArgs = this._abiCoder.decode(builtin.inputs, bytes.slice(4));
          errorName = builtin.name;
          errorSignature = builtin.signature;
          if (builtin.reason) {
            reason = errorArgs[0];
          }
        } else {
          try {
            const error = this.getError(selector);
            errorArgs = this._abiCoder.decode(error.inputs, bytes.slice(4));
            errorName = error.name;
            errorSignature = error.format();
          } catch (error) {
            console.log(error);
          }
        }
        break;
      }
    }
    return logger14.throwError("call revert exception", Logger.errors.CALL_EXCEPTION, {
      method: functionFragment.format(),
      errorArgs,
      errorName,
      errorSignature,
      reason
    });
  }
  encodeFunctionResult(functionFragment, values) {
    if (typeof functionFragment === "string") {
      functionFragment = this.getFunction(functionFragment);
    }
    return hexlify(this._abiCoder.encode(functionFragment.outputs, values || []));
  }
  encodeFilterTopics(eventFragment, values) {
    if (typeof eventFragment === "string") {
      eventFragment = this.getEvent(eventFragment);
    }
    if (values.length > eventFragment.inputs.length) {
      logger14.throwError("too many arguments for " + eventFragment.format(), Logger.errors.UNEXPECTED_ARGUMENT, {
        argument: "values",
        value: values
      });
    }
    let topics = [];
    if (!eventFragment.anonymous) {
      topics.push(this.getEventTopic(eventFragment));
    }
    const encodeTopic = (param, value) => {
      if (param.type === "string") {
        return id(value);
      } else if (param.type === "bytes") {
        return keccak256(hexlify(value));
      }
      if (param.type === "address") {
        this._abiCoder.encode(["address"], [value]);
      }
      return hexZeroPad(hexlify(value), 32);
    };
    values.forEach((value, index) => {
      let param = eventFragment.inputs[index];
      if (!param.indexed) {
        if (value != null) {
          logger14.throwArgumentError("cannot filter non-indexed parameters; must be null", "contract." + param.name, value);
        }
        return;
      }
      if (value == null) {
        topics.push(null);
      } else if (param.baseType === "array" || param.baseType === "tuple") {
        logger14.throwArgumentError("filtering with tuples or arrays not supported", "contract." + param.name, value);
      } else if (Array.isArray(value)) {
        topics.push(value.map((value2) => encodeTopic(param, value2)));
      } else {
        topics.push(encodeTopic(param, value));
      }
    });
    while (topics.length && topics[topics.length - 1] === null) {
      topics.pop();
    }
    return topics;
  }
  encodeEventLog(eventFragment, values) {
    if (typeof eventFragment === "string") {
      eventFragment = this.getEvent(eventFragment);
    }
    const topics = [];
    const dataTypes = [];
    const dataValues = [];
    if (!eventFragment.anonymous) {
      topics.push(this.getEventTopic(eventFragment));
    }
    if (values.length !== eventFragment.inputs.length) {
      logger14.throwArgumentError("event arguments/values mismatch", "values", values);
    }
    eventFragment.inputs.forEach((param, index) => {
      const value = values[index];
      if (param.indexed) {
        if (param.type === "string") {
          topics.push(id(value));
        } else if (param.type === "bytes") {
          topics.push(keccak256(value));
        } else if (param.baseType === "tuple" || param.baseType === "array") {
          throw new Error("not implemented");
        } else {
          topics.push(this._abiCoder.encode([param.type], [value]));
        }
      } else {
        dataTypes.push(param);
        dataValues.push(value);
      }
    });
    return {
      data: this._abiCoder.encode(dataTypes, dataValues),
      topics
    };
  }
  decodeEventLog(eventFragment, data, topics) {
    if (typeof eventFragment === "string") {
      eventFragment = this.getEvent(eventFragment);
    }
    if (topics != null && !eventFragment.anonymous) {
      let topicHash = this.getEventTopic(eventFragment);
      if (!isHexString(topics[0], 32) || topics[0].toLowerCase() !== topicHash) {
        logger14.throwError("fragment/topic mismatch", Logger.errors.INVALID_ARGUMENT, { argument: "topics[0]", expected: topicHash, value: topics[0] });
      }
      topics = topics.slice(1);
    }
    let indexed = [];
    let nonIndexed = [];
    let dynamic = [];
    eventFragment.inputs.forEach((param, index) => {
      if (param.indexed) {
        if (param.type === "string" || param.type === "bytes" || param.baseType === "tuple" || param.baseType === "array") {
          indexed.push(ParamType.fromObject({ type: "bytes32", name: param.name }));
          dynamic.push(true);
        } else {
          indexed.push(param);
          dynamic.push(false);
        }
      } else {
        nonIndexed.push(param);
        dynamic.push(false);
      }
    });
    let resultIndexed = topics != null ? this._abiCoder.decode(indexed, concat(topics)) : null;
    let resultNonIndexed = this._abiCoder.decode(nonIndexed, data, true);
    let result = [];
    let nonIndexedIndex = 0, indexedIndex = 0;
    eventFragment.inputs.forEach((param, index) => {
      if (param.indexed) {
        if (resultIndexed == null) {
          result[index] = new Indexed({ _isIndexed: true, hash: null });
        } else if (dynamic[index]) {
          result[index] = new Indexed({ _isIndexed: true, hash: resultIndexed[indexedIndex++] });
        } else {
          try {
            result[index] = resultIndexed[indexedIndex++];
          } catch (error) {
            result[index] = error;
          }
        }
      } else {
        try {
          result[index] = resultNonIndexed[nonIndexedIndex++];
        } catch (error) {
          result[index] = error;
        }
      }
      if (param.name && result[param.name] == null) {
        const value = result[index];
        if (value instanceof Error) {
          Object.defineProperty(result, param.name, {
            enumerable: true,
            get: () => {
              throw wrapAccessError(`property ${JSON.stringify(param.name)}`, value);
            }
          });
        } else {
          result[param.name] = value;
        }
      }
    });
    for (let i3 = 0; i3 < result.length; i3++) {
      const value = result[i3];
      if (value instanceof Error) {
        Object.defineProperty(result, i3, {
          enumerable: true,
          get: () => {
            throw wrapAccessError(`index ${i3}`, value);
          }
        });
      }
    }
    return Object.freeze(result);
  }
  parseTransaction(tx) {
    let fragment = this.getFunction(tx.data.substring(0, 10).toLowerCase());
    if (!fragment) {
      return null;
    }
    return new TransactionDescription({
      args: this._abiCoder.decode(fragment.inputs, "0x" + tx.data.substring(10)),
      functionFragment: fragment,
      name: fragment.name,
      signature: fragment.format(),
      sighash: this.getSighash(fragment),
      value: BigNumber.from(tx.value || "0")
    });
  }
  parseLog(log) {
    let fragment = this.getEvent(log.topics[0]);
    if (!fragment || fragment.anonymous) {
      return null;
    }
    return new LogDescription({
      eventFragment: fragment,
      name: fragment.name,
      signature: fragment.format(),
      topic: this.getEventTopic(fragment),
      args: this.decodeEventLog(fragment, log.data, log.topics)
    });
  }
  parseError(data) {
    const hexData = hexlify(data);
    let fragment = this.getError(hexData.substring(0, 10).toLowerCase());
    if (!fragment) {
      return null;
    }
    return new ErrorDescription({
      args: this._abiCoder.decode(fragment.inputs, "0x" + hexData.substring(10)),
      errorFragment: fragment,
      name: fragment.name,
      signature: fragment.format(),
      sighash: this.getSighash(fragment)
    });
  }
  static isInterface(value) {
    return !!(value && value._isInterface);
  }
};

// node_modules/@ethersproject/abi/lib.esm/index.js
"use strict";

// node_modules/@ethersproject/abstract-provider/lib.esm/_version.js
var version10 = "abstract-provider/5.5.1";

// node_modules/@ethersproject/abstract-provider/lib.esm/index.js
"use strict";
var __awaiter3 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var logger15 = new Logger(version10);
var ForkEvent = class extends Description {
  static isForkEvent(value) {
    return !!(value && value._isForkEvent);
  }
};
var Provider = class {
  constructor() {
    logger15.checkAbstract(new.target, Provider);
    defineReadOnly(this, "_isProvider", true);
  }
  getFeeData() {
    return __awaiter3(this, void 0, void 0, function* () {
      const { block, gasPrice } = yield resolveProperties({
        block: this.getBlock("latest"),
        gasPrice: this.getGasPrice().catch((error) => {
          return null;
        })
      });
      let maxFeePerGas = null, maxPriorityFeePerGas = null;
      if (block && block.baseFeePerGas) {
        maxPriorityFeePerGas = BigNumber.from("2500000000");
        maxFeePerGas = block.baseFeePerGas.mul(2).add(maxPriorityFeePerGas);
      }
      return { maxFeePerGas, maxPriorityFeePerGas, gasPrice };
    });
  }
  addListener(eventName, listener) {
    return this.on(eventName, listener);
  }
  removeListener(eventName, listener) {
    return this.off(eventName, listener);
  }
  static isProvider(value) {
    return !!(value && value._isProvider);
  }
};

// node_modules/@ethersproject/abstract-signer/lib.esm/_version.js
var version11 = "abstract-signer/5.5.0";

// node_modules/@ethersproject/abstract-signer/lib.esm/index.js
"use strict";
var __awaiter4 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var logger16 = new Logger(version11);
var allowedTransactionKeys = [
  "accessList",
  "chainId",
  "customData",
  "data",
  "from",
  "gasLimit",
  "gasPrice",
  "maxFeePerGas",
  "maxPriorityFeePerGas",
  "nonce",
  "to",
  "type",
  "value"
];
var forwardErrors = [
  Logger.errors.INSUFFICIENT_FUNDS,
  Logger.errors.NONCE_EXPIRED,
  Logger.errors.REPLACEMENT_UNDERPRICED
];
var Signer = class {
  constructor() {
    logger16.checkAbstract(new.target, Signer);
    defineReadOnly(this, "_isSigner", true);
  }
  getBalance(blockTag) {
    return __awaiter4(this, void 0, void 0, function* () {
      this._checkProvider("getBalance");
      return yield this.provider.getBalance(this.getAddress(), blockTag);
    });
  }
  getTransactionCount(blockTag) {
    return __awaiter4(this, void 0, void 0, function* () {
      this._checkProvider("getTransactionCount");
      return yield this.provider.getTransactionCount(this.getAddress(), blockTag);
    });
  }
  estimateGas(transaction) {
    return __awaiter4(this, void 0, void 0, function* () {
      this._checkProvider("estimateGas");
      const tx = yield resolveProperties(this.checkTransaction(transaction));
      return yield this.provider.estimateGas(tx);
    });
  }
  call(transaction, blockTag) {
    return __awaiter4(this, void 0, void 0, function* () {
      this._checkProvider("call");
      const tx = yield resolveProperties(this.checkTransaction(transaction));
      return yield this.provider.call(tx, blockTag);
    });
  }
  sendTransaction(transaction) {
    return __awaiter4(this, void 0, void 0, function* () {
      this._checkProvider("sendTransaction");
      const tx = yield this.populateTransaction(transaction);
      const signedTx = yield this.signTransaction(tx);
      return yield this.provider.sendTransaction(signedTx);
    });
  }
  getChainId() {
    return __awaiter4(this, void 0, void 0, function* () {
      this._checkProvider("getChainId");
      const network = yield this.provider.getNetwork();
      return network.chainId;
    });
  }
  getGasPrice() {
    return __awaiter4(this, void 0, void 0, function* () {
      this._checkProvider("getGasPrice");
      return yield this.provider.getGasPrice();
    });
  }
  getFeeData() {
    return __awaiter4(this, void 0, void 0, function* () {
      this._checkProvider("getFeeData");
      return yield this.provider.getFeeData();
    });
  }
  resolveName(name2) {
    return __awaiter4(this, void 0, void 0, function* () {
      this._checkProvider("resolveName");
      return yield this.provider.resolveName(name2);
    });
  }
  checkTransaction(transaction) {
    for (const key2 in transaction) {
      if (allowedTransactionKeys.indexOf(key2) === -1) {
        logger16.throwArgumentError("invalid transaction key: " + key2, "transaction", transaction);
      }
    }
    const tx = shallowCopy(transaction);
    if (tx.from == null) {
      tx.from = this.getAddress();
    } else {
      tx.from = Promise.all([
        Promise.resolve(tx.from),
        this.getAddress()
      ]).then((result) => {
        if (result[0].toLowerCase() !== result[1].toLowerCase()) {
          logger16.throwArgumentError("from address mismatch", "transaction", transaction);
        }
        return result[0];
      });
    }
    return tx;
  }
  populateTransaction(transaction) {
    return __awaiter4(this, void 0, void 0, function* () {
      const tx = yield resolveProperties(this.checkTransaction(transaction));
      if (tx.to != null) {
        tx.to = Promise.resolve(tx.to).then((to) => __awaiter4(this, void 0, void 0, function* () {
          if (to == null) {
            return null;
          }
          const address = yield this.resolveName(to);
          if (address == null) {
            logger16.throwArgumentError("provided ENS name resolves to null", "tx.to", to);
          }
          return address;
        }));
        tx.to.catch((error) => {
        });
      }
      const hasEip1559 = tx.maxFeePerGas != null || tx.maxPriorityFeePerGas != null;
      if (tx.gasPrice != null && (tx.type === 2 || hasEip1559)) {
        logger16.throwArgumentError("eip-1559 transaction do not support gasPrice", "transaction", transaction);
      } else if ((tx.type === 0 || tx.type === 1) && hasEip1559) {
        logger16.throwArgumentError("pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas", "transaction", transaction);
      }
      if ((tx.type === 2 || tx.type == null) && (tx.maxFeePerGas != null && tx.maxPriorityFeePerGas != null)) {
        tx.type = 2;
      } else if (tx.type === 0 || tx.type === 1) {
        if (tx.gasPrice == null) {
          tx.gasPrice = this.getGasPrice();
        }
      } else {
        const feeData = yield this.getFeeData();
        if (tx.type == null) {
          if (feeData.maxFeePerGas != null && feeData.maxPriorityFeePerGas != null) {
            tx.type = 2;
            if (tx.gasPrice != null) {
              const gasPrice = tx.gasPrice;
              delete tx.gasPrice;
              tx.maxFeePerGas = gasPrice;
              tx.maxPriorityFeePerGas = gasPrice;
            } else {
              if (tx.maxFeePerGas == null) {
                tx.maxFeePerGas = feeData.maxFeePerGas;
              }
              if (tx.maxPriorityFeePerGas == null) {
                tx.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
              }
            }
          } else if (feeData.gasPrice != null) {
            if (hasEip1559) {
              logger16.throwError("network does not support EIP-1559", Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "populateTransaction"
              });
            }
            if (tx.gasPrice == null) {
              tx.gasPrice = feeData.gasPrice;
            }
            tx.type = 0;
          } else {
            logger16.throwError("failed to get consistent fee data", Logger.errors.UNSUPPORTED_OPERATION, {
              operation: "signer.getFeeData"
            });
          }
        } else if (tx.type === 2) {
          if (tx.maxFeePerGas == null) {
            tx.maxFeePerGas = feeData.maxFeePerGas;
          }
          if (tx.maxPriorityFeePerGas == null) {
            tx.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
          }
        }
      }
      if (tx.nonce == null) {
        tx.nonce = this.getTransactionCount("pending");
      }
      if (tx.gasLimit == null) {
        tx.gasLimit = this.estimateGas(tx).catch((error) => {
          if (forwardErrors.indexOf(error.code) >= 0) {
            throw error;
          }
          return logger16.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", Logger.errors.UNPREDICTABLE_GAS_LIMIT, {
            error,
            tx
          });
        });
      }
      if (tx.chainId == null) {
        tx.chainId = this.getChainId();
      } else {
        tx.chainId = Promise.all([
          Promise.resolve(tx.chainId),
          this.getChainId()
        ]).then((results) => {
          if (results[1] !== 0 && results[0] !== results[1]) {
            logger16.throwArgumentError("chainId address mismatch", "transaction", transaction);
          }
          return results[0];
        });
      }
      return yield resolveProperties(tx);
    });
  }
  _checkProvider(operation) {
    if (!this.provider) {
      logger16.throwError("missing provider", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: operation || "_checkProvider"
      });
    }
  }
  static isSigner(value) {
    return !!(value && value._isSigner);
  }
};
var VoidSigner = class extends Signer {
  constructor(address, provider) {
    logger16.checkNew(new.target, VoidSigner);
    super();
    defineReadOnly(this, "address", address);
    defineReadOnly(this, "provider", provider || null);
  }
  getAddress() {
    return Promise.resolve(this.address);
  }
  _fail(message, operation) {
    return Promise.resolve().then(() => {
      logger16.throwError(message, Logger.errors.UNSUPPORTED_OPERATION, { operation });
    });
  }
  signMessage(message) {
    return this._fail("VoidSigner cannot sign messages", "signMessage");
  }
  signTransaction(transaction) {
    return this._fail("VoidSigner cannot sign transactions", "signTransaction");
  }
  _signTypedData(domain, types, value) {
    return this._fail("VoidSigner cannot sign typed data", "signTypedData");
  }
  connect(provider) {
    return new VoidSigner(this.address, provider);
  }
};

// node_modules/@ethersproject/signing-key/lib.esm/elliptic.js
var import_bn2 = __toModule(require_bn());
var import_hash2 = __toModule(require_hash());
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function createCommonjsModule(fn, basedir, module2) {
  return module2 = {
    path: basedir,
    exports: {},
    require: function(path, base2) {
      return commonjsRequire(path, base2 === void 0 || base2 === null ? module2.path : base2);
    }
  }, fn(module2, module2.exports), module2.exports;
}
function commonjsRequire() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var minimalisticAssert = assert;
function assert(val, msg) {
  if (!val)
    throw new Error(msg || "Assertion failed");
}
assert.equal = function assertEqual(l3, r3, msg) {
  if (l3 != r3)
    throw new Error(msg || "Assertion failed: " + l3 + " != " + r3);
};
var utils_1 = createCommonjsModule(function(module2, exports2) {
  "use strict";
  var utils = exports2;
  function toArray(msg, enc) {
    if (Array.isArray(msg))
      return msg.slice();
    if (!msg)
      return [];
    var res = [];
    if (typeof msg !== "string") {
      for (var i3 = 0; i3 < msg.length; i3++)
        res[i3] = msg[i3] | 0;
      return res;
    }
    if (enc === "hex") {
      msg = msg.replace(/[^a-z0-9]+/ig, "");
      if (msg.length % 2 !== 0)
        msg = "0" + msg;
      for (var i3 = 0; i3 < msg.length; i3 += 2)
        res.push(parseInt(msg[i3] + msg[i3 + 1], 16));
    } else {
      for (var i3 = 0; i3 < msg.length; i3++) {
        var c3 = msg.charCodeAt(i3);
        var hi = c3 >> 8;
        var lo = c3 & 255;
        if (hi)
          res.push(hi, lo);
        else
          res.push(lo);
      }
    }
    return res;
  }
  utils.toArray = toArray;
  function zero2(word) {
    if (word.length === 1)
      return "0" + word;
    else
      return word;
  }
  utils.zero2 = zero2;
  function toHex2(msg) {
    var res = "";
    for (var i3 = 0; i3 < msg.length; i3++)
      res += zero2(msg[i3].toString(16));
    return res;
  }
  utils.toHex = toHex2;
  utils.encode = function encode4(arr, enc) {
    if (enc === "hex")
      return toHex2(arr);
    else
      return arr;
  };
});
var utils_1$1 = createCommonjsModule(function(module2, exports2) {
  "use strict";
  var utils = exports2;
  utils.assert = minimalisticAssert;
  utils.toArray = utils_1.toArray;
  utils.zero2 = utils_1.zero2;
  utils.toHex = utils_1.toHex;
  utils.encode = utils_1.encode;
  function getNAF2(num, w3, bits) {
    var naf = new Array(Math.max(num.bitLength(), bits) + 1);
    naf.fill(0);
    var ws = 1 << w3 + 1;
    var k3 = num.clone();
    for (var i3 = 0; i3 < naf.length; i3++) {
      var z2;
      var mod = k3.andln(ws - 1);
      if (k3.isOdd()) {
        if (mod > (ws >> 1) - 1)
          z2 = (ws >> 1) - mod;
        else
          z2 = mod;
        k3.isubn(z2);
      } else {
        z2 = 0;
      }
      naf[i3] = z2;
      k3.iushrn(1);
    }
    return naf;
  }
  utils.getNAF = getNAF2;
  function getJSF2(k1, k22) {
    var jsf = [
      [],
      []
    ];
    k1 = k1.clone();
    k22 = k22.clone();
    var d1 = 0;
    var d2 = 0;
    var m8;
    while (k1.cmpn(-d1) > 0 || k22.cmpn(-d2) > 0) {
      var m14 = k1.andln(3) + d1 & 3;
      var m24 = k22.andln(3) + d2 & 3;
      if (m14 === 3)
        m14 = -1;
      if (m24 === 3)
        m24 = -1;
      var u1;
      if ((m14 & 1) === 0) {
        u1 = 0;
      } else {
        m8 = k1.andln(7) + d1 & 7;
        if ((m8 === 3 || m8 === 5) && m24 === 2)
          u1 = -m14;
        else
          u1 = m14;
      }
      jsf[0].push(u1);
      var u22;
      if ((m24 & 1) === 0) {
        u22 = 0;
      } else {
        m8 = k22.andln(7) + d2 & 7;
        if ((m8 === 3 || m8 === 5) && m14 === 2)
          u22 = -m24;
        else
          u22 = m24;
      }
      jsf[1].push(u22);
      if (2 * d1 === u1 + 1)
        d1 = 1 - d1;
      if (2 * d2 === u22 + 1)
        d2 = 1 - d2;
      k1.iushrn(1);
      k22.iushrn(1);
    }
    return jsf;
  }
  utils.getJSF = getJSF2;
  function cachedProperty(obj2, name2, computer) {
    var key2 = "_" + name2;
    obj2.prototype[name2] = function cachedProperty2() {
      return this[key2] !== void 0 ? this[key2] : this[key2] = computer.call(this);
    };
  }
  utils.cachedProperty = cachedProperty;
  function parseBytes(bytes) {
    return typeof bytes === "string" ? utils.toArray(bytes, "hex") : bytes;
  }
  utils.parseBytes = parseBytes;
  function intFromLE(bytes) {
    return new import_bn2.default(bytes, "hex", "le");
  }
  utils.intFromLE = intFromLE;
});
var getNAF = utils_1$1.getNAF;
var getJSF = utils_1$1.getJSF;
var assert$1 = utils_1$1.assert;
function BaseCurve(type, conf) {
  this.type = type;
  this.p = new import_bn2.default(conf.p, 16);
  this.red = conf.prime ? import_bn2.default.red(conf.prime) : import_bn2.default.mont(this.p);
  this.zero = new import_bn2.default(0).toRed(this.red);
  this.one = new import_bn2.default(1).toRed(this.red);
  this.two = new import_bn2.default(2).toRed(this.red);
  this.n = conf.n && new import_bn2.default(conf.n, 16);
  this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);
  this._wnafT1 = new Array(4);
  this._wnafT2 = new Array(4);
  this._wnafT3 = new Array(4);
  this._wnafT4 = new Array(4);
  this._bitLength = this.n ? this.n.bitLength() : 0;
  var adjustCount = this.n && this.p.div(this.n);
  if (!adjustCount || adjustCount.cmpn(100) > 0) {
    this.redN = null;
  } else {
    this._maxwellTrick = true;
    this.redN = this.n.toRed(this.red);
  }
}
var base = BaseCurve;
BaseCurve.prototype.point = function point() {
  throw new Error("Not implemented");
};
BaseCurve.prototype.validate = function validate() {
  throw new Error("Not implemented");
};
BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p2, k3) {
  assert$1(p2.precomputed);
  var doubles = p2._getDoubles();
  var naf = getNAF(k3, 1, this._bitLength);
  var I2 = (1 << doubles.step + 1) - (doubles.step % 2 === 0 ? 2 : 1);
  I2 /= 3;
  var repr = [];
  var j3;
  var nafW;
  for (j3 = 0; j3 < naf.length; j3 += doubles.step) {
    nafW = 0;
    for (var l3 = j3 + doubles.step - 1; l3 >= j3; l3--)
      nafW = (nafW << 1) + naf[l3];
    repr.push(nafW);
  }
  var a3 = this.jpoint(null, null, null);
  var b3 = this.jpoint(null, null, null);
  for (var i3 = I2; i3 > 0; i3--) {
    for (j3 = 0; j3 < repr.length; j3++) {
      nafW = repr[j3];
      if (nafW === i3)
        b3 = b3.mixedAdd(doubles.points[j3]);
      else if (nafW === -i3)
        b3 = b3.mixedAdd(doubles.points[j3].neg());
    }
    a3 = a3.add(b3);
  }
  return a3.toP();
};
BaseCurve.prototype._wnafMul = function _wnafMul(p2, k3) {
  var w3 = 4;
  var nafPoints = p2._getNAFPoints(w3);
  w3 = nafPoints.wnd;
  var wnd = nafPoints.points;
  var naf = getNAF(k3, w3, this._bitLength);
  var acc = this.jpoint(null, null, null);
  for (var i3 = naf.length - 1; i3 >= 0; i3--) {
    for (var l3 = 0; i3 >= 0 && naf[i3] === 0; i3--)
      l3++;
    if (i3 >= 0)
      l3++;
    acc = acc.dblp(l3);
    if (i3 < 0)
      break;
    var z2 = naf[i3];
    assert$1(z2 !== 0);
    if (p2.type === "affine") {
      if (z2 > 0)
        acc = acc.mixedAdd(wnd[z2 - 1 >> 1]);
      else
        acc = acc.mixedAdd(wnd[-z2 - 1 >> 1].neg());
    } else {
      if (z2 > 0)
        acc = acc.add(wnd[z2 - 1 >> 1]);
      else
        acc = acc.add(wnd[-z2 - 1 >> 1].neg());
    }
  }
  return p2.type === "affine" ? acc.toP() : acc;
};
BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW, points, coeffs, len, jacobianResult) {
  var wndWidth = this._wnafT1;
  var wnd = this._wnafT2;
  var naf = this._wnafT3;
  var max = 0;
  var i3;
  var j3;
  var p2;
  for (i3 = 0; i3 < len; i3++) {
    p2 = points[i3];
    var nafPoints = p2._getNAFPoints(defW);
    wndWidth[i3] = nafPoints.wnd;
    wnd[i3] = nafPoints.points;
  }
  for (i3 = len - 1; i3 >= 1; i3 -= 2) {
    var a3 = i3 - 1;
    var b3 = i3;
    if (wndWidth[a3] !== 1 || wndWidth[b3] !== 1) {
      naf[a3] = getNAF(coeffs[a3], wndWidth[a3], this._bitLength);
      naf[b3] = getNAF(coeffs[b3], wndWidth[b3], this._bitLength);
      max = Math.max(naf[a3].length, max);
      max = Math.max(naf[b3].length, max);
      continue;
    }
    var comb = [
      points[a3],
      null,
      null,
      points[b3]
    ];
    if (points[a3].y.cmp(points[b3].y) === 0) {
      comb[1] = points[a3].add(points[b3]);
      comb[2] = points[a3].toJ().mixedAdd(points[b3].neg());
    } else if (points[a3].y.cmp(points[b3].y.redNeg()) === 0) {
      comb[1] = points[a3].toJ().mixedAdd(points[b3]);
      comb[2] = points[a3].add(points[b3].neg());
    } else {
      comb[1] = points[a3].toJ().mixedAdd(points[b3]);
      comb[2] = points[a3].toJ().mixedAdd(points[b3].neg());
    }
    var index = [
      -3,
      -1,
      -5,
      -7,
      0,
      7,
      5,
      1,
      3
    ];
    var jsf = getJSF(coeffs[a3], coeffs[b3]);
    max = Math.max(jsf[0].length, max);
    naf[a3] = new Array(max);
    naf[b3] = new Array(max);
    for (j3 = 0; j3 < max; j3++) {
      var ja = jsf[0][j3] | 0;
      var jb = jsf[1][j3] | 0;
      naf[a3][j3] = index[(ja + 1) * 3 + (jb + 1)];
      naf[b3][j3] = 0;
      wnd[a3] = comb;
    }
  }
  var acc = this.jpoint(null, null, null);
  var tmp = this._wnafT4;
  for (i3 = max; i3 >= 0; i3--) {
    var k3 = 0;
    while (i3 >= 0) {
      var zero = true;
      for (j3 = 0; j3 < len; j3++) {
        tmp[j3] = naf[j3][i3] | 0;
        if (tmp[j3] !== 0)
          zero = false;
      }
      if (!zero)
        break;
      k3++;
      i3--;
    }
    if (i3 >= 0)
      k3++;
    acc = acc.dblp(k3);
    if (i3 < 0)
      break;
    for (j3 = 0; j3 < len; j3++) {
      var z2 = tmp[j3];
      p2;
      if (z2 === 0)
        continue;
      else if (z2 > 0)
        p2 = wnd[j3][z2 - 1 >> 1];
      else if (z2 < 0)
        p2 = wnd[j3][-z2 - 1 >> 1].neg();
      if (p2.type === "affine")
        acc = acc.mixedAdd(p2);
      else
        acc = acc.add(p2);
    }
  }
  for (i3 = 0; i3 < len; i3++)
    wnd[i3] = null;
  if (jacobianResult)
    return acc;
  else
    return acc.toP();
};
function BasePoint(curve, type) {
  this.curve = curve;
  this.type = type;
  this.precomputed = null;
}
BaseCurve.BasePoint = BasePoint;
BasePoint.prototype.eq = function eq() {
  throw new Error("Not implemented");
};
BasePoint.prototype.validate = function validate2() {
  return this.curve.validate(this);
};
BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
  bytes = utils_1$1.toArray(bytes, enc);
  var len = this.p.byteLength();
  if ((bytes[0] === 4 || bytes[0] === 6 || bytes[0] === 7) && bytes.length - 1 === 2 * len) {
    if (bytes[0] === 6)
      assert$1(bytes[bytes.length - 1] % 2 === 0);
    else if (bytes[0] === 7)
      assert$1(bytes[bytes.length - 1] % 2 === 1);
    var res = this.point(bytes.slice(1, 1 + len), bytes.slice(1 + len, 1 + 2 * len));
    return res;
  } else if ((bytes[0] === 2 || bytes[0] === 3) && bytes.length - 1 === len) {
    return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 3);
  }
  throw new Error("Unknown point format");
};
BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
  return this.encode(enc, true);
};
BasePoint.prototype._encode = function _encode2(compact) {
  var len = this.curve.p.byteLength();
  var x3 = this.getX().toArray("be", len);
  if (compact)
    return [this.getY().isEven() ? 2 : 3].concat(x3);
  return [4].concat(x3, this.getY().toArray("be", len));
};
BasePoint.prototype.encode = function encode2(enc, compact) {
  return utils_1$1.encode(this._encode(compact), enc);
};
BasePoint.prototype.precompute = function precompute(power) {
  if (this.precomputed)
    return this;
  var precomputed = {
    doubles: null,
    naf: null,
    beta: null
  };
  precomputed.naf = this._getNAFPoints(8);
  precomputed.doubles = this._getDoubles(4, power);
  precomputed.beta = this._getBeta();
  this.precomputed = precomputed;
  return this;
};
BasePoint.prototype._hasDoubles = function _hasDoubles(k3) {
  if (!this.precomputed)
    return false;
  var doubles = this.precomputed.doubles;
  if (!doubles)
    return false;
  return doubles.points.length >= Math.ceil((k3.bitLength() + 1) / doubles.step);
};
BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;
  var doubles = [this];
  var acc = this;
  for (var i3 = 0; i3 < power; i3 += step) {
    for (var j3 = 0; j3 < step; j3++)
      acc = acc.dbl();
    doubles.push(acc);
  }
  return {
    step,
    points: doubles
  };
};
BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;
  var res = [this];
  var max = (1 << wnd) - 1;
  var dbl3 = max === 1 ? null : this.dbl();
  for (var i3 = 1; i3 < max; i3++)
    res[i3] = res[i3 - 1].add(dbl3);
  return {
    wnd,
    points: res
  };
};
BasePoint.prototype._getBeta = function _getBeta() {
  return null;
};
BasePoint.prototype.dblp = function dblp(k3) {
  var r3 = this;
  for (var i3 = 0; i3 < k3; i3++)
    r3 = r3.dbl();
  return r3;
};
var inherits_browser = createCommonjsModule(function(module2) {
  if (typeof Object.create === "function") {
    module2.exports = function inherits2(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    module2.exports = function inherits2(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }
});
var assert$2 = utils_1$1.assert;
function ShortCurve(conf) {
  base.call(this, "short", conf);
  this.a = new import_bn2.default(conf.a, 16).toRed(this.red);
  this.b = new import_bn2.default(conf.b, 16).toRed(this.red);
  this.tinv = this.two.redInvm();
  this.zeroA = this.a.fromRed().cmpn(0) === 0;
  this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;
  this.endo = this._getEndomorphism(conf);
  this._endoWnafT1 = new Array(4);
  this._endoWnafT2 = new Array(4);
}
inherits_browser(ShortCurve, base);
var short_1 = ShortCurve;
ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
  if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
    return;
  var beta;
  var lambda;
  if (conf.beta) {
    beta = new import_bn2.default(conf.beta, 16).toRed(this.red);
  } else {
    var betas = this._getEndoRoots(this.p);
    beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
    beta = beta.toRed(this.red);
  }
  if (conf.lambda) {
    lambda = new import_bn2.default(conf.lambda, 16);
  } else {
    var lambdas = this._getEndoRoots(this.n);
    if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
      lambda = lambdas[0];
    } else {
      lambda = lambdas[1];
      assert$2(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
    }
  }
  var basis;
  if (conf.basis) {
    basis = conf.basis.map(function(vec) {
      return {
        a: new import_bn2.default(vec.a, 16),
        b: new import_bn2.default(vec.b, 16)
      };
    });
  } else {
    basis = this._getEndoBasis(lambda);
  }
  return {
    beta,
    lambda,
    basis
  };
};
ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
  var red = num === this.p ? this.red : import_bn2.default.mont(num);
  var tinv = new import_bn2.default(2).toRed(red).redInvm();
  var ntinv = tinv.redNeg();
  var s2 = new import_bn2.default(3).toRed(red).redNeg().redSqrt().redMul(tinv);
  var l1 = ntinv.redAdd(s2).fromRed();
  var l22 = ntinv.redSub(s2).fromRed();
  return [l1, l22];
};
ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
  var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));
  var u3 = lambda;
  var v3 = this.n.clone();
  var x1 = new import_bn2.default(1);
  var y1 = new import_bn2.default(0);
  var x22 = new import_bn2.default(0);
  var y22 = new import_bn2.default(1);
  var a0;
  var b0;
  var a1;
  var b1;
  var a22;
  var b22;
  var prevR;
  var i3 = 0;
  var r3;
  var x3;
  while (u3.cmpn(0) !== 0) {
    var q = v3.div(u3);
    r3 = v3.sub(q.mul(u3));
    x3 = x22.sub(q.mul(x1));
    var y3 = y22.sub(q.mul(y1));
    if (!a1 && r3.cmp(aprxSqrt) < 0) {
      a0 = prevR.neg();
      b0 = x1;
      a1 = r3.neg();
      b1 = x3;
    } else if (a1 && ++i3 === 2) {
      break;
    }
    prevR = r3;
    v3 = u3;
    u3 = r3;
    x22 = x1;
    x1 = x3;
    y22 = y1;
    y1 = y3;
  }
  a22 = r3.neg();
  b22 = x3;
  var len1 = a1.sqr().add(b1.sqr());
  var len2 = a22.sqr().add(b22.sqr());
  if (len2.cmp(len1) >= 0) {
    a22 = a0;
    b22 = b0;
  }
  if (a1.negative) {
    a1 = a1.neg();
    b1 = b1.neg();
  }
  if (a22.negative) {
    a22 = a22.neg();
    b22 = b22.neg();
  }
  return [
    { a: a1, b: b1 },
    { a: a22, b: b22 }
  ];
};
ShortCurve.prototype._endoSplit = function _endoSplit(k3) {
  var basis = this.endo.basis;
  var v1 = basis[0];
  var v22 = basis[1];
  var c1 = v22.b.mul(k3).divRound(this.n);
  var c22 = v1.b.neg().mul(k3).divRound(this.n);
  var p1 = c1.mul(v1.a);
  var p2 = c22.mul(v22.a);
  var q1 = c1.mul(v1.b);
  var q2 = c22.mul(v22.b);
  var k1 = k3.sub(p1).sub(p2);
  var k22 = q1.add(q2).neg();
  return { k1, k2: k22 };
};
ShortCurve.prototype.pointFromX = function pointFromX(x3, odd) {
  x3 = new import_bn2.default(x3, 16);
  if (!x3.red)
    x3 = x3.toRed(this.red);
  var y22 = x3.redSqr().redMul(x3).redIAdd(x3.redMul(this.a)).redIAdd(this.b);
  var y3 = y22.redSqrt();
  if (y3.redSqr().redSub(y22).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  var isOdd = y3.fromRed().isOdd();
  if (odd && !isOdd || !odd && isOdd)
    y3 = y3.redNeg();
  return this.point(x3, y3);
};
ShortCurve.prototype.validate = function validate3(point3) {
  if (point3.inf)
    return true;
  var x3 = point3.x;
  var y3 = point3.y;
  var ax = this.a.redMul(x3);
  var rhs = x3.redSqr().redMul(x3).redIAdd(ax).redIAdd(this.b);
  return y3.redSqr().redISub(rhs).cmpn(0) === 0;
};
ShortCurve.prototype._endoWnafMulAdd = function _endoWnafMulAdd(points, coeffs, jacobianResult) {
  var npoints = this._endoWnafT1;
  var ncoeffs = this._endoWnafT2;
  for (var i3 = 0; i3 < points.length; i3++) {
    var split = this._endoSplit(coeffs[i3]);
    var p2 = points[i3];
    var beta = p2._getBeta();
    if (split.k1.negative) {
      split.k1.ineg();
      p2 = p2.neg(true);
    }
    if (split.k2.negative) {
      split.k2.ineg();
      beta = beta.neg(true);
    }
    npoints[i3 * 2] = p2;
    npoints[i3 * 2 + 1] = beta;
    ncoeffs[i3 * 2] = split.k1;
    ncoeffs[i3 * 2 + 1] = split.k2;
  }
  var res = this._wnafMulAdd(1, npoints, ncoeffs, i3 * 2, jacobianResult);
  for (var j3 = 0; j3 < i3 * 2; j3++) {
    npoints[j3] = null;
    ncoeffs[j3] = null;
  }
  return res;
};
function Point(curve, x3, y3, isRed) {
  base.BasePoint.call(this, curve, "affine");
  if (x3 === null && y3 === null) {
    this.x = null;
    this.y = null;
    this.inf = true;
  } else {
    this.x = new import_bn2.default(x3, 16);
    this.y = new import_bn2.default(y3, 16);
    if (isRed) {
      this.x.forceRed(this.curve.red);
      this.y.forceRed(this.curve.red);
    }
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    this.inf = false;
  }
}
inherits_browser(Point, base.BasePoint);
ShortCurve.prototype.point = function point2(x3, y3, isRed) {
  return new Point(this, x3, y3, isRed);
};
ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj2, red) {
  return Point.fromJSON(this, obj2, red);
};
Point.prototype._getBeta = function _getBeta2() {
  if (!this.curve.endo)
    return;
  var pre = this.precomputed;
  if (pre && pre.beta)
    return pre.beta;
  var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
  if (pre) {
    var curve = this.curve;
    var endoMul = function(p2) {
      return curve.point(p2.x.redMul(curve.endo.beta), p2.y);
    };
    pre.beta = beta;
    beta.precomputed = {
      beta: null,
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(endoMul)
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(endoMul)
      }
    };
  }
  return beta;
};
Point.prototype.toJSON = function toJSON() {
  if (!this.precomputed)
    return [this.x, this.y];
  return [this.x, this.y, this.precomputed && {
    doubles: this.precomputed.doubles && {
      step: this.precomputed.doubles.step,
      points: this.precomputed.doubles.points.slice(1)
    },
    naf: this.precomputed.naf && {
      wnd: this.precomputed.naf.wnd,
      points: this.precomputed.naf.points.slice(1)
    }
  }];
};
Point.fromJSON = function fromJSON(curve, obj2, red) {
  if (typeof obj2 === "string")
    obj2 = JSON.parse(obj2);
  var res = curve.point(obj2[0], obj2[1], red);
  if (!obj2[2])
    return res;
  function obj2point(obj3) {
    return curve.point(obj3[0], obj3[1], red);
  }
  var pre = obj2[2];
  res.precomputed = {
    beta: null,
    doubles: pre.doubles && {
      step: pre.doubles.step,
      points: [res].concat(pre.doubles.points.map(obj2point))
    },
    naf: pre.naf && {
      wnd: pre.naf.wnd,
      points: [res].concat(pre.naf.points.map(obj2point))
    }
  };
  return res;
};
Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return "<EC Point Infinity>";
  return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
};
Point.prototype.isInfinity = function isInfinity() {
  return this.inf;
};
Point.prototype.add = function add(p2) {
  if (this.inf)
    return p2;
  if (p2.inf)
    return this;
  if (this.eq(p2))
    return this.dbl();
  if (this.neg().eq(p2))
    return this.curve.point(null, null);
  if (this.x.cmp(p2.x) === 0)
    return this.curve.point(null, null);
  var c3 = this.y.redSub(p2.y);
  if (c3.cmpn(0) !== 0)
    c3 = c3.redMul(this.x.redSub(p2.x).redInvm());
  var nx = c3.redSqr().redISub(this.x).redISub(p2.x);
  var ny = c3.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};
Point.prototype.dbl = function dbl() {
  if (this.inf)
    return this;
  var ys1 = this.y.redAdd(this.y);
  if (ys1.cmpn(0) === 0)
    return this.curve.point(null, null);
  var a3 = this.curve.a;
  var x22 = this.x.redSqr();
  var dyinv = ys1.redInvm();
  var c3 = x22.redAdd(x22).redIAdd(x22).redIAdd(a3).redMul(dyinv);
  var nx = c3.redSqr().redISub(this.x.redAdd(this.x));
  var ny = c3.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};
Point.prototype.getX = function getX() {
  return this.x.fromRed();
};
Point.prototype.getY = function getY() {
  return this.y.fromRed();
};
Point.prototype.mul = function mul(k3) {
  k3 = new import_bn2.default(k3, 16);
  if (this.isInfinity())
    return this;
  else if (this._hasDoubles(k3))
    return this.curve._fixedNafMul(this, k3);
  else if (this.curve.endo)
    return this.curve._endoWnafMulAdd([this], [k3]);
  else
    return this.curve._wnafMul(this, k3);
};
Point.prototype.mulAdd = function mulAdd(k1, p2, k22) {
  var points = [this, p2];
  var coeffs = [k1, k22];
  if (this.curve.endo)
    return this.curve._endoWnafMulAdd(points, coeffs);
  else
    return this.curve._wnafMulAdd(1, points, coeffs, 2);
};
Point.prototype.jmulAdd = function jmulAdd(k1, p2, k22) {
  var points = [this, p2];
  var coeffs = [k1, k22];
  if (this.curve.endo)
    return this.curve._endoWnafMulAdd(points, coeffs, true);
  else
    return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
};
Point.prototype.eq = function eq2(p2) {
  return this === p2 || this.inf === p2.inf && (this.inf || this.x.cmp(p2.x) === 0 && this.y.cmp(p2.y) === 0);
};
Point.prototype.neg = function neg(_precompute) {
  if (this.inf)
    return this;
  var res = this.curve.point(this.x, this.y.redNeg());
  if (_precompute && this.precomputed) {
    var pre = this.precomputed;
    var negate = function(p2) {
      return p2.neg();
    };
    res.precomputed = {
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(negate)
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(negate)
      }
    };
  }
  return res;
};
Point.prototype.toJ = function toJ() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);
  var res = this.curve.jpoint(this.x, this.y, this.curve.one);
  return res;
};
function JPoint(curve, x3, y3, z2) {
  base.BasePoint.call(this, curve, "jacobian");
  if (x3 === null && y3 === null && z2 === null) {
    this.x = this.curve.one;
    this.y = this.curve.one;
    this.z = new import_bn2.default(0);
  } else {
    this.x = new import_bn2.default(x3, 16);
    this.y = new import_bn2.default(y3, 16);
    this.z = new import_bn2.default(z2, 16);
  }
  if (!this.x.red)
    this.x = this.x.toRed(this.curve.red);
  if (!this.y.red)
    this.y = this.y.toRed(this.curve.red);
  if (!this.z.red)
    this.z = this.z.toRed(this.curve.red);
  this.zOne = this.z === this.curve.one;
}
inherits_browser(JPoint, base.BasePoint);
ShortCurve.prototype.jpoint = function jpoint(x3, y3, z2) {
  return new JPoint(this, x3, y3, z2);
};
JPoint.prototype.toP = function toP() {
  if (this.isInfinity())
    return this.curve.point(null, null);
  var zinv = this.z.redInvm();
  var zinv2 = zinv.redSqr();
  var ax = this.x.redMul(zinv2);
  var ay = this.y.redMul(zinv2).redMul(zinv);
  return this.curve.point(ax, ay);
};
JPoint.prototype.neg = function neg2() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};
JPoint.prototype.add = function add2(p2) {
  if (this.isInfinity())
    return p2;
  if (p2.isInfinity())
    return this;
  var pz2 = p2.z.redSqr();
  var z2 = this.z.redSqr();
  var u1 = this.x.redMul(pz2);
  var u22 = p2.x.redMul(z2);
  var s1 = this.y.redMul(pz2.redMul(p2.z));
  var s2 = p2.y.redMul(z2.redMul(this.z));
  var h2 = u1.redSub(u22);
  var r3 = s1.redSub(s2);
  if (h2.cmpn(0) === 0) {
    if (r3.cmpn(0) !== 0)
      return this.curve.jpoint(null, null, null);
    else
      return this.dbl();
  }
  var h22 = h2.redSqr();
  var h3 = h22.redMul(h2);
  var v3 = u1.redMul(h22);
  var nx = r3.redSqr().redIAdd(h3).redISub(v3).redISub(v3);
  var ny = r3.redMul(v3.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(p2.z).redMul(h2);
  return this.curve.jpoint(nx, ny, nz);
};
JPoint.prototype.mixedAdd = function mixedAdd(p2) {
  if (this.isInfinity())
    return p2.toJ();
  if (p2.isInfinity())
    return this;
  var z2 = this.z.redSqr();
  var u1 = this.x;
  var u22 = p2.x.redMul(z2);
  var s1 = this.y;
  var s2 = p2.y.redMul(z2).redMul(this.z);
  var h2 = u1.redSub(u22);
  var r3 = s1.redSub(s2);
  if (h2.cmpn(0) === 0) {
    if (r3.cmpn(0) !== 0)
      return this.curve.jpoint(null, null, null);
    else
      return this.dbl();
  }
  var h22 = h2.redSqr();
  var h3 = h22.redMul(h2);
  var v3 = u1.redMul(h22);
  var nx = r3.redSqr().redIAdd(h3).redISub(v3).redISub(v3);
  var ny = r3.redMul(v3.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(h2);
  return this.curve.jpoint(nx, ny, nz);
};
JPoint.prototype.dblp = function dblp2(pow) {
  if (pow === 0)
    return this;
  if (this.isInfinity())
    return this;
  if (!pow)
    return this.dbl();
  var i3;
  if (this.curve.zeroA || this.curve.threeA) {
    var r3 = this;
    for (i3 = 0; i3 < pow; i3++)
      r3 = r3.dbl();
    return r3;
  }
  var a3 = this.curve.a;
  var tinv = this.curve.tinv;
  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();
  var jyd = jy.redAdd(jy);
  for (i3 = 0; i3 < pow; i3++) {
    var jx2 = jx.redSqr();
    var jyd2 = jyd.redSqr();
    var jyd4 = jyd2.redSqr();
    var c3 = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a3.redMul(jz4));
    var t1 = jx.redMul(jyd2);
    var nx = c3.redSqr().redISub(t1.redAdd(t1));
    var t22 = t1.redISub(nx);
    var dny = c3.redMul(t22);
    dny = dny.redIAdd(dny).redISub(jyd4);
    var nz = jyd.redMul(jz);
    if (i3 + 1 < pow)
      jz4 = jz4.redMul(jyd4);
    jx = nx;
    jz = nz;
    jyd = dny;
  }
  return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
};
JPoint.prototype.dbl = function dbl2() {
  if (this.isInfinity())
    return this;
  if (this.curve.zeroA)
    return this._zeroDbl();
  else if (this.curve.threeA)
    return this._threeDbl();
  else
    return this._dbl();
};
JPoint.prototype._zeroDbl = function _zeroDbl() {
  var nx;
  var ny;
  var nz;
  if (this.zOne) {
    var xx = this.x.redSqr();
    var yy = this.y.redSqr();
    var yyyy = yy.redSqr();
    var s2 = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s2 = s2.redIAdd(s2);
    var m3 = xx.redAdd(xx).redIAdd(xx);
    var t3 = m3.redSqr().redISub(s2).redISub(s2);
    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    nx = t3;
    ny = m3.redMul(s2.redISub(t3)).redISub(yyyy8);
    nz = this.y.redAdd(this.y);
  } else {
    var a3 = this.x.redSqr();
    var b3 = this.y.redSqr();
    var c3 = b3.redSqr();
    var d2 = this.x.redAdd(b3).redSqr().redISub(a3).redISub(c3);
    d2 = d2.redIAdd(d2);
    var e3 = a3.redAdd(a3).redIAdd(a3);
    var f3 = e3.redSqr();
    var c8 = c3.redIAdd(c3);
    c8 = c8.redIAdd(c8);
    c8 = c8.redIAdd(c8);
    nx = f3.redISub(d2).redISub(d2);
    ny = e3.redMul(d2.redISub(nx)).redISub(c8);
    nz = this.y.redMul(this.z);
    nz = nz.redIAdd(nz);
  }
  return this.curve.jpoint(nx, ny, nz);
};
JPoint.prototype._threeDbl = function _threeDbl() {
  var nx;
  var ny;
  var nz;
  if (this.zOne) {
    var xx = this.x.redSqr();
    var yy = this.y.redSqr();
    var yyyy = yy.redSqr();
    var s2 = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s2 = s2.redIAdd(s2);
    var m3 = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
    var t3 = m3.redSqr().redISub(s2).redISub(s2);
    nx = t3;
    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    ny = m3.redMul(s2.redISub(t3)).redISub(yyyy8);
    nz = this.y.redAdd(this.y);
  } else {
    var delta = this.z.redSqr();
    var gamma = this.y.redSqr();
    var beta = this.x.redMul(gamma);
    var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
    alpha = alpha.redAdd(alpha).redIAdd(alpha);
    var beta4 = beta.redIAdd(beta);
    beta4 = beta4.redIAdd(beta4);
    var beta8 = beta4.redAdd(beta4);
    nx = alpha.redSqr().redISub(beta8);
    nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
    var ggamma8 = gamma.redSqr();
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
  }
  return this.curve.jpoint(nx, ny, nz);
};
JPoint.prototype._dbl = function _dbl() {
  var a3 = this.curve.a;
  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();
  var jx2 = jx.redSqr();
  var jy2 = jy.redSqr();
  var c3 = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a3.redMul(jz4));
  var jxd4 = jx.redAdd(jx);
  jxd4 = jxd4.redIAdd(jxd4);
  var t1 = jxd4.redMul(jy2);
  var nx = c3.redSqr().redISub(t1.redAdd(t1));
  var t22 = t1.redISub(nx);
  var jyd8 = jy2.redSqr();
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  var ny = c3.redMul(t22).redISub(jyd8);
  var nz = jy.redAdd(jy).redMul(jz);
  return this.curve.jpoint(nx, ny, nz);
};
JPoint.prototype.trpl = function trpl() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);
  var xx = this.x.redSqr();
  var yy = this.y.redSqr();
  var zz = this.z.redSqr();
  var yyyy = yy.redSqr();
  var m3 = xx.redAdd(xx).redIAdd(xx);
  var mm = m3.redSqr();
  var e3 = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
  e3 = e3.redIAdd(e3);
  e3 = e3.redAdd(e3).redIAdd(e3);
  e3 = e3.redISub(mm);
  var ee = e3.redSqr();
  var t3 = yyyy.redIAdd(yyyy);
  t3 = t3.redIAdd(t3);
  t3 = t3.redIAdd(t3);
  t3 = t3.redIAdd(t3);
  var u3 = m3.redIAdd(e3).redSqr().redISub(mm).redISub(ee).redISub(t3);
  var yyu4 = yy.redMul(u3);
  yyu4 = yyu4.redIAdd(yyu4);
  yyu4 = yyu4.redIAdd(yyu4);
  var nx = this.x.redMul(ee).redISub(yyu4);
  nx = nx.redIAdd(nx);
  nx = nx.redIAdd(nx);
  var ny = this.y.redMul(u3.redMul(t3.redISub(u3)).redISub(e3.redMul(ee)));
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  var nz = this.z.redAdd(e3).redSqr().redISub(zz).redISub(ee);
  return this.curve.jpoint(nx, ny, nz);
};
JPoint.prototype.mul = function mul2(k3, kbase) {
  k3 = new import_bn2.default(k3, kbase);
  return this.curve._wnafMul(this, k3);
};
JPoint.prototype.eq = function eq3(p2) {
  if (p2.type === "affine")
    return this.eq(p2.toJ());
  if (this === p2)
    return true;
  var z2 = this.z.redSqr();
  var pz2 = p2.z.redSqr();
  if (this.x.redMul(pz2).redISub(p2.x.redMul(z2)).cmpn(0) !== 0)
    return false;
  var z3 = z2.redMul(this.z);
  var pz3 = pz2.redMul(p2.z);
  return this.y.redMul(pz3).redISub(p2.y.redMul(z3)).cmpn(0) === 0;
};
JPoint.prototype.eqXToP = function eqXToP(x3) {
  var zs = this.z.redSqr();
  var rx = x3.toRed(this.curve.red).redMul(zs);
  if (this.x.cmp(rx) === 0)
    return true;
  var xc = x3.clone();
  var t3 = this.curve.redN.redMul(zs);
  for (; ; ) {
    xc.iadd(this.curve.n);
    if (xc.cmp(this.curve.p) >= 0)
      return false;
    rx.redIAdd(t3);
    if (this.x.cmp(rx) === 0)
      return true;
  }
};
JPoint.prototype.inspect = function inspect2() {
  if (this.isInfinity())
    return "<EC JPoint Infinity>";
  return "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
};
JPoint.prototype.isInfinity = function isInfinity2() {
  return this.z.cmpn(0) === 0;
};
var curve_1 = createCommonjsModule(function(module2, exports2) {
  "use strict";
  var curve = exports2;
  curve.base = base;
  curve.short = short_1;
  curve.mont = null;
  curve.edwards = null;
});
var curves_1 = createCommonjsModule(function(module2, exports2) {
  "use strict";
  var curves = exports2;
  var assert2 = utils_1$1.assert;
  function PresetCurve(options) {
    if (options.type === "short")
      this.curve = new curve_1.short(options);
    else if (options.type === "edwards")
      this.curve = new curve_1.edwards(options);
    else
      this.curve = new curve_1.mont(options);
    this.g = this.curve.g;
    this.n = this.curve.n;
    this.hash = options.hash;
    assert2(this.g.validate(), "Invalid curve");
    assert2(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
  }
  curves.PresetCurve = PresetCurve;
  function defineCurve(name2, options) {
    Object.defineProperty(curves, name2, {
      configurable: true,
      enumerable: true,
      get: function() {
        var curve = new PresetCurve(options);
        Object.defineProperty(curves, name2, {
          configurable: true,
          enumerable: true,
          value: curve
        });
        return curve;
      }
    });
  }
  defineCurve("p192", {
    type: "short",
    prime: "p192",
    p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
    a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
    b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
    n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
    hash: import_hash2.default.sha256,
    gRed: false,
    g: [
      "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
      "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
    ]
  });
  defineCurve("p224", {
    type: "short",
    prime: "p224",
    p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
    a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
    b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
    n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
    hash: import_hash2.default.sha256,
    gRed: false,
    g: [
      "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
      "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
    ]
  });
  defineCurve("p256", {
    type: "short",
    prime: null,
    p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
    a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
    b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
    n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
    hash: import_hash2.default.sha256,
    gRed: false,
    g: [
      "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
      "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
    ]
  });
  defineCurve("p384", {
    type: "short",
    prime: null,
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
    a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
    b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
    n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
    hash: import_hash2.default.sha384,
    gRed: false,
    g: [
      "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
      "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
    ]
  });
  defineCurve("p521", {
    type: "short",
    prime: null,
    p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
    a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
    b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
    n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
    hash: import_hash2.default.sha512,
    gRed: false,
    g: [
      "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
      "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
    ]
  });
  defineCurve("curve25519", {
    type: "mont",
    prime: "p25519",
    p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
    a: "76d06",
    b: "1",
    n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
    hash: import_hash2.default.sha256,
    gRed: false,
    g: [
      "9"
    ]
  });
  defineCurve("ed25519", {
    type: "edwards",
    prime: "p25519",
    p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
    a: "-1",
    c: "1",
    d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
    n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
    hash: import_hash2.default.sha256,
    gRed: false,
    g: [
      "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
      "6666666666666666666666666666666666666666666666666666666666666658"
    ]
  });
  var pre;
  try {
    pre = null.crash();
  } catch (e3) {
    pre = void 0;
  }
  defineCurve("secp256k1", {
    type: "short",
    prime: "k256",
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
    a: "0",
    b: "7",
    n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
    h: "1",
    hash: import_hash2.default.sha256,
    beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
    lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
    basis: [
      {
        a: "3086d221a7d46bcde86c90e49284eb15",
        b: "-e4437ed6010e88286f547fa90abfe4c3"
      },
      {
        a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
        b: "3086d221a7d46bcde86c90e49284eb15"
      }
    ],
    gRed: false,
    g: [
      "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
      "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
      pre
    ]
  });
});
function HmacDRBG(options) {
  if (!(this instanceof HmacDRBG))
    return new HmacDRBG(options);
  this.hash = options.hash;
  this.predResist = !!options.predResist;
  this.outLen = this.hash.outSize;
  this.minEntropy = options.minEntropy || this.hash.hmacStrength;
  this._reseed = null;
  this.reseedInterval = null;
  this.K = null;
  this.V = null;
  var entropy = utils_1.toArray(options.entropy, options.entropyEnc || "hex");
  var nonce = utils_1.toArray(options.nonce, options.nonceEnc || "hex");
  var pers = utils_1.toArray(options.pers, options.persEnc || "hex");
  minimalisticAssert(entropy.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits");
  this._init(entropy, nonce, pers);
}
var hmacDrbg = HmacDRBG;
HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
  var seed = entropy.concat(nonce).concat(pers);
  this.K = new Array(this.outLen / 8);
  this.V = new Array(this.outLen / 8);
  for (var i3 = 0; i3 < this.V.length; i3++) {
    this.K[i3] = 0;
    this.V[i3] = 1;
  }
  this._update(seed);
  this._reseed = 1;
  this.reseedInterval = 281474976710656;
};
HmacDRBG.prototype._hmac = function hmac() {
  return new import_hash2.default.hmac(this.hash, this.K);
};
HmacDRBG.prototype._update = function update(seed) {
  var kmac = this._hmac().update(this.V).update([0]);
  if (seed)
    kmac = kmac.update(seed);
  this.K = kmac.digest();
  this.V = this._hmac().update(this.V).digest();
  if (!seed)
    return;
  this.K = this._hmac().update(this.V).update([1]).update(seed).digest();
  this.V = this._hmac().update(this.V).digest();
};
HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add3, addEnc) {
  if (typeof entropyEnc !== "string") {
    addEnc = add3;
    add3 = entropyEnc;
    entropyEnc = null;
  }
  entropy = utils_1.toArray(entropy, entropyEnc);
  add3 = utils_1.toArray(add3, addEnc);
  minimalisticAssert(entropy.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits");
  this._update(entropy.concat(add3 || []));
  this._reseed = 1;
};
HmacDRBG.prototype.generate = function generate(len, enc, add3, addEnc) {
  if (this._reseed > this.reseedInterval)
    throw new Error("Reseed is required");
  if (typeof enc !== "string") {
    addEnc = add3;
    add3 = enc;
    enc = null;
  }
  if (add3) {
    add3 = utils_1.toArray(add3, addEnc || "hex");
    this._update(add3);
  }
  var temp = [];
  while (temp.length < len) {
    this.V = this._hmac().update(this.V).digest();
    temp = temp.concat(this.V);
  }
  var res = temp.slice(0, len);
  this._update(add3);
  this._reseed++;
  return utils_1.encode(res, enc);
};
var assert$3 = utils_1$1.assert;
function KeyPair(ec2, options) {
  this.ec = ec2;
  this.priv = null;
  this.pub = null;
  if (options.priv)
    this._importPrivate(options.priv, options.privEnc);
  if (options.pub)
    this._importPublic(options.pub, options.pubEnc);
}
var key = KeyPair;
KeyPair.fromPublic = function fromPublic(ec2, pub, enc) {
  if (pub instanceof KeyPair)
    return pub;
  return new KeyPair(ec2, {
    pub,
    pubEnc: enc
  });
};
KeyPair.fromPrivate = function fromPrivate(ec2, priv, enc) {
  if (priv instanceof KeyPair)
    return priv;
  return new KeyPair(ec2, {
    priv,
    privEnc: enc
  });
};
KeyPair.prototype.validate = function validate4() {
  var pub = this.getPublic();
  if (pub.isInfinity())
    return { result: false, reason: "Invalid public key" };
  if (!pub.validate())
    return { result: false, reason: "Public key is not a point" };
  if (!pub.mul(this.ec.curve.n).isInfinity())
    return { result: false, reason: "Public key * N != O" };
  return { result: true, reason: null };
};
KeyPair.prototype.getPublic = function getPublic(compact, enc) {
  if (typeof compact === "string") {
    enc = compact;
    compact = null;
  }
  if (!this.pub)
    this.pub = this.ec.g.mul(this.priv);
  if (!enc)
    return this.pub;
  return this.pub.encode(enc, compact);
};
KeyPair.prototype.getPrivate = function getPrivate(enc) {
  if (enc === "hex")
    return this.priv.toString(16, 2);
  else
    return this.priv;
};
KeyPair.prototype._importPrivate = function _importPrivate(key2, enc) {
  this.priv = new import_bn2.default(key2, enc || 16);
  this.priv = this.priv.umod(this.ec.curve.n);
};
KeyPair.prototype._importPublic = function _importPublic(key2, enc) {
  if (key2.x || key2.y) {
    if (this.ec.curve.type === "mont") {
      assert$3(key2.x, "Need x coordinate");
    } else if (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") {
      assert$3(key2.x && key2.y, "Need both x and y coordinate");
    }
    this.pub = this.ec.curve.point(key2.x, key2.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(key2, enc);
};
KeyPair.prototype.derive = function derive(pub) {
  if (!pub.validate()) {
    assert$3(pub.validate(), "public point not validated");
  }
  return pub.mul(this.priv).getX();
};
KeyPair.prototype.sign = function sign(msg, enc, options) {
  return this.ec.sign(msg, this, enc, options);
};
KeyPair.prototype.verify = function verify(msg, signature2) {
  return this.ec.verify(msg, signature2, this);
};
KeyPair.prototype.inspect = function inspect3() {
  return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
};
var assert$4 = utils_1$1.assert;
function Signature(options, enc) {
  if (options instanceof Signature)
    return options;
  if (this._importDER(options, enc))
    return;
  assert$4(options.r && options.s, "Signature without r or s");
  this.r = new import_bn2.default(options.r, 16);
  this.s = new import_bn2.default(options.s, 16);
  if (options.recoveryParam === void 0)
    this.recoveryParam = null;
  else
    this.recoveryParam = options.recoveryParam;
}
var signature = Signature;
function Position() {
  this.place = 0;
}
function getLength(buf, p2) {
  var initial = buf[p2.place++];
  if (!(initial & 128)) {
    return initial;
  }
  var octetLen = initial & 15;
  if (octetLen === 0 || octetLen > 4) {
    return false;
  }
  var val = 0;
  for (var i3 = 0, off = p2.place; i3 < octetLen; i3++, off++) {
    val <<= 8;
    val |= buf[off];
    val >>>= 0;
  }
  if (val <= 127) {
    return false;
  }
  p2.place = off;
  return val;
}
function rmPadding(buf) {
  var i3 = 0;
  var len = buf.length - 1;
  while (!buf[i3] && !(buf[i3 + 1] & 128) && i3 < len) {
    i3++;
  }
  if (i3 === 0) {
    return buf;
  }
  return buf.slice(i3);
}
Signature.prototype._importDER = function _importDER(data, enc) {
  data = utils_1$1.toArray(data, enc);
  var p2 = new Position();
  if (data[p2.place++] !== 48) {
    return false;
  }
  var len = getLength(data, p2);
  if (len === false) {
    return false;
  }
  if (len + p2.place !== data.length) {
    return false;
  }
  if (data[p2.place++] !== 2) {
    return false;
  }
  var rlen = getLength(data, p2);
  if (rlen === false) {
    return false;
  }
  var r3 = data.slice(p2.place, rlen + p2.place);
  p2.place += rlen;
  if (data[p2.place++] !== 2) {
    return false;
  }
  var slen = getLength(data, p2);
  if (slen === false) {
    return false;
  }
  if (data.length !== slen + p2.place) {
    return false;
  }
  var s2 = data.slice(p2.place, slen + p2.place);
  if (r3[0] === 0) {
    if (r3[1] & 128) {
      r3 = r3.slice(1);
    } else {
      return false;
    }
  }
  if (s2[0] === 0) {
    if (s2[1] & 128) {
      s2 = s2.slice(1);
    } else {
      return false;
    }
  }
  this.r = new import_bn2.default(r3);
  this.s = new import_bn2.default(s2);
  this.recoveryParam = null;
  return true;
};
function constructLength(arr, len) {
  if (len < 128) {
    arr.push(len);
    return;
  }
  var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
  arr.push(octets | 128);
  while (--octets) {
    arr.push(len >>> (octets << 3) & 255);
  }
  arr.push(len);
}
Signature.prototype.toDER = function toDER(enc) {
  var r3 = this.r.toArray();
  var s2 = this.s.toArray();
  if (r3[0] & 128)
    r3 = [0].concat(r3);
  if (s2[0] & 128)
    s2 = [0].concat(s2);
  r3 = rmPadding(r3);
  s2 = rmPadding(s2);
  while (!s2[0] && !(s2[1] & 128)) {
    s2 = s2.slice(1);
  }
  var arr = [2];
  constructLength(arr, r3.length);
  arr = arr.concat(r3);
  arr.push(2);
  constructLength(arr, s2.length);
  var backHalf = arr.concat(s2);
  var res = [48];
  constructLength(res, backHalf.length);
  res = res.concat(backHalf);
  return utils_1$1.encode(res, enc);
};
var rand = function() {
  throw new Error("unsupported");
};
var assert$5 = utils_1$1.assert;
function EC(options) {
  if (!(this instanceof EC))
    return new EC(options);
  if (typeof options === "string") {
    assert$5(Object.prototype.hasOwnProperty.call(curves_1, options), "Unknown curve " + options);
    options = curves_1[options];
  }
  if (options instanceof curves_1.PresetCurve)
    options = { curve: options };
  this.curve = options.curve.curve;
  this.n = this.curve.n;
  this.nh = this.n.ushrn(1);
  this.g = this.curve.g;
  this.g = options.curve.g;
  this.g.precompute(options.curve.n.bitLength() + 1);
  this.hash = options.hash || options.curve.hash;
}
var ec = EC;
EC.prototype.keyPair = function keyPair(options) {
  return new key(this, options);
};
EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
  return key.fromPrivate(this, priv, enc);
};
EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
  return key.fromPublic(this, pub, enc);
};
EC.prototype.genKeyPair = function genKeyPair(options) {
  if (!options)
    options = {};
  var drbg = new hmacDrbg({
    hash: this.hash,
    pers: options.pers,
    persEnc: options.persEnc || "utf8",
    entropy: options.entropy || rand(this.hash.hmacStrength),
    entropyEnc: options.entropy && options.entropyEnc || "utf8",
    nonce: this.n.toArray()
  });
  var bytes = this.n.byteLength();
  var ns2 = this.n.sub(new import_bn2.default(2));
  for (; ; ) {
    var priv = new import_bn2.default(drbg.generate(bytes));
    if (priv.cmp(ns2) > 0)
      continue;
    priv.iaddn(1);
    return this.keyFromPrivate(priv);
  }
};
EC.prototype._truncateToN = function _truncateToN(msg, truncOnly) {
  var delta = msg.byteLength() * 8 - this.n.bitLength();
  if (delta > 0)
    msg = msg.ushrn(delta);
  if (!truncOnly && msg.cmp(this.n) >= 0)
    return msg.sub(this.n);
  else
    return msg;
};
EC.prototype.sign = function sign2(msg, key2, enc, options) {
  if (typeof enc === "object") {
    options = enc;
    enc = null;
  }
  if (!options)
    options = {};
  key2 = this.keyFromPrivate(key2, enc);
  msg = this._truncateToN(new import_bn2.default(msg, 16));
  var bytes = this.n.byteLength();
  var bkey = key2.getPrivate().toArray("be", bytes);
  var nonce = msg.toArray("be", bytes);
  var drbg = new hmacDrbg({
    hash: this.hash,
    entropy: bkey,
    nonce,
    pers: options.pers,
    persEnc: options.persEnc || "utf8"
  });
  var ns1 = this.n.sub(new import_bn2.default(1));
  for (var iter = 0; ; iter++) {
    var k3 = options.k ? options.k(iter) : new import_bn2.default(drbg.generate(this.n.byteLength()));
    k3 = this._truncateToN(k3, true);
    if (k3.cmpn(1) <= 0 || k3.cmp(ns1) >= 0)
      continue;
    var kp = this.g.mul(k3);
    if (kp.isInfinity())
      continue;
    var kpX = kp.getX();
    var r3 = kpX.umod(this.n);
    if (r3.cmpn(0) === 0)
      continue;
    var s2 = k3.invm(this.n).mul(r3.mul(key2.getPrivate()).iadd(msg));
    s2 = s2.umod(this.n);
    if (s2.cmpn(0) === 0)
      continue;
    var recoveryParam = (kp.getY().isOdd() ? 1 : 0) | (kpX.cmp(r3) !== 0 ? 2 : 0);
    if (options.canonical && s2.cmp(this.nh) > 0) {
      s2 = this.n.sub(s2);
      recoveryParam ^= 1;
    }
    return new signature({ r: r3, s: s2, recoveryParam });
  }
};
EC.prototype.verify = function verify2(msg, signature$1, key2, enc) {
  msg = this._truncateToN(new import_bn2.default(msg, 16));
  key2 = this.keyFromPublic(key2, enc);
  signature$1 = new signature(signature$1, "hex");
  var r3 = signature$1.r;
  var s2 = signature$1.s;
  if (r3.cmpn(1) < 0 || r3.cmp(this.n) >= 0)
    return false;
  if (s2.cmpn(1) < 0 || s2.cmp(this.n) >= 0)
    return false;
  var sinv = s2.invm(this.n);
  var u1 = sinv.mul(msg).umod(this.n);
  var u22 = sinv.mul(r3).umod(this.n);
  var p2;
  if (!this.curve._maxwellTrick) {
    p2 = this.g.mulAdd(u1, key2.getPublic(), u22);
    if (p2.isInfinity())
      return false;
    return p2.getX().umod(this.n).cmp(r3) === 0;
  }
  p2 = this.g.jmulAdd(u1, key2.getPublic(), u22);
  if (p2.isInfinity())
    return false;
  return p2.eqXToP(r3);
};
EC.prototype.recoverPubKey = function(msg, signature$1, j3, enc) {
  assert$5((3 & j3) === j3, "The recovery param is more than two bits");
  signature$1 = new signature(signature$1, enc);
  var n2 = this.n;
  var e3 = new import_bn2.default(msg);
  var r3 = signature$1.r;
  var s2 = signature$1.s;
  var isYOdd = j3 & 1;
  var isSecondKey = j3 >> 1;
  if (r3.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
    throw new Error("Unable to find sencond key candinate");
  if (isSecondKey)
    r3 = this.curve.pointFromX(r3.add(this.curve.n), isYOdd);
  else
    r3 = this.curve.pointFromX(r3, isYOdd);
  var rInv = signature$1.r.invm(n2);
  var s1 = n2.sub(e3).mul(rInv).umod(n2);
  var s22 = s2.mul(rInv).umod(n2);
  return this.g.mulAdd(s1, r3, s22);
};
EC.prototype.getKeyRecoveryParam = function(e3, signature$1, Q, enc) {
  signature$1 = new signature(signature$1, enc);
  if (signature$1.recoveryParam !== null)
    return signature$1.recoveryParam;
  for (var i3 = 0; i3 < 4; i3++) {
    var Qprime;
    try {
      Qprime = this.recoverPubKey(e3, signature$1, i3);
    } catch (e4) {
      continue;
    }
    if (Qprime.eq(Q))
      return i3;
  }
  throw new Error("Unable to find valid recovery factor");
};
var elliptic_1 = createCommonjsModule(function(module2, exports2) {
  "use strict";
  var elliptic = exports2;
  elliptic.version = { version: "6.5.4" }.version;
  elliptic.utils = utils_1$1;
  elliptic.rand = function() {
    throw new Error("unsupported");
  };
  elliptic.curve = curve_1;
  elliptic.curves = curves_1;
  elliptic.ec = ec;
  elliptic.eddsa = null;
});
var EC$1 = elliptic_1.ec;

// node_modules/@ethersproject/signing-key/lib.esm/_version.js
var version12 = "signing-key/5.5.0";

// node_modules/@ethersproject/signing-key/lib.esm/index.js
"use strict";
var logger17 = new Logger(version12);
var _curve = null;
function getCurve() {
  if (!_curve) {
    _curve = new EC$1("secp256k1");
  }
  return _curve;
}
var SigningKey = class {
  constructor(privateKey) {
    defineReadOnly(this, "curve", "secp256k1");
    defineReadOnly(this, "privateKey", hexlify(privateKey));
    const keyPair2 = getCurve().keyFromPrivate(arrayify(this.privateKey));
    defineReadOnly(this, "publicKey", "0x" + keyPair2.getPublic(false, "hex"));
    defineReadOnly(this, "compressedPublicKey", "0x" + keyPair2.getPublic(true, "hex"));
    defineReadOnly(this, "_isSigningKey", true);
  }
  _addPoint(other) {
    const p0 = getCurve().keyFromPublic(arrayify(this.publicKey));
    const p1 = getCurve().keyFromPublic(arrayify(other));
    return "0x" + p0.pub.add(p1.pub).encodeCompressed("hex");
  }
  signDigest(digest) {
    const keyPair2 = getCurve().keyFromPrivate(arrayify(this.privateKey));
    const digestBytes = arrayify(digest);
    if (digestBytes.length !== 32) {
      logger17.throwArgumentError("bad digest length", "digest", digest);
    }
    const signature2 = keyPair2.sign(digestBytes, { canonical: true });
    return splitSignature({
      recoveryParam: signature2.recoveryParam,
      r: hexZeroPad("0x" + signature2.r.toString(16), 32),
      s: hexZeroPad("0x" + signature2.s.toString(16), 32)
    });
  }
  computeSharedSecret(otherKey) {
    const keyPair2 = getCurve().keyFromPrivate(arrayify(this.privateKey));
    const otherKeyPair = getCurve().keyFromPublic(arrayify(computePublicKey(otherKey)));
    return hexZeroPad("0x" + keyPair2.derive(otherKeyPair.getPublic()).toString(16), 32);
  }
  static isSigningKey(value) {
    return !!(value && value._isSigningKey);
  }
};
function recoverPublicKey(digest, signature2) {
  const sig = splitSignature(signature2);
  const rs = { r: arrayify(sig.r), s: arrayify(sig.s) };
  return "0x" + getCurve().recoverPubKey(arrayify(digest), rs, sig.recoveryParam).encode("hex", false);
}
function computePublicKey(key2, compressed) {
  const bytes = arrayify(key2);
  if (bytes.length === 32) {
    const signingKey = new SigningKey(bytes);
    if (compressed) {
      return "0x" + getCurve().keyFromPrivate(bytes).getPublic(true, "hex");
    }
    return signingKey.publicKey;
  } else if (bytes.length === 33) {
    if (compressed) {
      return hexlify(bytes);
    }
    return "0x" + getCurve().keyFromPublic(bytes).getPublic(false, "hex");
  } else if (bytes.length === 65) {
    if (!compressed) {
      return hexlify(bytes);
    }
    return "0x" + getCurve().keyFromPublic(bytes).getPublic(true, "hex");
  }
  return logger17.throwArgumentError("invalid public or private key", "key", "[REDACTED]");
}

// node_modules/@ethersproject/transactions/lib.esm/_version.js
var version13 = "transactions/5.5.0";

// node_modules/@ethersproject/transactions/lib.esm/index.js
"use strict";
var logger18 = new Logger(version13);
var TransactionTypes;
(function(TransactionTypes2) {
  TransactionTypes2[TransactionTypes2["legacy"] = 0] = "legacy";
  TransactionTypes2[TransactionTypes2["eip2930"] = 1] = "eip2930";
  TransactionTypes2[TransactionTypes2["eip1559"] = 2] = "eip1559";
})(TransactionTypes || (TransactionTypes = {}));
function handleAddress(value) {
  if (value === "0x") {
    return null;
  }
  return getAddress(value);
}
function handleNumber(value) {
  if (value === "0x") {
    return Zero2;
  }
  return BigNumber.from(value);
}
var transactionFields = [
  { name: "nonce", maxLength: 32, numeric: true },
  { name: "gasPrice", maxLength: 32, numeric: true },
  { name: "gasLimit", maxLength: 32, numeric: true },
  { name: "to", length: 20 },
  { name: "value", maxLength: 32, numeric: true },
  { name: "data" }
];
var allowedTransactionKeys2 = {
  chainId: true,
  data: true,
  gasLimit: true,
  gasPrice: true,
  nonce: true,
  to: true,
  type: true,
  value: true
};
function computeAddress(key2) {
  const publicKey = computePublicKey(key2);
  return getAddress(hexDataSlice(keccak256(hexDataSlice(publicKey, 1)), 12));
}
function recoverAddress(digest, signature2) {
  return computeAddress(recoverPublicKey(arrayify(digest), signature2));
}
function formatNumber(value, name2) {
  const result = stripZeros(BigNumber.from(value).toHexString());
  if (result.length > 32) {
    logger18.throwArgumentError("invalid length for " + name2, "transaction:" + name2, value);
  }
  return result;
}
function accessSetify(addr, storageKeys) {
  return {
    address: getAddress(addr),
    storageKeys: (storageKeys || []).map((storageKey, index) => {
      if (hexDataLength(storageKey) !== 32) {
        logger18.throwArgumentError("invalid access list storageKey", `accessList[${addr}:${index}]`, storageKey);
      }
      return storageKey.toLowerCase();
    })
  };
}
function accessListify(value) {
  if (Array.isArray(value)) {
    return value.map((set, index) => {
      if (Array.isArray(set)) {
        if (set.length > 2) {
          logger18.throwArgumentError("access list expected to be [ address, storageKeys[] ]", `value[${index}]`, set);
        }
        return accessSetify(set[0], set[1]);
      }
      return accessSetify(set.address, set.storageKeys);
    });
  }
  const result = Object.keys(value).map((addr) => {
    const storageKeys = value[addr].reduce((accum, storageKey) => {
      accum[storageKey] = true;
      return accum;
    }, {});
    return accessSetify(addr, Object.keys(storageKeys).sort());
  });
  result.sort((a3, b3) => a3.address.localeCompare(b3.address));
  return result;
}
function formatAccessList(value) {
  return accessListify(value).map((set) => [set.address, set.storageKeys]);
}
function _serializeEip1559(transaction, signature2) {
  if (transaction.gasPrice != null) {
    const gasPrice = BigNumber.from(transaction.gasPrice);
    const maxFeePerGas = BigNumber.from(transaction.maxFeePerGas || 0);
    if (!gasPrice.eq(maxFeePerGas)) {
      logger18.throwArgumentError("mismatch EIP-1559 gasPrice != maxFeePerGas", "tx", {
        gasPrice,
        maxFeePerGas
      });
    }
  }
  const fields = [
    formatNumber(transaction.chainId || 0, "chainId"),
    formatNumber(transaction.nonce || 0, "nonce"),
    formatNumber(transaction.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
    formatNumber(transaction.maxFeePerGas || 0, "maxFeePerGas"),
    formatNumber(transaction.gasLimit || 0, "gasLimit"),
    transaction.to != null ? getAddress(transaction.to) : "0x",
    formatNumber(transaction.value || 0, "value"),
    transaction.data || "0x",
    formatAccessList(transaction.accessList || [])
  ];
  if (signature2) {
    const sig = splitSignature(signature2);
    fields.push(formatNumber(sig.recoveryParam, "recoveryParam"));
    fields.push(stripZeros(sig.r));
    fields.push(stripZeros(sig.s));
  }
  return hexConcat(["0x02", encode(fields)]);
}
function _serializeEip2930(transaction, signature2) {
  const fields = [
    formatNumber(transaction.chainId || 0, "chainId"),
    formatNumber(transaction.nonce || 0, "nonce"),
    formatNumber(transaction.gasPrice || 0, "gasPrice"),
    formatNumber(transaction.gasLimit || 0, "gasLimit"),
    transaction.to != null ? getAddress(transaction.to) : "0x",
    formatNumber(transaction.value || 0, "value"),
    transaction.data || "0x",
    formatAccessList(transaction.accessList || [])
  ];
  if (signature2) {
    const sig = splitSignature(signature2);
    fields.push(formatNumber(sig.recoveryParam, "recoveryParam"));
    fields.push(stripZeros(sig.r));
    fields.push(stripZeros(sig.s));
  }
  return hexConcat(["0x01", encode(fields)]);
}
function _serialize(transaction, signature2) {
  checkProperties(transaction, allowedTransactionKeys2);
  const raw = [];
  transactionFields.forEach(function(fieldInfo) {
    let value = transaction[fieldInfo.name] || [];
    const options = {};
    if (fieldInfo.numeric) {
      options.hexPad = "left";
    }
    value = arrayify(hexlify(value, options));
    if (fieldInfo.length && value.length !== fieldInfo.length && value.length > 0) {
      logger18.throwArgumentError("invalid length for " + fieldInfo.name, "transaction:" + fieldInfo.name, value);
    }
    if (fieldInfo.maxLength) {
      value = stripZeros(value);
      if (value.length > fieldInfo.maxLength) {
        logger18.throwArgumentError("invalid length for " + fieldInfo.name, "transaction:" + fieldInfo.name, value);
      }
    }
    raw.push(hexlify(value));
  });
  let chainId = 0;
  if (transaction.chainId != null) {
    chainId = transaction.chainId;
    if (typeof chainId !== "number") {
      logger18.throwArgumentError("invalid transaction.chainId", "transaction", transaction);
    }
  } else if (signature2 && !isBytesLike(signature2) && signature2.v > 28) {
    chainId = Math.floor((signature2.v - 35) / 2);
  }
  if (chainId !== 0) {
    raw.push(hexlify(chainId));
    raw.push("0x");
    raw.push("0x");
  }
  if (!signature2) {
    return encode(raw);
  }
  const sig = splitSignature(signature2);
  let v3 = 27 + sig.recoveryParam;
  if (chainId !== 0) {
    raw.pop();
    raw.pop();
    raw.pop();
    v3 += chainId * 2 + 8;
    if (sig.v > 28 && sig.v !== v3) {
      logger18.throwArgumentError("transaction.chainId/signature.v mismatch", "signature", signature2);
    }
  } else if (sig.v !== v3) {
    logger18.throwArgumentError("transaction.chainId/signature.v mismatch", "signature", signature2);
  }
  raw.push(hexlify(v3));
  raw.push(stripZeros(arrayify(sig.r)));
  raw.push(stripZeros(arrayify(sig.s)));
  return encode(raw);
}
function serialize(transaction, signature2) {
  if (transaction.type == null || transaction.type === 0) {
    if (transaction.accessList != null) {
      logger18.throwArgumentError("untyped transactions do not support accessList; include type: 1", "transaction", transaction);
    }
    return _serialize(transaction, signature2);
  }
  switch (transaction.type) {
    case 1:
      return _serializeEip2930(transaction, signature2);
    case 2:
      return _serializeEip1559(transaction, signature2);
    default:
      break;
  }
  return logger18.throwError(`unsupported transaction type: ${transaction.type}`, Logger.errors.UNSUPPORTED_OPERATION, {
    operation: "serializeTransaction",
    transactionType: transaction.type
  });
}
function _parseEipSignature(tx, fields, serialize3) {
  try {
    const recid = handleNumber(fields[0]).toNumber();
    if (recid !== 0 && recid !== 1) {
      throw new Error("bad recid");
    }
    tx.v = recid;
  } catch (error) {
    logger18.throwArgumentError("invalid v for transaction type: 1", "v", fields[0]);
  }
  tx.r = hexZeroPad(fields[1], 32);
  tx.s = hexZeroPad(fields[2], 32);
  try {
    const digest = keccak256(serialize3(tx));
    tx.from = recoverAddress(digest, { r: tx.r, s: tx.s, recoveryParam: tx.v });
  } catch (error) {
    console.log(error);
  }
}
function _parseEip1559(payload) {
  const transaction = decode(payload.slice(1));
  if (transaction.length !== 9 && transaction.length !== 12) {
    logger18.throwArgumentError("invalid component count for transaction type: 2", "payload", hexlify(payload));
  }
  const maxPriorityFeePerGas = handleNumber(transaction[2]);
  const maxFeePerGas = handleNumber(transaction[3]);
  const tx = {
    type: 2,
    chainId: handleNumber(transaction[0]).toNumber(),
    nonce: handleNumber(transaction[1]).toNumber(),
    maxPriorityFeePerGas,
    maxFeePerGas,
    gasPrice: null,
    gasLimit: handleNumber(transaction[4]),
    to: handleAddress(transaction[5]),
    value: handleNumber(transaction[6]),
    data: transaction[7],
    accessList: accessListify(transaction[8])
  };
  if (transaction.length === 9) {
    return tx;
  }
  tx.hash = keccak256(payload);
  _parseEipSignature(tx, transaction.slice(9), _serializeEip1559);
  return tx;
}
function _parseEip2930(payload) {
  const transaction = decode(payload.slice(1));
  if (transaction.length !== 8 && transaction.length !== 11) {
    logger18.throwArgumentError("invalid component count for transaction type: 1", "payload", hexlify(payload));
  }
  const tx = {
    type: 1,
    chainId: handleNumber(transaction[0]).toNumber(),
    nonce: handleNumber(transaction[1]).toNumber(),
    gasPrice: handleNumber(transaction[2]),
    gasLimit: handleNumber(transaction[3]),
    to: handleAddress(transaction[4]),
    value: handleNumber(transaction[5]),
    data: transaction[6],
    accessList: accessListify(transaction[7])
  };
  if (transaction.length === 8) {
    return tx;
  }
  tx.hash = keccak256(payload);
  _parseEipSignature(tx, transaction.slice(8), _serializeEip2930);
  return tx;
}
function _parse(rawTransaction) {
  const transaction = decode(rawTransaction);
  if (transaction.length !== 9 && transaction.length !== 6) {
    logger18.throwArgumentError("invalid raw transaction", "rawTransaction", rawTransaction);
  }
  const tx = {
    nonce: handleNumber(transaction[0]).toNumber(),
    gasPrice: handleNumber(transaction[1]),
    gasLimit: handleNumber(transaction[2]),
    to: handleAddress(transaction[3]),
    value: handleNumber(transaction[4]),
    data: transaction[5],
    chainId: 0
  };
  if (transaction.length === 6) {
    return tx;
  }
  try {
    tx.v = BigNumber.from(transaction[6]).toNumber();
  } catch (error) {
    console.log(error);
    return tx;
  }
  tx.r = hexZeroPad(transaction[7], 32);
  tx.s = hexZeroPad(transaction[8], 32);
  if (BigNumber.from(tx.r).isZero() && BigNumber.from(tx.s).isZero()) {
    tx.chainId = tx.v;
    tx.v = 0;
  } else {
    tx.chainId = Math.floor((tx.v - 35) / 2);
    if (tx.chainId < 0) {
      tx.chainId = 0;
    }
    let recoveryParam = tx.v - 27;
    const raw = transaction.slice(0, 6);
    if (tx.chainId !== 0) {
      raw.push(hexlify(tx.chainId));
      raw.push("0x");
      raw.push("0x");
      recoveryParam -= tx.chainId * 2 + 8;
    }
    const digest = keccak256(encode(raw));
    try {
      tx.from = recoverAddress(digest, { r: hexlify(tx.r), s: hexlify(tx.s), recoveryParam });
    } catch (error) {
      console.log(error);
    }
    tx.hash = keccak256(rawTransaction);
  }
  tx.type = null;
  return tx;
}
function parse(rawTransaction) {
  const payload = arrayify(rawTransaction);
  if (payload[0] > 127) {
    return _parse(payload);
  }
  switch (payload[0]) {
    case 1:
      return _parseEip2930(payload);
    case 2:
      return _parseEip1559(payload);
    default:
      break;
  }
  return logger18.throwError(`unsupported transaction type: ${payload[0]}`, Logger.errors.UNSUPPORTED_OPERATION, {
    operation: "parseTransaction",
    transactionType: payload[0]
  });
}

// node_modules/@ethersproject/contracts/lib.esm/_version.js
var version14 = "contracts/5.5.0";

// node_modules/@ethersproject/contracts/lib.esm/index.js
"use strict";
var __awaiter5 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var logger19 = new Logger(version14);
var allowedTransactionKeys3 = {
  chainId: true,
  data: true,
  from: true,
  gasLimit: true,
  gasPrice: true,
  nonce: true,
  to: true,
  value: true,
  type: true,
  accessList: true,
  maxFeePerGas: true,
  maxPriorityFeePerGas: true,
  customData: true
};
function resolveName(resolver, nameOrPromise) {
  return __awaiter5(this, void 0, void 0, function* () {
    const name2 = yield nameOrPromise;
    if (typeof name2 !== "string") {
      logger19.throwArgumentError("invalid address or ENS name", "name", name2);
    }
    try {
      return getAddress(name2);
    } catch (error) {
    }
    if (!resolver) {
      logger19.throwError("a provider or signer is needed to resolve ENS names", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "resolveName"
      });
    }
    const address = yield resolver.resolveName(name2);
    if (address == null) {
      logger19.throwArgumentError("resolver or addr is not configured for ENS name", "name", name2);
    }
    return address;
  });
}
function resolveAddresses(resolver, value, paramType) {
  return __awaiter5(this, void 0, void 0, function* () {
    if (Array.isArray(paramType)) {
      return yield Promise.all(paramType.map((paramType2, index) => {
        return resolveAddresses(resolver, Array.isArray(value) ? value[index] : value[paramType2.name], paramType2);
      }));
    }
    if (paramType.type === "address") {
      return yield resolveName(resolver, value);
    }
    if (paramType.type === "tuple") {
      return yield resolveAddresses(resolver, value, paramType.components);
    }
    if (paramType.baseType === "array") {
      if (!Array.isArray(value)) {
        return Promise.reject(logger19.makeError("invalid value for array", Logger.errors.INVALID_ARGUMENT, {
          argument: "value",
          value
        }));
      }
      return yield Promise.all(value.map((v3) => resolveAddresses(resolver, v3, paramType.arrayChildren)));
    }
    return value;
  });
}
function populateTransaction(contract, fragment, args) {
  return __awaiter5(this, void 0, void 0, function* () {
    let overrides = {};
    if (args.length === fragment.inputs.length + 1 && typeof args[args.length - 1] === "object") {
      overrides = shallowCopy(args.pop());
    }
    logger19.checkArgumentCount(args.length, fragment.inputs.length, "passed to contract");
    if (contract.signer) {
      if (overrides.from) {
        overrides.from = resolveProperties({
          override: resolveName(contract.signer, overrides.from),
          signer: contract.signer.getAddress()
        }).then((check) => __awaiter5(this, void 0, void 0, function* () {
          if (getAddress(check.signer) !== check.override) {
            logger19.throwError("Contract with a Signer cannot override from", Logger.errors.UNSUPPORTED_OPERATION, {
              operation: "overrides.from"
            });
          }
          return check.override;
        }));
      } else {
        overrides.from = contract.signer.getAddress();
      }
    } else if (overrides.from) {
      overrides.from = resolveName(contract.provider, overrides.from);
    }
    const resolved = yield resolveProperties({
      args: resolveAddresses(contract.signer || contract.provider, args, fragment.inputs),
      address: contract.resolvedAddress,
      overrides: resolveProperties(overrides) || {}
    });
    const data = contract.interface.encodeFunctionData(fragment, resolved.args);
    const tx = {
      data,
      to: resolved.address
    };
    const ro = resolved.overrides;
    if (ro.nonce != null) {
      tx.nonce = BigNumber.from(ro.nonce).toNumber();
    }
    if (ro.gasLimit != null) {
      tx.gasLimit = BigNumber.from(ro.gasLimit);
    }
    if (ro.gasPrice != null) {
      tx.gasPrice = BigNumber.from(ro.gasPrice);
    }
    if (ro.maxFeePerGas != null) {
      tx.maxFeePerGas = BigNumber.from(ro.maxFeePerGas);
    }
    if (ro.maxPriorityFeePerGas != null) {
      tx.maxPriorityFeePerGas = BigNumber.from(ro.maxPriorityFeePerGas);
    }
    if (ro.from != null) {
      tx.from = ro.from;
    }
    if (ro.type != null) {
      tx.type = ro.type;
    }
    if (ro.accessList != null) {
      tx.accessList = accessListify(ro.accessList);
    }
    if (tx.gasLimit == null && fragment.gas != null) {
      let intrinsic = 21e3;
      const bytes = arrayify(data);
      for (let i3 = 0; i3 < bytes.length; i3++) {
        intrinsic += 4;
        if (bytes[i3]) {
          intrinsic += 64;
        }
      }
      tx.gasLimit = BigNumber.from(fragment.gas).add(intrinsic);
    }
    if (ro.value) {
      const roValue = BigNumber.from(ro.value);
      if (!roValue.isZero() && !fragment.payable) {
        logger19.throwError("non-payable method cannot override value", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "overrides.value",
          value: overrides.value
        });
      }
      tx.value = roValue;
    }
    if (ro.customData) {
      tx.customData = shallowCopy(ro.customData);
    }
    delete overrides.nonce;
    delete overrides.gasLimit;
    delete overrides.gasPrice;
    delete overrides.from;
    delete overrides.value;
    delete overrides.type;
    delete overrides.accessList;
    delete overrides.maxFeePerGas;
    delete overrides.maxPriorityFeePerGas;
    delete overrides.customData;
    const leftovers = Object.keys(overrides).filter((key2) => overrides[key2] != null);
    if (leftovers.length) {
      logger19.throwError(`cannot override ${leftovers.map((l3) => JSON.stringify(l3)).join(",")}`, Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "overrides",
        overrides: leftovers
      });
    }
    return tx;
  });
}
function buildPopulate(contract, fragment) {
  return function(...args) {
    return populateTransaction(contract, fragment, args);
  };
}
function buildEstimate(contract, fragment) {
  const signerOrProvider = contract.signer || contract.provider;
  return function(...args) {
    return __awaiter5(this, void 0, void 0, function* () {
      if (!signerOrProvider) {
        logger19.throwError("estimate require a provider or signer", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "estimateGas"
        });
      }
      const tx = yield populateTransaction(contract, fragment, args);
      return yield signerOrProvider.estimateGas(tx);
    });
  };
}
function addContractWait(contract, tx) {
  const wait = tx.wait.bind(tx);
  tx.wait = (confirmations) => {
    return wait(confirmations).then((receipt) => {
      receipt.events = receipt.logs.map((log) => {
        let event = deepCopy(log);
        let parsed = null;
        try {
          parsed = contract.interface.parseLog(log);
        } catch (e3) {
        }
        if (parsed) {
          event.args = parsed.args;
          event.decode = (data, topics) => {
            return contract.interface.decodeEventLog(parsed.eventFragment, data, topics);
          };
          event.event = parsed.name;
          event.eventSignature = parsed.signature;
        }
        event.removeListener = () => {
          return contract.provider;
        };
        event.getBlock = () => {
          return contract.provider.getBlock(receipt.blockHash);
        };
        event.getTransaction = () => {
          return contract.provider.getTransaction(receipt.transactionHash);
        };
        event.getTransactionReceipt = () => {
          return Promise.resolve(receipt);
        };
        return event;
      });
      return receipt;
    });
  };
}
function buildCall(contract, fragment, collapseSimple) {
  const signerOrProvider = contract.signer || contract.provider;
  return function(...args) {
    return __awaiter5(this, void 0, void 0, function* () {
      let blockTag = void 0;
      if (args.length === fragment.inputs.length + 1 && typeof args[args.length - 1] === "object") {
        const overrides = shallowCopy(args.pop());
        if (overrides.blockTag != null) {
          blockTag = yield overrides.blockTag;
        }
        delete overrides.blockTag;
        args.push(overrides);
      }
      if (contract.deployTransaction != null) {
        yield contract._deployed(blockTag);
      }
      const tx = yield populateTransaction(contract, fragment, args);
      const result = yield signerOrProvider.call(tx, blockTag);
      try {
        let value = contract.interface.decodeFunctionResult(fragment, result);
        if (collapseSimple && fragment.outputs.length === 1) {
          value = value[0];
        }
        return value;
      } catch (error) {
        if (error.code === Logger.errors.CALL_EXCEPTION) {
          error.address = contract.address;
          error.args = args;
          error.transaction = tx;
        }
        throw error;
      }
    });
  };
}
function buildSend(contract, fragment) {
  return function(...args) {
    return __awaiter5(this, void 0, void 0, function* () {
      if (!contract.signer) {
        logger19.throwError("sending a transaction requires a signer", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "sendTransaction"
        });
      }
      if (contract.deployTransaction != null) {
        yield contract._deployed();
      }
      const txRequest = yield populateTransaction(contract, fragment, args);
      const tx = yield contract.signer.sendTransaction(txRequest);
      addContractWait(contract, tx);
      return tx;
    });
  };
}
function buildDefault(contract, fragment, collapseSimple) {
  if (fragment.constant) {
    return buildCall(contract, fragment, collapseSimple);
  }
  return buildSend(contract, fragment);
}
function getEventTag(filter2) {
  if (filter2.address && (filter2.topics == null || filter2.topics.length === 0)) {
    return "*";
  }
  return (filter2.address || "*") + "@" + (filter2.topics ? filter2.topics.map((topic) => {
    if (Array.isArray(topic)) {
      return topic.join("|");
    }
    return topic;
  }).join(":") : "");
}
var RunningEvent = class {
  constructor(tag, filter2) {
    defineReadOnly(this, "tag", tag);
    defineReadOnly(this, "filter", filter2);
    this._listeners = [];
  }
  addListener(listener, once) {
    this._listeners.push({ listener, once });
  }
  removeListener(listener) {
    let done = false;
    this._listeners = this._listeners.filter((item) => {
      if (done || item.listener !== listener) {
        return true;
      }
      done = true;
      return false;
    });
  }
  removeAllListeners() {
    this._listeners = [];
  }
  listeners() {
    return this._listeners.map((i3) => i3.listener);
  }
  listenerCount() {
    return this._listeners.length;
  }
  run(args) {
    const listenerCount = this.listenerCount();
    this._listeners = this._listeners.filter((item) => {
      const argsCopy = args.slice();
      setTimeout(() => {
        item.listener.apply(this, argsCopy);
      }, 0);
      return !item.once;
    });
    return listenerCount;
  }
  prepareEvent(event) {
  }
  getEmit(event) {
    return [event];
  }
};
var ErrorRunningEvent = class extends RunningEvent {
  constructor() {
    super("error", null);
  }
};
var FragmentRunningEvent = class extends RunningEvent {
  constructor(address, contractInterface, fragment, topics) {
    const filter2 = {
      address
    };
    let topic = contractInterface.getEventTopic(fragment);
    if (topics) {
      if (topic !== topics[0]) {
        logger19.throwArgumentError("topic mismatch", "topics", topics);
      }
      filter2.topics = topics.slice();
    } else {
      filter2.topics = [topic];
    }
    super(getEventTag(filter2), filter2);
    defineReadOnly(this, "address", address);
    defineReadOnly(this, "interface", contractInterface);
    defineReadOnly(this, "fragment", fragment);
  }
  prepareEvent(event) {
    super.prepareEvent(event);
    event.event = this.fragment.name;
    event.eventSignature = this.fragment.format();
    event.decode = (data, topics) => {
      return this.interface.decodeEventLog(this.fragment, data, topics);
    };
    try {
      event.args = this.interface.decodeEventLog(this.fragment, event.data, event.topics);
    } catch (error) {
      event.args = null;
      event.decodeError = error;
    }
  }
  getEmit(event) {
    const errors = checkResultErrors(event.args);
    if (errors.length) {
      throw errors[0].error;
    }
    const args = (event.args || []).slice();
    args.push(event);
    return args;
  }
};
var WildcardRunningEvent = class extends RunningEvent {
  constructor(address, contractInterface) {
    super("*", { address });
    defineReadOnly(this, "address", address);
    defineReadOnly(this, "interface", contractInterface);
  }
  prepareEvent(event) {
    super.prepareEvent(event);
    try {
      const parsed = this.interface.parseLog(event);
      event.event = parsed.name;
      event.eventSignature = parsed.signature;
      event.decode = (data, topics) => {
        return this.interface.decodeEventLog(parsed.eventFragment, data, topics);
      };
      event.args = parsed.args;
    } catch (error) {
    }
  }
};
var BaseContract = class {
  constructor(addressOrName, contractInterface, signerOrProvider) {
    logger19.checkNew(new.target, Contract);
    defineReadOnly(this, "interface", getStatic(new.target, "getInterface")(contractInterface));
    if (signerOrProvider == null) {
      defineReadOnly(this, "provider", null);
      defineReadOnly(this, "signer", null);
    } else if (Signer.isSigner(signerOrProvider)) {
      defineReadOnly(this, "provider", signerOrProvider.provider || null);
      defineReadOnly(this, "signer", signerOrProvider);
    } else if (Provider.isProvider(signerOrProvider)) {
      defineReadOnly(this, "provider", signerOrProvider);
      defineReadOnly(this, "signer", null);
    } else {
      logger19.throwArgumentError("invalid signer or provider", "signerOrProvider", signerOrProvider);
    }
    defineReadOnly(this, "callStatic", {});
    defineReadOnly(this, "estimateGas", {});
    defineReadOnly(this, "functions", {});
    defineReadOnly(this, "populateTransaction", {});
    defineReadOnly(this, "filters", {});
    {
      const uniqueFilters = {};
      Object.keys(this.interface.events).forEach((eventSignature) => {
        const event = this.interface.events[eventSignature];
        defineReadOnly(this.filters, eventSignature, (...args) => {
          return {
            address: this.address,
            topics: this.interface.encodeFilterTopics(event, args)
          };
        });
        if (!uniqueFilters[event.name]) {
          uniqueFilters[event.name] = [];
        }
        uniqueFilters[event.name].push(eventSignature);
      });
      Object.keys(uniqueFilters).forEach((name2) => {
        const filters = uniqueFilters[name2];
        if (filters.length === 1) {
          defineReadOnly(this.filters, name2, this.filters[filters[0]]);
        } else {
          logger19.warn(`Duplicate definition of ${name2} (${filters.join(", ")})`);
        }
      });
    }
    defineReadOnly(this, "_runningEvents", {});
    defineReadOnly(this, "_wrappedEmits", {});
    if (addressOrName == null) {
      logger19.throwArgumentError("invalid contract address or ENS name", "addressOrName", addressOrName);
    }
    defineReadOnly(this, "address", addressOrName);
    if (this.provider) {
      defineReadOnly(this, "resolvedAddress", resolveName(this.provider, addressOrName));
    } else {
      try {
        defineReadOnly(this, "resolvedAddress", Promise.resolve(getAddress(addressOrName)));
      } catch (error) {
        logger19.throwError("provider is required to use ENS name as contract address", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "new Contract"
        });
      }
    }
    const uniqueNames = {};
    const uniqueSignatures = {};
    Object.keys(this.interface.functions).forEach((signature2) => {
      const fragment = this.interface.functions[signature2];
      if (uniqueSignatures[signature2]) {
        logger19.warn(`Duplicate ABI entry for ${JSON.stringify(signature2)}`);
        return;
      }
      uniqueSignatures[signature2] = true;
      {
        const name2 = fragment.name;
        if (!uniqueNames[`%${name2}`]) {
          uniqueNames[`%${name2}`] = [];
        }
        uniqueNames[`%${name2}`].push(signature2);
      }
      if (this[signature2] == null) {
        defineReadOnly(this, signature2, buildDefault(this, fragment, true));
      }
      if (this.functions[signature2] == null) {
        defineReadOnly(this.functions, signature2, buildDefault(this, fragment, false));
      }
      if (this.callStatic[signature2] == null) {
        defineReadOnly(this.callStatic, signature2, buildCall(this, fragment, true));
      }
      if (this.populateTransaction[signature2] == null) {
        defineReadOnly(this.populateTransaction, signature2, buildPopulate(this, fragment));
      }
      if (this.estimateGas[signature2] == null) {
        defineReadOnly(this.estimateGas, signature2, buildEstimate(this, fragment));
      }
    });
    Object.keys(uniqueNames).forEach((name2) => {
      const signatures = uniqueNames[name2];
      if (signatures.length > 1) {
        return;
      }
      name2 = name2.substring(1);
      const signature2 = signatures[0];
      try {
        if (this[name2] == null) {
          defineReadOnly(this, name2, this[signature2]);
        }
      } catch (e3) {
      }
      if (this.functions[name2] == null) {
        defineReadOnly(this.functions, name2, this.functions[signature2]);
      }
      if (this.callStatic[name2] == null) {
        defineReadOnly(this.callStatic, name2, this.callStatic[signature2]);
      }
      if (this.populateTransaction[name2] == null) {
        defineReadOnly(this.populateTransaction, name2, this.populateTransaction[signature2]);
      }
      if (this.estimateGas[name2] == null) {
        defineReadOnly(this.estimateGas, name2, this.estimateGas[signature2]);
      }
    });
  }
  static getContractAddress(transaction) {
    return getContractAddress(transaction);
  }
  static getInterface(contractInterface) {
    if (Interface.isInterface(contractInterface)) {
      return contractInterface;
    }
    return new Interface(contractInterface);
  }
  deployed() {
    return this._deployed();
  }
  _deployed(blockTag) {
    if (!this._deployedPromise) {
      if (this.deployTransaction) {
        this._deployedPromise = this.deployTransaction.wait().then(() => {
          return this;
        });
      } else {
        this._deployedPromise = this.provider.getCode(this.address, blockTag).then((code) => {
          if (code === "0x") {
            logger19.throwError("contract not deployed", Logger.errors.UNSUPPORTED_OPERATION, {
              contractAddress: this.address,
              operation: "getDeployed"
            });
          }
          return this;
        });
      }
    }
    return this._deployedPromise;
  }
  fallback(overrides) {
    if (!this.signer) {
      logger19.throwError("sending a transactions require a signer", Logger.errors.UNSUPPORTED_OPERATION, { operation: "sendTransaction(fallback)" });
    }
    const tx = shallowCopy(overrides || {});
    ["from", "to"].forEach(function(key2) {
      if (tx[key2] == null) {
        return;
      }
      logger19.throwError("cannot override " + key2, Logger.errors.UNSUPPORTED_OPERATION, { operation: key2 });
    });
    tx.to = this.resolvedAddress;
    return this.deployed().then(() => {
      return this.signer.sendTransaction(tx);
    });
  }
  connect(signerOrProvider) {
    if (typeof signerOrProvider === "string") {
      signerOrProvider = new VoidSigner(signerOrProvider, this.provider);
    }
    const contract = new this.constructor(this.address, this.interface, signerOrProvider);
    if (this.deployTransaction) {
      defineReadOnly(contract, "deployTransaction", this.deployTransaction);
    }
    return contract;
  }
  attach(addressOrName) {
    return new this.constructor(addressOrName, this.interface, this.signer || this.provider);
  }
  static isIndexed(value) {
    return Indexed.isIndexed(value);
  }
  _normalizeRunningEvent(runningEvent) {
    if (this._runningEvents[runningEvent.tag]) {
      return this._runningEvents[runningEvent.tag];
    }
    return runningEvent;
  }
  _getRunningEvent(eventName) {
    if (typeof eventName === "string") {
      if (eventName === "error") {
        return this._normalizeRunningEvent(new ErrorRunningEvent());
      }
      if (eventName === "event") {
        return this._normalizeRunningEvent(new RunningEvent("event", null));
      }
      if (eventName === "*") {
        return this._normalizeRunningEvent(new WildcardRunningEvent(this.address, this.interface));
      }
      const fragment = this.interface.getEvent(eventName);
      return this._normalizeRunningEvent(new FragmentRunningEvent(this.address, this.interface, fragment));
    }
    if (eventName.topics && eventName.topics.length > 0) {
      try {
        const topic = eventName.topics[0];
        if (typeof topic !== "string") {
          throw new Error("invalid topic");
        }
        const fragment = this.interface.getEvent(topic);
        return this._normalizeRunningEvent(new FragmentRunningEvent(this.address, this.interface, fragment, eventName.topics));
      } catch (error) {
      }
      const filter2 = {
        address: this.address,
        topics: eventName.topics
      };
      return this._normalizeRunningEvent(new RunningEvent(getEventTag(filter2), filter2));
    }
    return this._normalizeRunningEvent(new WildcardRunningEvent(this.address, this.interface));
  }
  _checkRunningEvents(runningEvent) {
    if (runningEvent.listenerCount() === 0) {
      delete this._runningEvents[runningEvent.tag];
      const emit = this._wrappedEmits[runningEvent.tag];
      if (emit && runningEvent.filter) {
        this.provider.off(runningEvent.filter, emit);
        delete this._wrappedEmits[runningEvent.tag];
      }
    }
  }
  _wrapEvent(runningEvent, log, listener) {
    const event = deepCopy(log);
    event.removeListener = () => {
      if (!listener) {
        return;
      }
      runningEvent.removeListener(listener);
      this._checkRunningEvents(runningEvent);
    };
    event.getBlock = () => {
      return this.provider.getBlock(log.blockHash);
    };
    event.getTransaction = () => {
      return this.provider.getTransaction(log.transactionHash);
    };
    event.getTransactionReceipt = () => {
      return this.provider.getTransactionReceipt(log.transactionHash);
    };
    runningEvent.prepareEvent(event);
    return event;
  }
  _addEventListener(runningEvent, listener, once) {
    if (!this.provider) {
      logger19.throwError("events require a provider or a signer with a provider", Logger.errors.UNSUPPORTED_OPERATION, { operation: "once" });
    }
    runningEvent.addListener(listener, once);
    this._runningEvents[runningEvent.tag] = runningEvent;
    if (!this._wrappedEmits[runningEvent.tag]) {
      const wrappedEmit = (log) => {
        let event = this._wrapEvent(runningEvent, log, listener);
        if (event.decodeError == null) {
          try {
            const args = runningEvent.getEmit(event);
            this.emit(runningEvent.filter, ...args);
          } catch (error) {
            event.decodeError = error.error;
          }
        }
        if (runningEvent.filter != null) {
          this.emit("event", event);
        }
        if (event.decodeError != null) {
          this.emit("error", event.decodeError, event);
        }
      };
      this._wrappedEmits[runningEvent.tag] = wrappedEmit;
      if (runningEvent.filter != null) {
        this.provider.on(runningEvent.filter, wrappedEmit);
      }
    }
  }
  queryFilter(event, fromBlockOrBlockhash, toBlock) {
    const runningEvent = this._getRunningEvent(event);
    const filter2 = shallowCopy(runningEvent.filter);
    if (typeof fromBlockOrBlockhash === "string" && isHexString(fromBlockOrBlockhash, 32)) {
      if (toBlock != null) {
        logger19.throwArgumentError("cannot specify toBlock with blockhash", "toBlock", toBlock);
      }
      filter2.blockHash = fromBlockOrBlockhash;
    } else {
      filter2.fromBlock = fromBlockOrBlockhash != null ? fromBlockOrBlockhash : 0;
      filter2.toBlock = toBlock != null ? toBlock : "latest";
    }
    return this.provider.getLogs(filter2).then((logs) => {
      return logs.map((log) => this._wrapEvent(runningEvent, log, null));
    });
  }
  on(event, listener) {
    this._addEventListener(this._getRunningEvent(event), listener, false);
    return this;
  }
  once(event, listener) {
    this._addEventListener(this._getRunningEvent(event), listener, true);
    return this;
  }
  emit(eventName, ...args) {
    if (!this.provider) {
      return false;
    }
    const runningEvent = this._getRunningEvent(eventName);
    const result = runningEvent.run(args) > 0;
    this._checkRunningEvents(runningEvent);
    return result;
  }
  listenerCount(eventName) {
    if (!this.provider) {
      return 0;
    }
    if (eventName == null) {
      return Object.keys(this._runningEvents).reduce((accum, key2) => {
        return accum + this._runningEvents[key2].listenerCount();
      }, 0);
    }
    return this._getRunningEvent(eventName).listenerCount();
  }
  listeners(eventName) {
    if (!this.provider) {
      return [];
    }
    if (eventName == null) {
      const result = [];
      for (let tag in this._runningEvents) {
        this._runningEvents[tag].listeners().forEach((listener) => {
          result.push(listener);
        });
      }
      return result;
    }
    return this._getRunningEvent(eventName).listeners();
  }
  removeAllListeners(eventName) {
    if (!this.provider) {
      return this;
    }
    if (eventName == null) {
      for (const tag in this._runningEvents) {
        const runningEvent2 = this._runningEvents[tag];
        runningEvent2.removeAllListeners();
        this._checkRunningEvents(runningEvent2);
      }
      return this;
    }
    const runningEvent = this._getRunningEvent(eventName);
    runningEvent.removeAllListeners();
    this._checkRunningEvents(runningEvent);
    return this;
  }
  off(eventName, listener) {
    if (!this.provider) {
      return this;
    }
    const runningEvent = this._getRunningEvent(eventName);
    runningEvent.removeListener(listener);
    this._checkRunningEvents(runningEvent);
    return this;
  }
  removeListener(eventName, listener) {
    return this.off(eventName, listener);
  }
};
var Contract = class extends BaseContract {
};
var ContractFactory = class {
  constructor(contractInterface, bytecode, signer) {
    let bytecodeHex = null;
    if (typeof bytecode === "string") {
      bytecodeHex = bytecode;
    } else if (isBytes(bytecode)) {
      bytecodeHex = hexlify(bytecode);
    } else if (bytecode && typeof bytecode.object === "string") {
      bytecodeHex = bytecode.object;
    } else {
      bytecodeHex = "!";
    }
    if (bytecodeHex.substring(0, 2) !== "0x") {
      bytecodeHex = "0x" + bytecodeHex;
    }
    if (!isHexString(bytecodeHex) || bytecodeHex.length % 2) {
      logger19.throwArgumentError("invalid bytecode", "bytecode", bytecode);
    }
    if (signer && !Signer.isSigner(signer)) {
      logger19.throwArgumentError("invalid signer", "signer", signer);
    }
    defineReadOnly(this, "bytecode", bytecodeHex);
    defineReadOnly(this, "interface", getStatic(new.target, "getInterface")(contractInterface));
    defineReadOnly(this, "signer", signer || null);
  }
  getDeployTransaction(...args) {
    let tx = {};
    if (args.length === this.interface.deploy.inputs.length + 1 && typeof args[args.length - 1] === "object") {
      tx = shallowCopy(args.pop());
      for (const key2 in tx) {
        if (!allowedTransactionKeys3[key2]) {
          throw new Error("unknown transaction override " + key2);
        }
      }
    }
    ["data", "from", "to"].forEach((key2) => {
      if (tx[key2] == null) {
        return;
      }
      logger19.throwError("cannot override " + key2, Logger.errors.UNSUPPORTED_OPERATION, { operation: key2 });
    });
    if (tx.value) {
      const value = BigNumber.from(tx.value);
      if (!value.isZero() && !this.interface.deploy.payable) {
        logger19.throwError("non-payable constructor cannot override value", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "overrides.value",
          value: tx.value
        });
      }
    }
    logger19.checkArgumentCount(args.length, this.interface.deploy.inputs.length, " in Contract constructor");
    tx.data = hexlify(concat([
      this.bytecode,
      this.interface.encodeDeploy(args)
    ]));
    return tx;
  }
  deploy(...args) {
    return __awaiter5(this, void 0, void 0, function* () {
      let overrides = {};
      if (args.length === this.interface.deploy.inputs.length + 1) {
        overrides = args.pop();
      }
      logger19.checkArgumentCount(args.length, this.interface.deploy.inputs.length, " in Contract constructor");
      const params = yield resolveAddresses(this.signer, args, this.interface.deploy.inputs);
      params.push(overrides);
      const unsignedTx = this.getDeployTransaction(...params);
      const tx = yield this.signer.sendTransaction(unsignedTx);
      const address = getStatic(this.constructor, "getContractAddress")(tx);
      const contract = getStatic(this.constructor, "getContract")(address, this.interface, this.signer);
      addContractWait(contract, tx);
      defineReadOnly(contract, "deployTransaction", tx);
      return contract;
    });
  }
  attach(address) {
    return this.constructor.getContract(address, this.interface, this.signer);
  }
  connect(signer) {
    return new this.constructor(this.interface, this.bytecode, signer);
  }
  static fromSolidity(compilerOutput, signer) {
    if (compilerOutput == null) {
      logger19.throwError("missing compiler output", Logger.errors.MISSING_ARGUMENT, { argument: "compilerOutput" });
    }
    if (typeof compilerOutput === "string") {
      compilerOutput = JSON.parse(compilerOutput);
    }
    const abi = compilerOutput.abi;
    let bytecode = null;
    if (compilerOutput.bytecode) {
      bytecode = compilerOutput.bytecode;
    } else if (compilerOutput.evm && compilerOutput.evm.bytecode) {
      bytecode = compilerOutput.evm.bytecode;
    }
    return new this(abi, bytecode, signer);
  }
  static getInterface(contractInterface) {
    return Contract.getInterface(contractInterface);
  }
  static getContractAddress(tx) {
    return getContractAddress(tx);
  }
  static getContract(address, contractInterface, signer) {
    return new Contract(address, contractInterface, signer);
  }
};

// node_modules/@ethersproject/basex/lib.esm/index.js
var BaseX = class {
  constructor(alphabet) {
    defineReadOnly(this, "alphabet", alphabet);
    defineReadOnly(this, "base", alphabet.length);
    defineReadOnly(this, "_alphabetMap", {});
    defineReadOnly(this, "_leader", alphabet.charAt(0));
    for (let i3 = 0; i3 < alphabet.length; i3++) {
      this._alphabetMap[alphabet.charAt(i3)] = i3;
    }
  }
  encode(value) {
    let source = arrayify(value);
    if (source.length === 0) {
      return "";
    }
    let digits = [0];
    for (let i3 = 0; i3 < source.length; ++i3) {
      let carry = source[i3];
      for (let j3 = 0; j3 < digits.length; ++j3) {
        carry += digits[j3] << 8;
        digits[j3] = carry % this.base;
        carry = carry / this.base | 0;
      }
      while (carry > 0) {
        digits.push(carry % this.base);
        carry = carry / this.base | 0;
      }
    }
    let string = "";
    for (let k3 = 0; source[k3] === 0 && k3 < source.length - 1; ++k3) {
      string += this._leader;
    }
    for (let q = digits.length - 1; q >= 0; --q) {
      string += this.alphabet[digits[q]];
    }
    return string;
  }
  decode(value) {
    if (typeof value !== "string") {
      throw new TypeError("Expected String");
    }
    let bytes = [];
    if (value.length === 0) {
      return new Uint8Array(bytes);
    }
    bytes.push(0);
    for (let i3 = 0; i3 < value.length; i3++) {
      let byte = this._alphabetMap[value[i3]];
      if (byte === void 0) {
        throw new Error("Non-base" + this.base + " character");
      }
      let carry = byte;
      for (let j3 = 0; j3 < bytes.length; ++j3) {
        carry += bytes[j3] * this.base;
        bytes[j3] = carry & 255;
        carry >>= 8;
      }
      while (carry > 0) {
        bytes.push(carry & 255);
        carry >>= 8;
      }
    }
    for (let k3 = 0; value[k3] === this._leader && k3 < value.length - 1; ++k3) {
      bytes.push(0);
    }
    return arrayify(new Uint8Array(bytes.reverse()));
  }
};
var Base32 = new BaseX("abcdefghijklmnopqrstuvwxyz234567");
var Base58 = new BaseX("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");

// node_modules/@ethersproject/sha2/lib.esm/sha2.js
var import_hash3 = __toModule(require_hash());

// node_modules/@ethersproject/sha2/lib.esm/types.js
var SupportedAlgorithm;
(function(SupportedAlgorithm2) {
  SupportedAlgorithm2["sha256"] = "sha256";
  SupportedAlgorithm2["sha512"] = "sha512";
})(SupportedAlgorithm || (SupportedAlgorithm = {}));

// node_modules/@ethersproject/sha2/lib.esm/_version.js
var version15 = "sha2/5.5.0";

// node_modules/@ethersproject/sha2/lib.esm/sha2.js
"use strict";
var logger20 = new Logger(version15);
function ripemd160(data) {
  return "0x" + import_hash3.default.ripemd160().update(arrayify(data)).digest("hex");
}
function sha256(data) {
  return "0x" + import_hash3.default.sha256().update(arrayify(data)).digest("hex");
}
function sha512(data) {
  return "0x" + import_hash3.default.sha512().update(arrayify(data)).digest("hex");
}
function computeHmac(algorithm, key2, data) {
  if (!SupportedAlgorithm[algorithm]) {
    logger20.throwError("unsupported algorithm " + algorithm, Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "hmac",
      algorithm
    });
  }
  return "0x" + import_hash3.default.hmac(import_hash3.default[algorithm], arrayify(key2)).update(arrayify(data)).digest("hex");
}

// node_modules/@ethersproject/pbkdf2/lib.esm/pbkdf2.js
"use strict";
function pbkdf2(password, salt, iterations, keylen, hashAlgorithm) {
  password = arrayify(password);
  salt = arrayify(salt);
  let hLen;
  let l3 = 1;
  const DK = new Uint8Array(keylen);
  const block1 = new Uint8Array(salt.length + 4);
  block1.set(salt);
  let r3;
  let T3;
  for (let i3 = 1; i3 <= l3; i3++) {
    block1[salt.length] = i3 >> 24 & 255;
    block1[salt.length + 1] = i3 >> 16 & 255;
    block1[salt.length + 2] = i3 >> 8 & 255;
    block1[salt.length + 3] = i3 & 255;
    let U = arrayify(computeHmac(hashAlgorithm, password, block1));
    if (!hLen) {
      hLen = U.length;
      T3 = new Uint8Array(hLen);
      l3 = Math.ceil(keylen / hLen);
      r3 = keylen - (l3 - 1) * hLen;
    }
    T3.set(U);
    for (let j3 = 1; j3 < iterations; j3++) {
      U = arrayify(computeHmac(hashAlgorithm, password, U));
      for (let k3 = 0; k3 < hLen; k3++)
        T3[k3] ^= U[k3];
    }
    const destPos = (i3 - 1) * hLen;
    const len = i3 === l3 ? r3 : hLen;
    DK.set(arrayify(T3).slice(0, len), destPos);
  }
  return hexlify(DK);
}

// node_modules/@ethersproject/wordlists/lib.esm/_version.js
var version16 = "wordlists/5.5.0";

// node_modules/@ethersproject/wordlists/lib.esm/wordlist.js
"use strict";
var exportWordlist = false;
var logger21 = new Logger(version16);
var Wordlist = class {
  constructor(locale) {
    logger21.checkAbstract(new.target, Wordlist);
    defineReadOnly(this, "locale", locale);
  }
  split(mnemonic) {
    return mnemonic.toLowerCase().split(/ +/g);
  }
  join(words2) {
    return words2.join(" ");
  }
  static check(wordlist2) {
    const words2 = [];
    for (let i3 = 0; i3 < 2048; i3++) {
      const word = wordlist2.getWord(i3);
      if (i3 !== wordlist2.getWordIndex(word)) {
        return "0x";
      }
      words2.push(word);
    }
    return id(words2.join("\n") + "\n");
  }
  static register(lang, name2) {
    if (!name2) {
      name2 = lang.locale;
    }
    if (exportWordlist) {
      try {
        const anyGlobal2 = window;
        if (anyGlobal2._ethers && anyGlobal2._ethers.wordlists) {
          if (!anyGlobal2._ethers.wordlists[name2]) {
            defineReadOnly(anyGlobal2._ethers.wordlists, name2, lang);
          }
        }
      } catch (error) {
      }
    }
  }
};

// node_modules/@ethersproject/wordlists/lib.esm/lang-en.js
"use strict";
var words = "AbandonAbilityAbleAboutAboveAbsentAbsorbAbstractAbsurdAbuseAccessAccidentAccountAccuseAchieveAcidAcousticAcquireAcrossActActionActorActressActualAdaptAddAddictAddressAdjustAdmitAdultAdvanceAdviceAerobicAffairAffordAfraidAgainAgeAgentAgreeAheadAimAirAirportAisleAlarmAlbumAlcoholAlertAlienAllAlleyAllowAlmostAloneAlphaAlreadyAlsoAlterAlwaysAmateurAmazingAmongAmountAmusedAnalystAnchorAncientAngerAngleAngryAnimalAnkleAnnounceAnnualAnotherAnswerAntennaAntiqueAnxietyAnyApartApologyAppearAppleApproveAprilArchArcticAreaArenaArgueArmArmedArmorArmyAroundArrangeArrestArriveArrowArtArtefactArtistArtworkAskAspectAssaultAssetAssistAssumeAsthmaAthleteAtomAttackAttendAttitudeAttractAuctionAuditAugustAuntAuthorAutoAutumnAverageAvocadoAvoidAwakeAwareAwayAwesomeAwfulAwkwardAxisBabyBachelorBaconBadgeBagBalanceBalconyBallBambooBananaBannerBarBarelyBargainBarrelBaseBasicBasketBattleBeachBeanBeautyBecauseBecomeBeefBeforeBeginBehaveBehindBelieveBelowBeltBenchBenefitBestBetrayBetterBetweenBeyondBicycleBidBikeBindBiologyBirdBirthBitterBlackBladeBlameBlanketBlastBleakBlessBlindBloodBlossomBlouseBlueBlurBlushBoardBoatBodyBoilBombBoneBonusBookBoostBorderBoringBorrowBossBottomBounceBoxBoyBracketBrainBrandBrassBraveBreadBreezeBrickBridgeBriefBrightBringBriskBroccoliBrokenBronzeBroomBrotherBrownBrushBubbleBuddyBudgetBuffaloBuildBulbBulkBulletBundleBunkerBurdenBurgerBurstBusBusinessBusyButterBuyerBuzzCabbageCabinCableCactusCageCakeCallCalmCameraCampCanCanalCancelCandyCannonCanoeCanvasCanyonCapableCapitalCaptainCarCarbonCardCargoCarpetCarryCartCaseCashCasinoCastleCasualCatCatalogCatchCategoryCattleCaughtCauseCautionCaveCeilingCeleryCementCensusCenturyCerealCertainChairChalkChampionChangeChaosChapterChargeChaseChatCheapCheckCheeseChefCherryChestChickenChiefChildChimneyChoiceChooseChronicChuckleChunkChurnCigarCinnamonCircleCitizenCityCivilClaimClapClarifyClawClayCleanClerkCleverClickClientCliffClimbClinicClipClockClogCloseClothCloudClownClubClumpClusterClutchCoachCoastCoconutCodeCoffeeCoilCoinCollectColorColumnCombineComeComfortComicCommonCompanyConcertConductConfirmCongressConnectConsiderControlConvinceCookCoolCopperCopyCoralCoreCornCorrectCostCottonCouchCountryCoupleCourseCousinCoverCoyoteCrackCradleCraftCramCraneCrashCraterCrawlCrazyCreamCreditCreekCrewCricketCrimeCrispCriticCropCrossCrouchCrowdCrucialCruelCruiseCrumbleCrunchCrushCryCrystalCubeCultureCupCupboardCuriousCurrentCurtainCurveCushionCustomCuteCycleDadDamageDampDanceDangerDaringDashDaughterDawnDayDealDebateDebrisDecadeDecemberDecideDeclineDecorateDecreaseDeerDefenseDefineDefyDegreeDelayDeliverDemandDemiseDenialDentistDenyDepartDependDepositDepthDeputyDeriveDescribeDesertDesignDeskDespairDestroyDetailDetectDevelopDeviceDevoteDiagramDialDiamondDiaryDiceDieselDietDifferDigitalDignityDilemmaDinnerDinosaurDirectDirtDisagreeDiscoverDiseaseDishDismissDisorderDisplayDistanceDivertDivideDivorceDizzyDoctorDocumentDogDollDolphinDomainDonateDonkeyDonorDoorDoseDoubleDoveDraftDragonDramaDrasticDrawDreamDressDriftDrillDrinkDripDriveDropDrumDryDuckDumbDuneDuringDustDutchDutyDwarfDynamicEagerEagleEarlyEarnEarthEasilyEastEasyEchoEcologyEconomyEdgeEditEducateEffortEggEightEitherElbowElderElectricElegantElementElephantElevatorEliteElseEmbarkEmbodyEmbraceEmergeEmotionEmployEmpowerEmptyEnableEnactEndEndlessEndorseEnemyEnergyEnforceEngageEngineEnhanceEnjoyEnlistEnoughEnrichEnrollEnsureEnterEntireEntryEnvelopeEpisodeEqualEquipEraEraseErodeErosionErrorEruptEscapeEssayEssenceEstateEternalEthicsEvidenceEvilEvokeEvolveExactExampleExcessExchangeExciteExcludeExcuseExecuteExerciseExhaustExhibitExileExistExitExoticExpandExpectExpireExplainExposeExpressExtendExtraEyeEyebrowFabricFaceFacultyFadeFaintFaithFallFalseFameFamilyFamousFanFancyFantasyFarmFashionFatFatalFatherFatigueFaultFavoriteFeatureFebruaryFederalFeeFeedFeelFemaleFenceFestivalFetchFeverFewFiberFictionFieldFigureFileFilmFilterFinalFindFineFingerFinishFireFirmFirstFiscalFishFitFitnessFixFlagFlameFlashFlatFlavorFleeFlightFlipFloatFlockFloorFlowerFluidFlushFlyFoamFocusFogFoilFoldFollowFoodFootForceForestForgetForkFortuneForumForwardFossilFosterFoundFoxFragileFrameFrequentFreshFriendFringeFrogFrontFrostFrownFrozenFruitFuelFunFunnyFurnaceFuryFutureGadgetGainGalaxyGalleryGameGapGarageGarbageGardenGarlicGarmentGasGaspGateGatherGaugeGazeGeneralGeniusGenreGentleGenuineGestureGhostGiantGiftGiggleGingerGiraffeGirlGiveGladGlanceGlareGlassGlideGlimpseGlobeGloomGloryGloveGlowGlueGoatGoddessGoldGoodGooseGorillaGospelGossipGovernGownGrabGraceGrainGrantGrapeGrassGravityGreatGreenGridGriefGritGroceryGroupGrowGruntGuardGuessGuideGuiltGuitarGunGymHabitHairHalfHammerHamsterHandHappyHarborHardHarshHarvestHatHaveHawkHazardHeadHealthHeartHeavyHedgehogHeightHelloHelmetHelpHenHeroHiddenHighHillHintHipHireHistoryHobbyHockeyHoldHoleHolidayHollowHomeHoneyHoodHopeHornHorrorHorseHospitalHostHotelHourHoverHubHugeHumanHumbleHumorHundredHungryHuntHurdleHurryHurtHusbandHybridIceIconIdeaIdentifyIdleIgnoreIllIllegalIllnessImageImitateImmenseImmuneImpactImposeImproveImpulseInchIncludeIncomeIncreaseIndexIndicateIndoorIndustryInfantInflictInformInhaleInheritInitialInjectInjuryInmateInnerInnocentInputInquiryInsaneInsectInsideInspireInstallIntactInterestIntoInvestInviteInvolveIronIslandIsolateIssueItemIvoryJacketJaguarJarJazzJealousJeansJellyJewelJobJoinJokeJourneyJoyJudgeJuiceJumpJungleJuniorJunkJustKangarooKeenKeepKetchupKeyKickKidKidneyKindKingdomKissKitKitchenKiteKittenKiwiKneeKnifeKnockKnowLabLabelLaborLadderLadyLakeLampLanguageLaptopLargeLaterLatinLaughLaundryLavaLawLawnLawsuitLayerLazyLeaderLeafLearnLeaveLectureLeftLegLegalLegendLeisureLemonLendLengthLensLeopardLessonLetterLevelLiarLibertyLibraryLicenseLifeLiftLightLikeLimbLimitLinkLionLiquidListLittleLiveLizardLoadLoanLobsterLocalLockLogicLonelyLongLoopLotteryLoudLoungeLoveLoyalLuckyLuggageLumberLunarLunchLuxuryLyricsMachineMadMagicMagnetMaidMailMainMajorMakeMammalManManageMandateMangoMansionManualMapleMarbleMarchMarginMarineMarketMarriageMaskMassMasterMatchMaterialMathMatrixMatterMaximumMazeMeadowMeanMeasureMeatMechanicMedalMediaMelodyMeltMemberMemoryMentionMenuMercyMergeMeritMerryMeshMessageMetalMethodMiddleMidnightMilkMillionMimicMindMinimumMinorMinuteMiracleMirrorMiseryMissMistakeMixMixedMixtureMobileModelModifyMomMomentMonitorMonkeyMonsterMonthMoonMoralMoreMorningMosquitoMotherMotionMotorMountainMouseMoveMovieMuchMuffinMuleMultiplyMuscleMuseumMushroomMusicMustMutualMyselfMysteryMythNaiveNameNapkinNarrowNastyNationNatureNearNeckNeedNegativeNeglectNeitherNephewNerveNestNetNetworkNeutralNeverNewsNextNiceNightNobleNoiseNomineeNoodleNormalNorthNoseNotableNoteNothingNoticeNovelNowNuclearNumberNurseNutOakObeyObjectObligeObscureObserveObtainObviousOccurOceanOctoberOdorOffOfferOfficeOftenOilOkayOldOliveOlympicOmitOnceOneOnionOnlineOnlyOpenOperaOpinionOpposeOptionOrangeOrbitOrchardOrderOrdinaryOrganOrientOriginalOrphanOstrichOtherOutdoorOuterOutputOutsideOvalOvenOverOwnOwnerOxygenOysterOzonePactPaddlePagePairPalacePalmPandaPanelPanicPantherPaperParadeParentParkParrotPartyPassPatchPathPatientPatrolPatternPausePavePaymentPeacePeanutPearPeasantPelicanPenPenaltyPencilPeoplePepperPerfectPermitPersonPetPhonePhotoPhrasePhysicalPianoPicnicPicturePiecePigPigeonPillPilotPinkPioneerPipePistolPitchPizzaPlacePlanetPlasticPlatePlayPleasePledgePluckPlugPlungePoemPoetPointPolarPolePolicePondPonyPoolPopularPortionPositionPossiblePostPotatoPotteryPovertyPowderPowerPracticePraisePredictPreferPreparePresentPrettyPreventPricePridePrimaryPrintPriorityPrisonPrivatePrizeProblemProcessProduceProfitProgramProjectPromoteProofPropertyProsperProtectProudProvidePublicPuddingPullPulpPulsePumpkinPunchPupilPuppyPurchasePurityPurposePursePushPutPuzzlePyramidQualityQuantumQuarterQuestionQuickQuitQuizQuoteRabbitRaccoonRaceRackRadarRadioRailRainRaiseRallyRampRanchRandomRangeRapidRareRateRatherRavenRawRazorReadyRealReasonRebelRebuildRecallReceiveRecipeRecordRecycleReduceReflectReformRefuseRegionRegretRegularRejectRelaxReleaseReliefRelyRemainRememberRemindRemoveRenderRenewRentReopenRepairRepeatReplaceReportRequireRescueResembleResistResourceResponseResultRetireRetreatReturnReunionRevealReviewRewardRhythmRibRibbonRiceRichRideRidgeRifleRightRigidRingRiotRippleRiskRitualRivalRiverRoadRoastRobotRobustRocketRomanceRoofRookieRoomRoseRotateRoughRoundRouteRoyalRubberRudeRugRuleRunRunwayRuralSadSaddleSadnessSafeSailSaladSalmonSalonSaltSaluteSameSampleSandSatisfySatoshiSauceSausageSaveSayScaleScanScareScatterSceneSchemeSchoolScienceScissorsScorpionScoutScrapScreenScriptScrubSeaSearchSeasonSeatSecondSecretSectionSecuritySeedSeekSegmentSelectSellSeminarSeniorSenseSentenceSeriesServiceSessionSettleSetupSevenShadowShaftShallowShareShedShellSheriffShieldShiftShineShipShiverShockShoeShootShopShortShoulderShoveShrimpShrugShuffleShySiblingSickSideSiegeSightSignSilentSilkSillySilverSimilarSimpleSinceSingSirenSisterSituateSixSizeSkateSketchSkiSkillSkinSkirtSkullSlabSlamSleepSlenderSliceSlideSlightSlimSloganSlotSlowSlushSmallSmartSmileSmokeSmoothSnackSnakeSnapSniffSnowSoapSoccerSocialSockSodaSoftSolarSoldierSolidSolutionSolveSomeoneSongSoonSorrySortSoulSoundSoupSourceSouthSpaceSpareSpatialSpawnSpeakSpecialSpeedSpellSpendSphereSpiceSpiderSpikeSpinSpiritSplitSpoilSponsorSpoonSportSpotSpraySpreadSpringSpySquareSqueezeSquirrelStableStadiumStaffStageStairsStampStandStartStateStaySteakSteelStemStepStereoStickStillStingStockStomachStoneStoolStoryStoveStrategyStreetStrikeStrongStruggleStudentStuffStumbleStyleSubjectSubmitSubwaySuccessSuchSuddenSufferSugarSuggestSuitSummerSunSunnySunsetSuperSupplySupremeSureSurfaceSurgeSurpriseSurroundSurveySuspectSustainSwallowSwampSwapSwarmSwearSweetSwiftSwimSwingSwitchSwordSymbolSymptomSyrupSystemTableTackleTagTailTalentTalkTankTapeTargetTaskTasteTattooTaxiTeachTeamTellTenTenantTennisTentTermTestTextThankThatThemeThenTheoryThereTheyThingThisThoughtThreeThriveThrowThumbThunderTicketTideTigerTiltTimberTimeTinyTipTiredTissueTitleToastTobaccoTodayToddlerToeTogetherToiletTokenTomatoTomorrowToneTongueTonightToolToothTopTopicToppleTorchTornadoTortoiseTossTotalTouristTowardTowerTownToyTrackTradeTrafficTragicTrainTransferTrapTrashTravelTrayTreatTreeTrendTrialTribeTrickTriggerTrimTripTrophyTroubleTruckTrueTrulyTrumpetTrustTruthTryTubeTuitionTumbleTunaTunnelTurkeyTurnTurtleTwelveTwentyTwiceTwinTwistTwoTypeTypicalUglyUmbrellaUnableUnawareUncleUncoverUnderUndoUnfairUnfoldUnhappyUniformUniqueUnitUniverseUnknownUnlockUntilUnusualUnveilUpdateUpgradeUpholdUponUpperUpsetUrbanUrgeUsageUseUsedUsefulUselessUsualUtilityVacantVacuumVagueValidValleyValveVanVanishVaporVariousVastVaultVehicleVelvetVendorVentureVenueVerbVerifyVersionVeryVesselVeteranViableVibrantViciousVictoryVideoViewVillageVintageViolinVirtualVirusVisaVisitVisualVitalVividVocalVoiceVoidVolcanoVolumeVoteVoyageWageWagonWaitWalkWallWalnutWantWarfareWarmWarriorWashWaspWasteWaterWaveWayWealthWeaponWearWeaselWeatherWebWeddingWeekendWeirdWelcomeWestWetWhaleWhatWheatWheelWhenWhereWhipWhisperWideWidthWifeWildWillWinWindowWineWingWinkWinnerWinterWireWisdomWiseWishWitnessWolfWomanWonderWoodWoolWordWorkWorldWorryWorthWrapWreckWrestleWristWriteWrongYardYearYellowYouYoungYouthZebraZeroZoneZoo";
var wordlist = null;
function loadWords(lang) {
  if (wordlist != null) {
    return;
  }
  wordlist = words.replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" ");
  if (Wordlist.check(lang) !== "0x3c8acc1e7b08d8e76f9fda015ef48dc8c710a73cb7e0f77b2c18a9b5a7adde60") {
    wordlist = null;
    throw new Error("BIP39 Wordlist for en (English) FAILED");
  }
}
var LangEn = class extends Wordlist {
  constructor() {
    super("en");
  }
  getWord(index) {
    loadWords(this);
    return wordlist[index];
  }
  getWordIndex(word) {
    loadWords(this);
    return wordlist.indexOf(word);
  }
};
var langEn = new LangEn();
Wordlist.register(langEn);

// node_modules/@ethersproject/wordlists/lib.esm/wordlists.js
"use strict";
var wordlists = {
  en: langEn
};

// node_modules/@ethersproject/wordlists/lib.esm/index.js
"use strict";

// node_modules/@ethersproject/hdnode/lib.esm/_version.js
var version17 = "hdnode/5.5.0";

// node_modules/@ethersproject/hdnode/lib.esm/index.js
"use strict";
var logger22 = new Logger(version17);
var N2 = BigNumber.from("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
var MasterSecret = toUtf8Bytes("Bitcoin seed");
var HardenedBit = 2147483648;
function getUpperMask(bits) {
  return (1 << bits) - 1 << 8 - bits;
}
function getLowerMask(bits) {
  return (1 << bits) - 1;
}
function bytes32(value) {
  return hexZeroPad(hexlify(value), 32);
}
function base58check(data) {
  return Base58.encode(concat([data, hexDataSlice(sha256(sha256(data)), 0, 4)]));
}
function getWordlist(wordlist2) {
  if (wordlist2 == null) {
    return wordlists["en"];
  }
  if (typeof wordlist2 === "string") {
    const words2 = wordlists[wordlist2];
    if (words2 == null) {
      logger22.throwArgumentError("unknown locale", "wordlist", wordlist2);
    }
    return words2;
  }
  return wordlist2;
}
var _constructorGuard4 = {};
var defaultPath = "m/44'/60'/0'/0/0";
var HDNode = class {
  constructor(constructorGuard, privateKey, publicKey, parentFingerprint, chainCode, index, depth, mnemonicOrPath) {
    logger22.checkNew(new.target, HDNode);
    if (constructorGuard !== _constructorGuard4) {
      throw new Error("HDNode constructor cannot be called directly");
    }
    if (privateKey) {
      const signingKey = new SigningKey(privateKey);
      defineReadOnly(this, "privateKey", signingKey.privateKey);
      defineReadOnly(this, "publicKey", signingKey.compressedPublicKey);
    } else {
      defineReadOnly(this, "privateKey", null);
      defineReadOnly(this, "publicKey", hexlify(publicKey));
    }
    defineReadOnly(this, "parentFingerprint", parentFingerprint);
    defineReadOnly(this, "fingerprint", hexDataSlice(ripemd160(sha256(this.publicKey)), 0, 4));
    defineReadOnly(this, "address", computeAddress(this.publicKey));
    defineReadOnly(this, "chainCode", chainCode);
    defineReadOnly(this, "index", index);
    defineReadOnly(this, "depth", depth);
    if (mnemonicOrPath == null) {
      defineReadOnly(this, "mnemonic", null);
      defineReadOnly(this, "path", null);
    } else if (typeof mnemonicOrPath === "string") {
      defineReadOnly(this, "mnemonic", null);
      defineReadOnly(this, "path", mnemonicOrPath);
    } else {
      defineReadOnly(this, "mnemonic", mnemonicOrPath);
      defineReadOnly(this, "path", mnemonicOrPath.path);
    }
  }
  get extendedKey() {
    if (this.depth >= 256) {
      throw new Error("Depth too large!");
    }
    return base58check(concat([
      this.privateKey != null ? "0x0488ADE4" : "0x0488B21E",
      hexlify(this.depth),
      this.parentFingerprint,
      hexZeroPad(hexlify(this.index), 4),
      this.chainCode,
      this.privateKey != null ? concat(["0x00", this.privateKey]) : this.publicKey
    ]));
  }
  neuter() {
    return new HDNode(_constructorGuard4, null, this.publicKey, this.parentFingerprint, this.chainCode, this.index, this.depth, this.path);
  }
  _derive(index) {
    if (index > 4294967295) {
      throw new Error("invalid index - " + String(index));
    }
    let path = this.path;
    if (path) {
      path += "/" + (index & ~HardenedBit);
    }
    const data = new Uint8Array(37);
    if (index & HardenedBit) {
      if (!this.privateKey) {
        throw new Error("cannot derive child of neutered node");
      }
      data.set(arrayify(this.privateKey), 1);
      if (path) {
        path += "'";
      }
    } else {
      data.set(arrayify(this.publicKey));
    }
    for (let i3 = 24; i3 >= 0; i3 -= 8) {
      data[33 + (i3 >> 3)] = index >> 24 - i3 & 255;
    }
    const I2 = arrayify(computeHmac(SupportedAlgorithm.sha512, this.chainCode, data));
    const IL = I2.slice(0, 32);
    const IR = I2.slice(32);
    let ki = null;
    let Ki = null;
    if (this.privateKey) {
      ki = bytes32(BigNumber.from(IL).add(this.privateKey).mod(N2));
    } else {
      const ek = new SigningKey(hexlify(IL));
      Ki = ek._addPoint(this.publicKey);
    }
    let mnemonicOrPath = path;
    const srcMnemonic = this.mnemonic;
    if (srcMnemonic) {
      mnemonicOrPath = Object.freeze({
        phrase: srcMnemonic.phrase,
        path,
        locale: srcMnemonic.locale || "en"
      });
    }
    return new HDNode(_constructorGuard4, ki, Ki, this.fingerprint, bytes32(IR), index, this.depth + 1, mnemonicOrPath);
  }
  derivePath(path) {
    const components = path.split("/");
    if (components.length === 0 || components[0] === "m" && this.depth !== 0) {
      throw new Error("invalid path - " + path);
    }
    if (components[0] === "m") {
      components.shift();
    }
    let result = this;
    for (let i3 = 0; i3 < components.length; i3++) {
      const component = components[i3];
      if (component.match(/^[0-9]+'$/)) {
        const index = parseInt(component.substring(0, component.length - 1));
        if (index >= HardenedBit) {
          throw new Error("invalid path index - " + component);
        }
        result = result._derive(HardenedBit + index);
      } else if (component.match(/^[0-9]+$/)) {
        const index = parseInt(component);
        if (index >= HardenedBit) {
          throw new Error("invalid path index - " + component);
        }
        result = result._derive(index);
      } else {
        throw new Error("invalid path component - " + component);
      }
    }
    return result;
  }
  static _fromSeed(seed, mnemonic) {
    const seedArray = arrayify(seed);
    if (seedArray.length < 16 || seedArray.length > 64) {
      throw new Error("invalid seed");
    }
    const I2 = arrayify(computeHmac(SupportedAlgorithm.sha512, MasterSecret, seedArray));
    return new HDNode(_constructorGuard4, bytes32(I2.slice(0, 32)), null, "0x00000000", bytes32(I2.slice(32)), 0, 0, mnemonic);
  }
  static fromMnemonic(mnemonic, password, wordlist2) {
    wordlist2 = getWordlist(wordlist2);
    mnemonic = entropyToMnemonic(mnemonicToEntropy(mnemonic, wordlist2), wordlist2);
    return HDNode._fromSeed(mnemonicToSeed(mnemonic, password), {
      phrase: mnemonic,
      path: "m",
      locale: wordlist2.locale
    });
  }
  static fromSeed(seed) {
    return HDNode._fromSeed(seed, null);
  }
  static fromExtendedKey(extendedKey) {
    const bytes = Base58.decode(extendedKey);
    if (bytes.length !== 82 || base58check(bytes.slice(0, 78)) !== extendedKey) {
      logger22.throwArgumentError("invalid extended key", "extendedKey", "[REDACTED]");
    }
    const depth = bytes[4];
    const parentFingerprint = hexlify(bytes.slice(5, 9));
    const index = parseInt(hexlify(bytes.slice(9, 13)).substring(2), 16);
    const chainCode = hexlify(bytes.slice(13, 45));
    const key2 = bytes.slice(45, 78);
    switch (hexlify(bytes.slice(0, 4))) {
      case "0x0488b21e":
      case "0x043587cf":
        return new HDNode(_constructorGuard4, null, hexlify(key2), parentFingerprint, chainCode, index, depth, null);
      case "0x0488ade4":
      case "0x04358394 ":
        if (key2[0] !== 0) {
          break;
        }
        return new HDNode(_constructorGuard4, hexlify(key2.slice(1)), null, parentFingerprint, chainCode, index, depth, null);
    }
    return logger22.throwArgumentError("invalid extended key", "extendedKey", "[REDACTED]");
  }
};
function mnemonicToSeed(mnemonic, password) {
  if (!password) {
    password = "";
  }
  const salt = toUtf8Bytes("mnemonic" + password, UnicodeNormalizationForm.NFKD);
  return pbkdf2(toUtf8Bytes(mnemonic, UnicodeNormalizationForm.NFKD), salt, 2048, 64, "sha512");
}
function mnemonicToEntropy(mnemonic, wordlist2) {
  wordlist2 = getWordlist(wordlist2);
  logger22.checkNormalize();
  const words2 = wordlist2.split(mnemonic);
  if (words2.length % 3 !== 0) {
    throw new Error("invalid mnemonic");
  }
  const entropy = arrayify(new Uint8Array(Math.ceil(11 * words2.length / 8)));
  let offset = 0;
  for (let i3 = 0; i3 < words2.length; i3++) {
    let index = wordlist2.getWordIndex(words2[i3].normalize("NFKD"));
    if (index === -1) {
      throw new Error("invalid mnemonic");
    }
    for (let bit = 0; bit < 11; bit++) {
      if (index & 1 << 10 - bit) {
        entropy[offset >> 3] |= 1 << 7 - offset % 8;
      }
      offset++;
    }
  }
  const entropyBits = 32 * words2.length / 3;
  const checksumBits = words2.length / 3;
  const checksumMask = getUpperMask(checksumBits);
  const checksum = arrayify(sha256(entropy.slice(0, entropyBits / 8)))[0] & checksumMask;
  if (checksum !== (entropy[entropy.length - 1] & checksumMask)) {
    throw new Error("invalid checksum");
  }
  return hexlify(entropy.slice(0, entropyBits / 8));
}
function entropyToMnemonic(entropy, wordlist2) {
  wordlist2 = getWordlist(wordlist2);
  entropy = arrayify(entropy);
  if (entropy.length % 4 !== 0 || entropy.length < 16 || entropy.length > 32) {
    throw new Error("invalid entropy");
  }
  const indices = [0];
  let remainingBits = 11;
  for (let i3 = 0; i3 < entropy.length; i3++) {
    if (remainingBits > 8) {
      indices[indices.length - 1] <<= 8;
      indices[indices.length - 1] |= entropy[i3];
      remainingBits -= 8;
    } else {
      indices[indices.length - 1] <<= remainingBits;
      indices[indices.length - 1] |= entropy[i3] >> 8 - remainingBits;
      indices.push(entropy[i3] & getLowerMask(8 - remainingBits));
      remainingBits += 3;
    }
  }
  const checksumBits = entropy.length / 4;
  const checksum = arrayify(sha256(entropy))[0] & getUpperMask(checksumBits);
  indices[indices.length - 1] <<= checksumBits;
  indices[indices.length - 1] |= checksum >> 8 - checksumBits;
  return wordlist2.join(indices.map((index) => wordlist2.getWord(index)));
}
function isValidMnemonic(mnemonic, wordlist2) {
  try {
    mnemonicToEntropy(mnemonic, wordlist2);
    return true;
  } catch (error) {
  }
  return false;
}
function getAccountPath(index) {
  if (typeof index !== "number" || index < 0 || index >= HardenedBit || index % 1) {
    logger22.throwArgumentError("invalid account index", "index", index);
  }
  return `m/44'/60'/${index}'/0/0`;
}

// node_modules/@ethersproject/random/lib.esm/_version.js
var version18 = "random/5.5.0";

// node_modules/@ethersproject/random/lib.esm/random.js
"use strict";
var logger23 = new Logger(version18);
var anyGlobal = null;
try {
  anyGlobal = window;
  if (anyGlobal == null) {
    throw new Error("try next");
  }
} catch (error) {
  try {
    anyGlobal = global;
    if (anyGlobal == null) {
      throw new Error("try next");
    }
  } catch (error2) {
    anyGlobal = {};
  }
}
var crypto = anyGlobal.crypto || anyGlobal.msCrypto;
if (!crypto || !crypto.getRandomValues) {
  logger23.warn("WARNING: Missing strong random number source");
  crypto = {
    getRandomValues: function(buffer) {
      return logger23.throwError("no secure random source avaialble", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "crypto.getRandomValues"
      });
    }
  };
}
function randomBytes(length) {
  if (length <= 0 || length > 1024 || length % 1 || length != length) {
    logger23.throwArgumentError("invalid length", "length", length);
  }
  const result = new Uint8Array(length);
  crypto.getRandomValues(result);
  return arrayify(result);
}

// node_modules/@ethersproject/random/lib.esm/shuffle.js
"use strict";
function shuffled(array) {
  array = array.slice();
  for (let i3 = array.length - 1; i3 > 0; i3--) {
    const j3 = Math.floor(Math.random() * (i3 + 1));
    const tmp = array[i3];
    array[i3] = array[j3];
    array[j3] = tmp;
  }
  return array;
}

// node_modules/@ethersproject/random/lib.esm/index.js
"use strict";

// node_modules/@ethersproject/json-wallets/lib.esm/crowdsale.js
var import_aes_js = __toModule(require_aes_js());

// node_modules/@ethersproject/json-wallets/lib.esm/_version.js
var version19 = "json-wallets/5.5.0";

// node_modules/@ethersproject/json-wallets/lib.esm/utils.js
"use strict";
function looseArrayify(hexString) {
  if (typeof hexString === "string" && hexString.substring(0, 2) !== "0x") {
    hexString = "0x" + hexString;
  }
  return arrayify(hexString);
}
function zpad(value, length) {
  value = String(value);
  while (value.length < length) {
    value = "0" + value;
  }
  return value;
}
function getPassword(password) {
  if (typeof password === "string") {
    return toUtf8Bytes(password, UnicodeNormalizationForm.NFKC);
  }
  return arrayify(password);
}
function searchPath(object, path) {
  let currentChild = object;
  const comps = path.toLowerCase().split("/");
  for (let i3 = 0; i3 < comps.length; i3++) {
    let matchingChild = null;
    for (const key2 in currentChild) {
      if (key2.toLowerCase() === comps[i3]) {
        matchingChild = currentChild[key2];
        break;
      }
    }
    if (matchingChild === null) {
      return null;
    }
    currentChild = matchingChild;
  }
  return currentChild;
}
function uuidV4(randomBytes2) {
  const bytes = arrayify(randomBytes2);
  bytes[6] = bytes[6] & 15 | 64;
  bytes[8] = bytes[8] & 63 | 128;
  const value = hexlify(bytes);
  return [
    value.substring(2, 10),
    value.substring(10, 14),
    value.substring(14, 18),
    value.substring(18, 22),
    value.substring(22, 34)
  ].join("-");
}

// node_modules/@ethersproject/json-wallets/lib.esm/crowdsale.js
"use strict";
var logger24 = new Logger(version19);
var CrowdsaleAccount = class extends Description {
  isCrowdsaleAccount(value) {
    return !!(value && value._isCrowdsaleAccount);
  }
};
function decrypt(json, password) {
  const data = JSON.parse(json);
  password = getPassword(password);
  const ethaddr = getAddress(searchPath(data, "ethaddr"));
  const encseed = looseArrayify(searchPath(data, "encseed"));
  if (!encseed || encseed.length % 16 !== 0) {
    logger24.throwArgumentError("invalid encseed", "json", json);
  }
  const key2 = arrayify(pbkdf2(password, password, 2e3, 32, "sha256")).slice(0, 16);
  const iv = encseed.slice(0, 16);
  const encryptedSeed = encseed.slice(16);
  const aesCbc = new import_aes_js.default.ModeOfOperation.cbc(key2, iv);
  const seed = import_aes_js.default.padding.pkcs7.strip(arrayify(aesCbc.decrypt(encryptedSeed)));
  let seedHex = "";
  for (let i3 = 0; i3 < seed.length; i3++) {
    seedHex += String.fromCharCode(seed[i3]);
  }
  const seedHexBytes = toUtf8Bytes(seedHex);
  const privateKey = keccak256(seedHexBytes);
  return new CrowdsaleAccount({
    _isCrowdsaleAccount: true,
    address: ethaddr,
    privateKey
  });
}

// node_modules/@ethersproject/json-wallets/lib.esm/inspect.js
"use strict";
function isCrowdsaleWallet(json) {
  let data = null;
  try {
    data = JSON.parse(json);
  } catch (error) {
    return false;
  }
  return data.encseed && data.ethaddr;
}
function isKeystoreWallet(json) {
  let data = null;
  try {
    data = JSON.parse(json);
  } catch (error) {
    return false;
  }
  if (!data.version || parseInt(data.version) !== data.version || parseInt(data.version) !== 3) {
    return false;
  }
  return true;
}
function getJsonWalletAddress(json) {
  if (isCrowdsaleWallet(json)) {
    try {
      return getAddress(JSON.parse(json).ethaddr);
    } catch (error) {
      return null;
    }
  }
  if (isKeystoreWallet(json)) {
    try {
      return getAddress(JSON.parse(json).address);
    } catch (error) {
      return null;
    }
  }
  return null;
}

// node_modules/@ethersproject/json-wallets/lib.esm/keystore.js
var import_aes_js2 = __toModule(require_aes_js());
var import_scrypt_js = __toModule(require_scrypt());
"use strict";
var __awaiter6 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var logger25 = new Logger(version19);
function hasMnemonic(value) {
  return value != null && value.mnemonic && value.mnemonic.phrase;
}
var KeystoreAccount = class extends Description {
  isKeystoreAccount(value) {
    return !!(value && value._isKeystoreAccount);
  }
};
function _decrypt(data, key2, ciphertext) {
  const cipher = searchPath(data, "crypto/cipher");
  if (cipher === "aes-128-ctr") {
    const iv = looseArrayify(searchPath(data, "crypto/cipherparams/iv"));
    const counter = new import_aes_js2.default.Counter(iv);
    const aesCtr = new import_aes_js2.default.ModeOfOperation.ctr(key2, counter);
    return arrayify(aesCtr.decrypt(ciphertext));
  }
  return null;
}
function _getAccount(data, key2) {
  const ciphertext = looseArrayify(searchPath(data, "crypto/ciphertext"));
  const computedMAC = hexlify(keccak256(concat([key2.slice(16, 32), ciphertext]))).substring(2);
  if (computedMAC !== searchPath(data, "crypto/mac").toLowerCase()) {
    throw new Error("invalid password");
  }
  const privateKey = _decrypt(data, key2.slice(0, 16), ciphertext);
  if (!privateKey) {
    logger25.throwError("unsupported cipher", Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "decrypt"
    });
  }
  const mnemonicKey = key2.slice(32, 64);
  const address = computeAddress(privateKey);
  if (data.address) {
    let check = data.address.toLowerCase();
    if (check.substring(0, 2) !== "0x") {
      check = "0x" + check;
    }
    if (getAddress(check) !== address) {
      throw new Error("address mismatch");
    }
  }
  const account = {
    _isKeystoreAccount: true,
    address,
    privateKey: hexlify(privateKey)
  };
  if (searchPath(data, "x-ethers/version") === "0.1") {
    const mnemonicCiphertext = looseArrayify(searchPath(data, "x-ethers/mnemonicCiphertext"));
    const mnemonicIv = looseArrayify(searchPath(data, "x-ethers/mnemonicCounter"));
    const mnemonicCounter = new import_aes_js2.default.Counter(mnemonicIv);
    const mnemonicAesCtr = new import_aes_js2.default.ModeOfOperation.ctr(mnemonicKey, mnemonicCounter);
    const path = searchPath(data, "x-ethers/path") || defaultPath;
    const locale = searchPath(data, "x-ethers/locale") || "en";
    const entropy = arrayify(mnemonicAesCtr.decrypt(mnemonicCiphertext));
    try {
      const mnemonic = entropyToMnemonic(entropy, locale);
      const node = HDNode.fromMnemonic(mnemonic, null, locale).derivePath(path);
      if (node.privateKey != account.privateKey) {
        throw new Error("mnemonic mismatch");
      }
      account.mnemonic = node.mnemonic;
    } catch (error) {
      if (error.code !== Logger.errors.INVALID_ARGUMENT || error.argument !== "wordlist") {
        throw error;
      }
    }
  }
  return new KeystoreAccount(account);
}
function pbkdf2Sync(passwordBytes, salt, count, dkLen, prfFunc) {
  return arrayify(pbkdf2(passwordBytes, salt, count, dkLen, prfFunc));
}
function pbkdf22(passwordBytes, salt, count, dkLen, prfFunc) {
  return Promise.resolve(pbkdf2Sync(passwordBytes, salt, count, dkLen, prfFunc));
}
function _computeKdfKey(data, password, pbkdf2Func, scryptFunc, progressCallback) {
  const passwordBytes = getPassword(password);
  const kdf = searchPath(data, "crypto/kdf");
  if (kdf && typeof kdf === "string") {
    const throwError = function(name2, value) {
      return logger25.throwArgumentError("invalid key-derivation function parameters", name2, value);
    };
    if (kdf.toLowerCase() === "scrypt") {
      const salt = looseArrayify(searchPath(data, "crypto/kdfparams/salt"));
      const N3 = parseInt(searchPath(data, "crypto/kdfparams/n"));
      const r3 = parseInt(searchPath(data, "crypto/kdfparams/r"));
      const p2 = parseInt(searchPath(data, "crypto/kdfparams/p"));
      if (!N3 || !r3 || !p2) {
        throwError("kdf", kdf);
      }
      if ((N3 & N3 - 1) !== 0) {
        throwError("N", N3);
      }
      const dkLen = parseInt(searchPath(data, "crypto/kdfparams/dklen"));
      if (dkLen !== 32) {
        throwError("dklen", dkLen);
      }
      return scryptFunc(passwordBytes, salt, N3, r3, p2, 64, progressCallback);
    } else if (kdf.toLowerCase() === "pbkdf2") {
      const salt = looseArrayify(searchPath(data, "crypto/kdfparams/salt"));
      let prfFunc = null;
      const prf = searchPath(data, "crypto/kdfparams/prf");
      if (prf === "hmac-sha256") {
        prfFunc = "sha256";
      } else if (prf === "hmac-sha512") {
        prfFunc = "sha512";
      } else {
        throwError("prf", prf);
      }
      const count = parseInt(searchPath(data, "crypto/kdfparams/c"));
      const dkLen = parseInt(searchPath(data, "crypto/kdfparams/dklen"));
      if (dkLen !== 32) {
        throwError("dklen", dkLen);
      }
      return pbkdf2Func(passwordBytes, salt, count, dkLen, prfFunc);
    }
  }
  return logger25.throwArgumentError("unsupported key-derivation function", "kdf", kdf);
}
function decryptSync(json, password) {
  const data = JSON.parse(json);
  const key2 = _computeKdfKey(data, password, pbkdf2Sync, import_scrypt_js.default.syncScrypt);
  return _getAccount(data, key2);
}
function decrypt2(json, password, progressCallback) {
  return __awaiter6(this, void 0, void 0, function* () {
    const data = JSON.parse(json);
    const key2 = yield _computeKdfKey(data, password, pbkdf22, import_scrypt_js.default.scrypt, progressCallback);
    return _getAccount(data, key2);
  });
}
function encrypt(account, password, options, progressCallback) {
  try {
    if (getAddress(account.address) !== computeAddress(account.privateKey)) {
      throw new Error("address/privateKey mismatch");
    }
    if (hasMnemonic(account)) {
      const mnemonic = account.mnemonic;
      const node = HDNode.fromMnemonic(mnemonic.phrase, null, mnemonic.locale).derivePath(mnemonic.path || defaultPath);
      if (node.privateKey != account.privateKey) {
        throw new Error("mnemonic mismatch");
      }
    }
  } catch (e3) {
    return Promise.reject(e3);
  }
  if (typeof options === "function" && !progressCallback) {
    progressCallback = options;
    options = {};
  }
  if (!options) {
    options = {};
  }
  const privateKey = arrayify(account.privateKey);
  const passwordBytes = getPassword(password);
  let entropy = null;
  let path = null;
  let locale = null;
  if (hasMnemonic(account)) {
    const srcMnemonic = account.mnemonic;
    entropy = arrayify(mnemonicToEntropy(srcMnemonic.phrase, srcMnemonic.locale || "en"));
    path = srcMnemonic.path || defaultPath;
    locale = srcMnemonic.locale || "en";
  }
  let client = options.client;
  if (!client) {
    client = "ethers.js";
  }
  let salt = null;
  if (options.salt) {
    salt = arrayify(options.salt);
  } else {
    salt = randomBytes(32);
    ;
  }
  let iv = null;
  if (options.iv) {
    iv = arrayify(options.iv);
    if (iv.length !== 16) {
      throw new Error("invalid iv");
    }
  } else {
    iv = randomBytes(16);
  }
  let uuidRandom = null;
  if (options.uuid) {
    uuidRandom = arrayify(options.uuid);
    if (uuidRandom.length !== 16) {
      throw new Error("invalid uuid");
    }
  } else {
    uuidRandom = randomBytes(16);
  }
  let N3 = 1 << 17, r3 = 8, p2 = 1;
  if (options.scrypt) {
    if (options.scrypt.N) {
      N3 = options.scrypt.N;
    }
    if (options.scrypt.r) {
      r3 = options.scrypt.r;
    }
    if (options.scrypt.p) {
      p2 = options.scrypt.p;
    }
  }
  return import_scrypt_js.default.scrypt(passwordBytes, salt, N3, r3, p2, 64, progressCallback).then((key2) => {
    key2 = arrayify(key2);
    const derivedKey = key2.slice(0, 16);
    const macPrefix = key2.slice(16, 32);
    const mnemonicKey = key2.slice(32, 64);
    const counter = new import_aes_js2.default.Counter(iv);
    const aesCtr = new import_aes_js2.default.ModeOfOperation.ctr(derivedKey, counter);
    const ciphertext = arrayify(aesCtr.encrypt(privateKey));
    const mac = keccak256(concat([macPrefix, ciphertext]));
    const data = {
      address: account.address.substring(2).toLowerCase(),
      id: uuidV4(uuidRandom),
      version: 3,
      Crypto: {
        cipher: "aes-128-ctr",
        cipherparams: {
          iv: hexlify(iv).substring(2)
        },
        ciphertext: hexlify(ciphertext).substring(2),
        kdf: "scrypt",
        kdfparams: {
          salt: hexlify(salt).substring(2),
          n: N3,
          dklen: 32,
          p: p2,
          r: r3
        },
        mac: mac.substring(2)
      }
    };
    if (entropy) {
      const mnemonicIv = randomBytes(16);
      const mnemonicCounter = new import_aes_js2.default.Counter(mnemonicIv);
      const mnemonicAesCtr = new import_aes_js2.default.ModeOfOperation.ctr(mnemonicKey, mnemonicCounter);
      const mnemonicCiphertext = arrayify(mnemonicAesCtr.encrypt(entropy));
      const now2 = new Date();
      const timestamp = now2.getUTCFullYear() + "-" + zpad(now2.getUTCMonth() + 1, 2) + "-" + zpad(now2.getUTCDate(), 2) + "T" + zpad(now2.getUTCHours(), 2) + "-" + zpad(now2.getUTCMinutes(), 2) + "-" + zpad(now2.getUTCSeconds(), 2) + ".0Z";
      data["x-ethers"] = {
        client,
        gethFilename: "UTC--" + timestamp + "--" + data.address,
        mnemonicCounter: hexlify(mnemonicIv).substring(2),
        mnemonicCiphertext: hexlify(mnemonicCiphertext).substring(2),
        path,
        locale,
        version: "0.1"
      };
    }
    return JSON.stringify(data);
  });
}

// node_modules/@ethersproject/json-wallets/lib.esm/index.js
"use strict";
function decryptJsonWallet(json, password, progressCallback) {
  if (isCrowdsaleWallet(json)) {
    if (progressCallback) {
      progressCallback(0);
    }
    const account = decrypt(json, password);
    if (progressCallback) {
      progressCallback(1);
    }
    return Promise.resolve(account);
  }
  if (isKeystoreWallet(json)) {
    return decrypt2(json, password, progressCallback);
  }
  return Promise.reject(new Error("invalid JSON wallet"));
}
function decryptJsonWalletSync(json, password) {
  if (isCrowdsaleWallet(json)) {
    return decrypt(json, password);
  }
  if (isKeystoreWallet(json)) {
    return decryptSync(json, password);
  }
  throw new Error("invalid JSON wallet");
}

// node_modules/@ethersproject/wallet/lib.esm/_version.js
var version20 = "wallet/5.5.0";

// node_modules/@ethersproject/wallet/lib.esm/index.js
"use strict";
var __awaiter7 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var logger26 = new Logger(version20);
function isAccount(value) {
  return value != null && isHexString(value.privateKey, 32) && value.address != null;
}
function hasMnemonic2(value) {
  const mnemonic = value.mnemonic;
  return mnemonic && mnemonic.phrase;
}
var Wallet = class extends Signer {
  constructor(privateKey, provider) {
    logger26.checkNew(new.target, Wallet);
    super();
    if (isAccount(privateKey)) {
      const signingKey = new SigningKey(privateKey.privateKey);
      defineReadOnly(this, "_signingKey", () => signingKey);
      defineReadOnly(this, "address", computeAddress(this.publicKey));
      if (this.address !== getAddress(privateKey.address)) {
        logger26.throwArgumentError("privateKey/address mismatch", "privateKey", "[REDACTED]");
      }
      if (hasMnemonic2(privateKey)) {
        const srcMnemonic = privateKey.mnemonic;
        defineReadOnly(this, "_mnemonic", () => ({
          phrase: srcMnemonic.phrase,
          path: srcMnemonic.path || defaultPath,
          locale: srcMnemonic.locale || "en"
        }));
        const mnemonic = this.mnemonic;
        const node = HDNode.fromMnemonic(mnemonic.phrase, null, mnemonic.locale).derivePath(mnemonic.path);
        if (computeAddress(node.privateKey) !== this.address) {
          logger26.throwArgumentError("mnemonic/address mismatch", "privateKey", "[REDACTED]");
        }
      } else {
        defineReadOnly(this, "_mnemonic", () => null);
      }
    } else {
      if (SigningKey.isSigningKey(privateKey)) {
        if (privateKey.curve !== "secp256k1") {
          logger26.throwArgumentError("unsupported curve; must be secp256k1", "privateKey", "[REDACTED]");
        }
        defineReadOnly(this, "_signingKey", () => privateKey);
      } else {
        if (typeof privateKey === "string") {
          if (privateKey.match(/^[0-9a-f]*$/i) && privateKey.length === 64) {
            privateKey = "0x" + privateKey;
          }
        }
        const signingKey = new SigningKey(privateKey);
        defineReadOnly(this, "_signingKey", () => signingKey);
      }
      defineReadOnly(this, "_mnemonic", () => null);
      defineReadOnly(this, "address", computeAddress(this.publicKey));
    }
    if (provider && !Provider.isProvider(provider)) {
      logger26.throwArgumentError("invalid provider", "provider", provider);
    }
    defineReadOnly(this, "provider", provider || null);
  }
  get mnemonic() {
    return this._mnemonic();
  }
  get privateKey() {
    return this._signingKey().privateKey;
  }
  get publicKey() {
    return this._signingKey().publicKey;
  }
  getAddress() {
    return Promise.resolve(this.address);
  }
  connect(provider) {
    return new Wallet(this, provider);
  }
  signTransaction(transaction) {
    return resolveProperties(transaction).then((tx) => {
      if (tx.from != null) {
        if (getAddress(tx.from) !== this.address) {
          logger26.throwArgumentError("transaction from address mismatch", "transaction.from", transaction.from);
        }
        delete tx.from;
      }
      const signature2 = this._signingKey().signDigest(keccak256(serialize(tx)));
      return serialize(tx, signature2);
    });
  }
  signMessage(message) {
    return __awaiter7(this, void 0, void 0, function* () {
      return joinSignature(this._signingKey().signDigest(hashMessage(message)));
    });
  }
  _signTypedData(domain, types, value) {
    return __awaiter7(this, void 0, void 0, function* () {
      const populated = yield TypedDataEncoder.resolveNames(domain, types, value, (name2) => {
        if (this.provider == null) {
          logger26.throwError("cannot resolve ENS names without a provider", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "resolveName",
            value: name2
          });
        }
        return this.provider.resolveName(name2);
      });
      return joinSignature(this._signingKey().signDigest(TypedDataEncoder.hash(populated.domain, types, populated.value)));
    });
  }
  encrypt(password, options, progressCallback) {
    if (typeof options === "function" && !progressCallback) {
      progressCallback = options;
      options = {};
    }
    if (progressCallback && typeof progressCallback !== "function") {
      throw new Error("invalid callback");
    }
    if (!options) {
      options = {};
    }
    return encrypt(this, password, options, progressCallback);
  }
  static createRandom(options) {
    let entropy = randomBytes(16);
    if (!options) {
      options = {};
    }
    if (options.extraEntropy) {
      entropy = arrayify(hexDataSlice(keccak256(concat([entropy, options.extraEntropy])), 0, 16));
    }
    const mnemonic = entropyToMnemonic(entropy, options.locale);
    return Wallet.fromMnemonic(mnemonic, options.path, options.locale);
  }
  static fromEncryptedJson(json, password, progressCallback) {
    return decryptJsonWallet(json, password, progressCallback).then((account) => {
      return new Wallet(account);
    });
  }
  static fromEncryptedJsonSync(json, password) {
    return new Wallet(decryptJsonWalletSync(json, password));
  }
  static fromMnemonic(mnemonic, path, wordlist2) {
    if (!path) {
      path = defaultPath;
    }
    return new Wallet(HDNode.fromMnemonic(mnemonic, null, wordlist2).derivePath(path));
  }
};
function verifyMessage(message, signature2) {
  return recoverAddress(hashMessage(message), signature2);
}
function verifyTypedData(domain, types, value, signature2) {
  return recoverAddress(TypedDataEncoder.hash(domain, types, value), signature2);
}

// node_modules/@ethersproject/providers/lib.esm/index.js
var lib_exports4 = {};
__export(lib_exports4, {
  AlchemyProvider: () => AlchemyProvider,
  AlchemyWebSocketProvider: () => AlchemyWebSocketProvider,
  BaseProvider: () => BaseProvider,
  CloudflareProvider: () => CloudflareProvider,
  EtherscanProvider: () => EtherscanProvider,
  FallbackProvider: () => FallbackProvider,
  Formatter: () => Formatter,
  InfuraProvider: () => InfuraProvider,
  InfuraWebSocketProvider: () => InfuraWebSocketProvider,
  IpcProvider: () => IpcProvider,
  JsonRpcBatchProvider: () => JsonRpcBatchProvider,
  JsonRpcProvider: () => JsonRpcProvider,
  JsonRpcSigner: () => JsonRpcSigner,
  NodesmithProvider: () => NodesmithProvider,
  PocketProvider: () => PocketProvider,
  Provider: () => Provider,
  Resolver: () => Resolver,
  StaticJsonRpcProvider: () => StaticJsonRpcProvider,
  UrlJsonRpcProvider: () => UrlJsonRpcProvider,
  Web3Provider: () => Web3Provider,
  WebSocketProvider: () => WebSocketProvider,
  getDefaultProvider: () => getDefaultProvider,
  getNetwork: () => getNetwork,
  isCommunityResourcable: () => isCommunityResourcable,
  isCommunityResource: () => isCommunityResource,
  showThrottleMessage: () => showThrottleMessage
});

// node_modules/@ethersproject/networks/lib.esm/_version.js
var version21 = "networks/5.5.0";

// node_modules/@ethersproject/networks/lib.esm/index.js
"use strict";
var logger27 = new Logger(version21);
function isRenetworkable(value) {
  return value && typeof value.renetwork === "function";
}
function ethDefaultProvider(network) {
  const func = function(providers, options) {
    if (options == null) {
      options = {};
    }
    const providerList = [];
    if (providers.InfuraProvider) {
      try {
        providerList.push(new providers.InfuraProvider(network, options.infura));
      } catch (error) {
      }
    }
    if (providers.EtherscanProvider) {
      try {
        providerList.push(new providers.EtherscanProvider(network, options.etherscan));
      } catch (error) {
      }
    }
    if (providers.AlchemyProvider) {
      try {
        providerList.push(new providers.AlchemyProvider(network, options.alchemy));
      } catch (error) {
      }
    }
    if (providers.PocketProvider) {
      const skip = ["goerli", "ropsten", "rinkeby"];
      try {
        const provider = new providers.PocketProvider(network);
        if (provider.network && skip.indexOf(provider.network.name) === -1) {
          providerList.push(provider);
        }
      } catch (error) {
      }
    }
    if (providers.CloudflareProvider) {
      try {
        providerList.push(new providers.CloudflareProvider(network));
      } catch (error) {
      }
    }
    if (providerList.length === 0) {
      return null;
    }
    if (providers.FallbackProvider) {
      let quorum = 1;
      if (options.quorum != null) {
        quorum = options.quorum;
      } else if (network === "homestead") {
        quorum = 2;
      }
      return new providers.FallbackProvider(providerList, quorum);
    }
    return providerList[0];
  };
  func.renetwork = function(network2) {
    return ethDefaultProvider(network2);
  };
  return func;
}
function etcDefaultProvider(url, network) {
  const func = function(providers, options) {
    if (providers.JsonRpcProvider) {
      return new providers.JsonRpcProvider(url, network);
    }
    return null;
  };
  func.renetwork = function(network2) {
    return etcDefaultProvider(url, network2);
  };
  return func;
}
var homestead = {
  chainId: 1,
  ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  name: "homestead",
  _defaultProvider: ethDefaultProvider("homestead")
};
var ropsten = {
  chainId: 3,
  ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  name: "ropsten",
  _defaultProvider: ethDefaultProvider("ropsten")
};
var classicMordor = {
  chainId: 63,
  name: "classicMordor",
  _defaultProvider: etcDefaultProvider("https://www.ethercluster.com/mordor", "classicMordor")
};
var networks = {
  unspecified: { chainId: 0, name: "unspecified" },
  homestead,
  mainnet: homestead,
  morden: { chainId: 2, name: "morden" },
  ropsten,
  testnet: ropsten,
  rinkeby: {
    chainId: 4,
    ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    name: "rinkeby",
    _defaultProvider: ethDefaultProvider("rinkeby")
  },
  kovan: {
    chainId: 42,
    name: "kovan",
    _defaultProvider: ethDefaultProvider("kovan")
  },
  goerli: {
    chainId: 5,
    ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    name: "goerli",
    _defaultProvider: ethDefaultProvider("goerli")
  },
  classic: {
    chainId: 61,
    name: "classic",
    _defaultProvider: etcDefaultProvider("https://www.ethercluster.com/etc", "classic")
  },
  classicMorden: { chainId: 62, name: "classicMorden" },
  classicMordor,
  classicTestnet: classicMordor,
  classicKotti: {
    chainId: 6,
    name: "classicKotti",
    _defaultProvider: etcDefaultProvider("https://www.ethercluster.com/kotti", "classicKotti")
  },
  xdai: { chainId: 100, name: "xdai" },
  matic: { chainId: 137, name: "matic" },
  maticmum: { chainId: 80001, name: "maticmum" },
  bnb: { chainId: 56, name: "bnb" },
  bnbt: { chainId: 97, name: "bnbt" }
};
function getNetwork(network) {
  if (network == null) {
    return null;
  }
  if (typeof network === "number") {
    for (const name2 in networks) {
      const standard2 = networks[name2];
      if (standard2.chainId === network) {
        return {
          name: standard2.name,
          chainId: standard2.chainId,
          ensAddress: standard2.ensAddress || null,
          _defaultProvider: standard2._defaultProvider || null
        };
      }
    }
    return {
      chainId: network,
      name: "unknown"
    };
  }
  if (typeof network === "string") {
    const standard2 = networks[network];
    if (standard2 == null) {
      return null;
    }
    return {
      name: standard2.name,
      chainId: standard2.chainId,
      ensAddress: standard2.ensAddress,
      _defaultProvider: standard2._defaultProvider || null
    };
  }
  const standard = networks[network.name];
  if (!standard) {
    if (typeof network.chainId !== "number") {
      logger27.throwArgumentError("invalid network chainId", "network", network);
    }
    return network;
  }
  if (network.chainId !== 0 && network.chainId !== standard.chainId) {
    logger27.throwArgumentError("network chainId mismatch", "network", network);
  }
  let defaultProvider = network._defaultProvider || null;
  if (defaultProvider == null && standard._defaultProvider) {
    if (isRenetworkable(standard._defaultProvider)) {
      defaultProvider = standard._defaultProvider.renetwork(network);
    } else {
      defaultProvider = standard._defaultProvider;
    }
  }
  return {
    name: network.name,
    chainId: standard.chainId,
    ensAddress: network.ensAddress || standard.ensAddress || null,
    _defaultProvider: defaultProvider
  };
}

// node_modules/@ethersproject/base64/lib.esm/index.js
var lib_exports3 = {};
__export(lib_exports3, {
  decode: () => decode2,
  encode: () => encode3
});

// node_modules/@ethersproject/base64/lib.esm/base64.js
"use strict";
function decode2(textData) {
  textData = atob(textData);
  const data = [];
  for (let i3 = 0; i3 < textData.length; i3++) {
    data.push(textData.charCodeAt(i3));
  }
  return arrayify(data);
}
function encode3(data) {
  data = arrayify(data);
  let textData = "";
  for (let i3 = 0; i3 < data.length; i3++) {
    textData += String.fromCharCode(data[i3]);
  }
  return btoa(textData);
}

// node_modules/@ethersproject/base64/lib.esm/index.js
"use strict";

// node_modules/@ethersproject/web/lib.esm/_version.js
var version22 = "web/5.5.0";

// node_modules/@ethersproject/web/lib.esm/geturl.js
"use strict";
var __awaiter8 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function getUrl(href, options) {
  return __awaiter8(this, void 0, void 0, function* () {
    if (options == null) {
      options = {};
    }
    const request = {
      method: options.method || "GET",
      headers: options.headers || {},
      body: options.body || void 0
    };
    if (options.skipFetchSetup !== true) {
      request.mode = "cors";
      request.cache = "no-cache";
      request.credentials = "same-origin";
      request.redirect = "follow";
      request.referrer = "client";
    }
    ;
    const response = yield fetch(href, request);
    const body = yield response.arrayBuffer();
    const headers = {};
    if (response.headers.forEach) {
      response.headers.forEach((value, key2) => {
        headers[key2.toLowerCase()] = value;
      });
    } else {
      response.headers.keys().forEach((key2) => {
        headers[key2.toLowerCase()] = response.headers.get(key2);
      });
    }
    return {
      headers,
      statusCode: response.status,
      statusMessage: response.statusText,
      body: arrayify(new Uint8Array(body))
    };
  });
}

// node_modules/@ethersproject/web/lib.esm/index.js
"use strict";
var __awaiter9 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var logger28 = new Logger(version22);
function staller(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
function bodyify(value, type) {
  if (value == null) {
    return null;
  }
  if (typeof value === "string") {
    return value;
  }
  if (isBytesLike(value)) {
    if (type && (type.split("/")[0] === "text" || type.split(";")[0].trim() === "application/json")) {
      try {
        return toUtf8String(value);
      } catch (error) {
      }
      ;
    }
    return hexlify(value);
  }
  return value;
}
function _fetchData(connection, body, processFunc) {
  const attemptLimit = typeof connection === "object" && connection.throttleLimit != null ? connection.throttleLimit : 12;
  logger28.assertArgument(attemptLimit > 0 && attemptLimit % 1 === 0, "invalid connection throttle limit", "connection.throttleLimit", attemptLimit);
  const throttleCallback = typeof connection === "object" ? connection.throttleCallback : null;
  const throttleSlotInterval = typeof connection === "object" && typeof connection.throttleSlotInterval === "number" ? connection.throttleSlotInterval : 100;
  logger28.assertArgument(throttleSlotInterval > 0 && throttleSlotInterval % 1 === 0, "invalid connection throttle slot interval", "connection.throttleSlotInterval", throttleSlotInterval);
  const headers = {};
  let url = null;
  const options = {
    method: "GET"
  };
  let allow304 = false;
  let timeout = 2 * 60 * 1e3;
  if (typeof connection === "string") {
    url = connection;
  } else if (typeof connection === "object") {
    if (connection == null || connection.url == null) {
      logger28.throwArgumentError("missing URL", "connection.url", connection);
    }
    url = connection.url;
    if (typeof connection.timeout === "number" && connection.timeout > 0) {
      timeout = connection.timeout;
    }
    if (connection.headers) {
      for (const key2 in connection.headers) {
        headers[key2.toLowerCase()] = { key: key2, value: String(connection.headers[key2]) };
        if (["if-none-match", "if-modified-since"].indexOf(key2.toLowerCase()) >= 0) {
          allow304 = true;
        }
      }
    }
    options.allowGzip = !!connection.allowGzip;
    if (connection.user != null && connection.password != null) {
      if (url.substring(0, 6) !== "https:" && connection.allowInsecureAuthentication !== true) {
        logger28.throwError("basic authentication requires a secure https url", Logger.errors.INVALID_ARGUMENT, { argument: "url", url, user: connection.user, password: "[REDACTED]" });
      }
      const authorization = connection.user + ":" + connection.password;
      headers["authorization"] = {
        key: "Authorization",
        value: "Basic " + encode3(toUtf8Bytes(authorization))
      };
    }
  }
  if (body) {
    options.method = "POST";
    options.body = body;
    if (headers["content-type"] == null) {
      headers["content-type"] = { key: "Content-Type", value: "application/octet-stream" };
    }
    if (headers["content-length"] == null) {
      headers["content-length"] = { key: "Content-Length", value: String(body.length) };
    }
  }
  const flatHeaders = {};
  Object.keys(headers).forEach((key2) => {
    const header = headers[key2];
    flatHeaders[header.key] = header.value;
  });
  options.headers = flatHeaders;
  const runningTimeout = function() {
    let timer2 = null;
    const promise = new Promise(function(resolve, reject) {
      if (timeout) {
        timer2 = setTimeout(() => {
          if (timer2 == null) {
            return;
          }
          timer2 = null;
          reject(logger28.makeError("timeout", Logger.errors.TIMEOUT, {
            requestBody: bodyify(options.body, flatHeaders["content-type"]),
            requestMethod: options.method,
            timeout,
            url
          }));
        }, timeout);
      }
    });
    const cancel = function() {
      if (timer2 == null) {
        return;
      }
      clearTimeout(timer2);
      timer2 = null;
    };
    return { promise, cancel };
  }();
  const runningFetch = function() {
    return __awaiter9(this, void 0, void 0, function* () {
      for (let attempt = 0; attempt < attemptLimit; attempt++) {
        let response = null;
        try {
          response = yield getUrl(url, options);
          if (response.statusCode === 429 && attempt < attemptLimit) {
            let tryAgain = true;
            if (throttleCallback) {
              tryAgain = yield throttleCallback(attempt, url);
            }
            if (tryAgain) {
              let stall3 = 0;
              const retryAfter = response.headers["retry-after"];
              if (typeof retryAfter === "string" && retryAfter.match(/^[1-9][0-9]*$/)) {
                stall3 = parseInt(retryAfter) * 1e3;
              } else {
                stall3 = throttleSlotInterval * parseInt(String(Math.random() * Math.pow(2, attempt)));
              }
              yield staller(stall3);
              continue;
            }
          }
        } catch (error) {
          response = error.response;
          if (response == null) {
            runningTimeout.cancel();
            logger28.throwError("missing response", Logger.errors.SERVER_ERROR, {
              requestBody: bodyify(options.body, flatHeaders["content-type"]),
              requestMethod: options.method,
              serverError: error,
              url
            });
          }
        }
        let body2 = response.body;
        if (allow304 && response.statusCode === 304) {
          body2 = null;
        } else if (response.statusCode < 200 || response.statusCode >= 300) {
          runningTimeout.cancel();
          logger28.throwError("bad response", Logger.errors.SERVER_ERROR, {
            status: response.statusCode,
            headers: response.headers,
            body: bodyify(body2, response.headers ? response.headers["content-type"] : null),
            requestBody: bodyify(options.body, flatHeaders["content-type"]),
            requestMethod: options.method,
            url
          });
        }
        if (processFunc) {
          try {
            const result = yield processFunc(body2, response);
            runningTimeout.cancel();
            return result;
          } catch (error) {
            if (error.throttleRetry && attempt < attemptLimit) {
              let tryAgain = true;
              if (throttleCallback) {
                tryAgain = yield throttleCallback(attempt, url);
              }
              if (tryAgain) {
                const timeout2 = throttleSlotInterval * parseInt(String(Math.random() * Math.pow(2, attempt)));
                yield staller(timeout2);
                continue;
              }
            }
            runningTimeout.cancel();
            logger28.throwError("processing response error", Logger.errors.SERVER_ERROR, {
              body: bodyify(body2, response.headers ? response.headers["content-type"] : null),
              error,
              requestBody: bodyify(options.body, flatHeaders["content-type"]),
              requestMethod: options.method,
              url
            });
          }
        }
        runningTimeout.cancel();
        return body2;
      }
      return logger28.throwError("failed response", Logger.errors.SERVER_ERROR, {
        requestBody: bodyify(options.body, flatHeaders["content-type"]),
        requestMethod: options.method,
        url
      });
    });
  }();
  return Promise.race([runningTimeout.promise, runningFetch]);
}
function fetchJson(connection, json, processFunc) {
  let processJsonFunc = (value, response) => {
    let result = null;
    if (value != null) {
      try {
        result = JSON.parse(toUtf8String(value));
      } catch (error) {
        logger28.throwError("invalid JSON", Logger.errors.SERVER_ERROR, {
          body: value,
          error
        });
      }
    }
    if (processFunc) {
      result = processFunc(result, response);
    }
    return result;
  };
  let body = null;
  if (json != null) {
    body = toUtf8Bytes(json);
    const updated = typeof connection === "string" ? { url: connection } : shallowCopy(connection);
    if (updated.headers) {
      const hasContentType = Object.keys(updated.headers).filter((k3) => k3.toLowerCase() === "content-type").length !== 0;
      if (!hasContentType) {
        updated.headers = shallowCopy(updated.headers);
        updated.headers["content-type"] = "application/json";
      }
    } else {
      updated.headers = { "content-type": "application/json" };
    }
    connection = updated;
  }
  return _fetchData(connection, body, processJsonFunc);
}
function poll(func, options) {
  if (!options) {
    options = {};
  }
  options = shallowCopy(options);
  if (options.floor == null) {
    options.floor = 0;
  }
  if (options.ceiling == null) {
    options.ceiling = 1e4;
  }
  if (options.interval == null) {
    options.interval = 250;
  }
  return new Promise(function(resolve, reject) {
    let timer2 = null;
    let done = false;
    const cancel = () => {
      if (done) {
        return false;
      }
      done = true;
      if (timer2) {
        clearTimeout(timer2);
      }
      return true;
    };
    if (options.timeout) {
      timer2 = setTimeout(() => {
        if (cancel()) {
          reject(new Error("timeout"));
        }
      }, options.timeout);
    }
    const retryLimit = options.retryLimit;
    let attempt = 0;
    function check() {
      return func().then(function(result) {
        if (result !== void 0) {
          if (cancel()) {
            resolve(result);
          }
        } else if (options.oncePoll) {
          options.oncePoll.once("poll", check);
        } else if (options.onceBlock) {
          options.onceBlock.once("block", check);
        } else if (!done) {
          attempt++;
          if (attempt > retryLimit) {
            if (cancel()) {
              reject(new Error("retry limit reached"));
            }
            return;
          }
          let timeout = options.interval * parseInt(String(Math.random() * Math.pow(2, attempt)));
          if (timeout < options.floor) {
            timeout = options.floor;
          }
          if (timeout > options.ceiling) {
            timeout = options.ceiling;
          }
          setTimeout(check, timeout);
        }
        return null;
      }, function(error) {
        if (cancel()) {
          reject(error);
        }
      });
    }
    check();
  });
}

// node_modules/@ethersproject/providers/lib.esm/base-provider.js
var import_bech32 = __toModule(require_bech32());

// node_modules/@ethersproject/providers/lib.esm/_version.js
var version23 = "providers/5.5.0";

// node_modules/@ethersproject/providers/lib.esm/formatter.js
"use strict";
var logger29 = new Logger(version23);
var Formatter = class {
  constructor() {
    logger29.checkNew(new.target, Formatter);
    this.formats = this.getDefaultFormats();
  }
  getDefaultFormats() {
    const formats = {};
    const address = this.address.bind(this);
    const bigNumber = this.bigNumber.bind(this);
    const blockTag = this.blockTag.bind(this);
    const data = this.data.bind(this);
    const hash3 = this.hash.bind(this);
    const hex = this.hex.bind(this);
    const number = this.number.bind(this);
    const type = this.type.bind(this);
    const strictData = (v3) => {
      return this.data(v3, true);
    };
    formats.transaction = {
      hash: hash3,
      type,
      accessList: Formatter.allowNull(this.accessList.bind(this), null),
      blockHash: Formatter.allowNull(hash3, null),
      blockNumber: Formatter.allowNull(number, null),
      transactionIndex: Formatter.allowNull(number, null),
      confirmations: Formatter.allowNull(number, null),
      from: address,
      gasPrice: Formatter.allowNull(bigNumber),
      maxPriorityFeePerGas: Formatter.allowNull(bigNumber),
      maxFeePerGas: Formatter.allowNull(bigNumber),
      gasLimit: bigNumber,
      to: Formatter.allowNull(address, null),
      value: bigNumber,
      nonce: number,
      data,
      r: Formatter.allowNull(this.uint256),
      s: Formatter.allowNull(this.uint256),
      v: Formatter.allowNull(number),
      creates: Formatter.allowNull(address, null),
      raw: Formatter.allowNull(data)
    };
    formats.transactionRequest = {
      from: Formatter.allowNull(address),
      nonce: Formatter.allowNull(number),
      gasLimit: Formatter.allowNull(bigNumber),
      gasPrice: Formatter.allowNull(bigNumber),
      maxPriorityFeePerGas: Formatter.allowNull(bigNumber),
      maxFeePerGas: Formatter.allowNull(bigNumber),
      to: Formatter.allowNull(address),
      value: Formatter.allowNull(bigNumber),
      data: Formatter.allowNull(strictData),
      type: Formatter.allowNull(number),
      accessList: Formatter.allowNull(this.accessList.bind(this), null)
    };
    formats.receiptLog = {
      transactionIndex: number,
      blockNumber: number,
      transactionHash: hash3,
      address,
      topics: Formatter.arrayOf(hash3),
      data,
      logIndex: number,
      blockHash: hash3
    };
    formats.receipt = {
      to: Formatter.allowNull(this.address, null),
      from: Formatter.allowNull(this.address, null),
      contractAddress: Formatter.allowNull(address, null),
      transactionIndex: number,
      root: Formatter.allowNull(hex),
      gasUsed: bigNumber,
      logsBloom: Formatter.allowNull(data),
      blockHash: hash3,
      transactionHash: hash3,
      logs: Formatter.arrayOf(this.receiptLog.bind(this)),
      blockNumber: number,
      confirmations: Formatter.allowNull(number, null),
      cumulativeGasUsed: bigNumber,
      effectiveGasPrice: Formatter.allowNull(bigNumber),
      status: Formatter.allowNull(number),
      type
    };
    formats.block = {
      hash: hash3,
      parentHash: hash3,
      number,
      timestamp: number,
      nonce: Formatter.allowNull(hex),
      difficulty: this.difficulty.bind(this),
      gasLimit: bigNumber,
      gasUsed: bigNumber,
      miner: address,
      extraData: data,
      transactions: Formatter.allowNull(Formatter.arrayOf(hash3)),
      baseFeePerGas: Formatter.allowNull(bigNumber)
    };
    formats.blockWithTransactions = shallowCopy(formats.block);
    formats.blockWithTransactions.transactions = Formatter.allowNull(Formatter.arrayOf(this.transactionResponse.bind(this)));
    formats.filter = {
      fromBlock: Formatter.allowNull(blockTag, void 0),
      toBlock: Formatter.allowNull(blockTag, void 0),
      blockHash: Formatter.allowNull(hash3, void 0),
      address: Formatter.allowNull(address, void 0),
      topics: Formatter.allowNull(this.topics.bind(this), void 0)
    };
    formats.filterLog = {
      blockNumber: Formatter.allowNull(number),
      blockHash: Formatter.allowNull(hash3),
      transactionIndex: number,
      removed: Formatter.allowNull(this.boolean.bind(this)),
      address,
      data: Formatter.allowFalsish(data, "0x"),
      topics: Formatter.arrayOf(hash3),
      transactionHash: hash3,
      logIndex: number
    };
    return formats;
  }
  accessList(accessList) {
    return accessListify(accessList || []);
  }
  number(number) {
    if (number === "0x") {
      return 0;
    }
    return BigNumber.from(number).toNumber();
  }
  type(number) {
    if (number === "0x" || number == null) {
      return 0;
    }
    return BigNumber.from(number).toNumber();
  }
  bigNumber(value) {
    return BigNumber.from(value);
  }
  boolean(value) {
    if (typeof value === "boolean") {
      return value;
    }
    if (typeof value === "string") {
      value = value.toLowerCase();
      if (value === "true") {
        return true;
      }
      if (value === "false") {
        return false;
      }
    }
    throw new Error("invalid boolean - " + value);
  }
  hex(value, strict) {
    if (typeof value === "string") {
      if (!strict && value.substring(0, 2) !== "0x") {
        value = "0x" + value;
      }
      if (isHexString(value)) {
        return value.toLowerCase();
      }
    }
    return logger29.throwArgumentError("invalid hash", "value", value);
  }
  data(value, strict) {
    const result = this.hex(value, strict);
    if (result.length % 2 !== 0) {
      throw new Error("invalid data; odd-length - " + value);
    }
    return result;
  }
  address(value) {
    return getAddress(value);
  }
  callAddress(value) {
    if (!isHexString(value, 32)) {
      return null;
    }
    const address = getAddress(hexDataSlice(value, 12));
    return address === AddressZero ? null : address;
  }
  contractAddress(value) {
    return getContractAddress(value);
  }
  blockTag(blockTag) {
    if (blockTag == null) {
      return "latest";
    }
    if (blockTag === "earliest") {
      return "0x0";
    }
    if (blockTag === "latest" || blockTag === "pending") {
      return blockTag;
    }
    if (typeof blockTag === "number" || isHexString(blockTag)) {
      return hexValue(blockTag);
    }
    throw new Error("invalid blockTag");
  }
  hash(value, strict) {
    const result = this.hex(value, strict);
    if (hexDataLength(result) !== 32) {
      return logger29.throwArgumentError("invalid hash", "value", value);
    }
    return result;
  }
  difficulty(value) {
    if (value == null) {
      return null;
    }
    const v3 = BigNumber.from(value);
    try {
      return v3.toNumber();
    } catch (error) {
    }
    return null;
  }
  uint256(value) {
    if (!isHexString(value)) {
      throw new Error("invalid uint256");
    }
    return hexZeroPad(value, 32);
  }
  _block(value, format) {
    if (value.author != null && value.miner == null) {
      value.miner = value.author;
    }
    const difficulty = value._difficulty != null ? value._difficulty : value.difficulty;
    const result = Formatter.check(format, value);
    result._difficulty = difficulty == null ? null : BigNumber.from(difficulty);
    return result;
  }
  block(value) {
    return this._block(value, this.formats.block);
  }
  blockWithTransactions(value) {
    return this._block(value, this.formats.blockWithTransactions);
  }
  transactionRequest(value) {
    return Formatter.check(this.formats.transactionRequest, value);
  }
  transactionResponse(transaction) {
    if (transaction.gas != null && transaction.gasLimit == null) {
      transaction.gasLimit = transaction.gas;
    }
    if (transaction.to && BigNumber.from(transaction.to).isZero()) {
      transaction.to = "0x0000000000000000000000000000000000000000";
    }
    if (transaction.input != null && transaction.data == null) {
      transaction.data = transaction.input;
    }
    if (transaction.to == null && transaction.creates == null) {
      transaction.creates = this.contractAddress(transaction);
    }
    if ((transaction.type === 1 || transaction.type === 2) && transaction.accessList == null) {
      transaction.accessList = [];
    }
    const result = Formatter.check(this.formats.transaction, transaction);
    if (transaction.chainId != null) {
      let chainId = transaction.chainId;
      if (isHexString(chainId)) {
        chainId = BigNumber.from(chainId).toNumber();
      }
      result.chainId = chainId;
    } else {
      let chainId = transaction.networkId;
      if (chainId == null && result.v == null) {
        chainId = transaction.chainId;
      }
      if (isHexString(chainId)) {
        chainId = BigNumber.from(chainId).toNumber();
      }
      if (typeof chainId !== "number" && result.v != null) {
        chainId = (result.v - 35) / 2;
        if (chainId < 0) {
          chainId = 0;
        }
        chainId = parseInt(chainId);
      }
      if (typeof chainId !== "number") {
        chainId = 0;
      }
      result.chainId = chainId;
    }
    if (result.blockHash && result.blockHash.replace(/0/g, "") === "x") {
      result.blockHash = null;
    }
    return result;
  }
  transaction(value) {
    return parse(value);
  }
  receiptLog(value) {
    return Formatter.check(this.formats.receiptLog, value);
  }
  receipt(value) {
    const result = Formatter.check(this.formats.receipt, value);
    if (result.root != null) {
      if (result.root.length <= 4) {
        const value2 = BigNumber.from(result.root).toNumber();
        if (value2 === 0 || value2 === 1) {
          if (result.status != null && result.status !== value2) {
            logger29.throwArgumentError("alt-root-status/status mismatch", "value", { root: result.root, status: result.status });
          }
          result.status = value2;
          delete result.root;
        } else {
          logger29.throwArgumentError("invalid alt-root-status", "value.root", result.root);
        }
      } else if (result.root.length !== 66) {
        logger29.throwArgumentError("invalid root hash", "value.root", result.root);
      }
    }
    if (result.status != null) {
      result.byzantium = true;
    }
    return result;
  }
  topics(value) {
    if (Array.isArray(value)) {
      return value.map((v3) => this.topics(v3));
    } else if (value != null) {
      return this.hash(value, true);
    }
    return null;
  }
  filter(value) {
    return Formatter.check(this.formats.filter, value);
  }
  filterLog(value) {
    return Formatter.check(this.formats.filterLog, value);
  }
  static check(format, object) {
    const result = {};
    for (const key2 in format) {
      try {
        const value = format[key2](object[key2]);
        if (value !== void 0) {
          result[key2] = value;
        }
      } catch (error) {
        error.checkKey = key2;
        error.checkValue = object[key2];
        throw error;
      }
    }
    return result;
  }
  static allowNull(format, nullValue) {
    return function(value) {
      if (value == null) {
        return nullValue;
      }
      return format(value);
    };
  }
  static allowFalsish(format, replaceValue) {
    return function(value) {
      if (!value) {
        return replaceValue;
      }
      return format(value);
    };
  }
  static arrayOf(format) {
    return function(array) {
      if (!Array.isArray(array)) {
        throw new Error("not an array");
      }
      const result = [];
      array.forEach(function(value) {
        result.push(format(value));
      });
      return result;
    };
  }
};
function isCommunityResourcable(value) {
  return value && typeof value.isCommunityResource === "function";
}
function isCommunityResource(value) {
  return isCommunityResourcable(value) && value.isCommunityResource();
}
var throttleMessage = false;
function showThrottleMessage() {
  if (throttleMessage) {
    return;
  }
  throttleMessage = true;
  console.log("========= NOTICE =========");
  console.log("Request-Rate Exceeded  (this message will not be repeated)");
  console.log("");
  console.log("The default API keys for each service are provided as a highly-throttled,");
  console.log("community resource for low-traffic projects and early prototyping.");
  console.log("");
  console.log("While your application will continue to function, we highly recommended");
  console.log("signing up for your own API keys to improve performance, increase your");
  console.log("request rate/limit and enable other perks, such as metrics and advanced APIs.");
  console.log("");
  console.log("For more details: https://docs.ethers.io/api-keys/");
  console.log("==========================");
}

// node_modules/@ethersproject/providers/lib.esm/base-provider.js
"use strict";
var __awaiter10 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var logger30 = new Logger(version23);
function checkTopic(topic) {
  if (topic == null) {
    return "null";
  }
  if (hexDataLength(topic) !== 32) {
    logger30.throwArgumentError("invalid topic", "topic", topic);
  }
  return topic.toLowerCase();
}
function serializeTopics(topics) {
  topics = topics.slice();
  while (topics.length > 0 && topics[topics.length - 1] == null) {
    topics.pop();
  }
  return topics.map((topic) => {
    if (Array.isArray(topic)) {
      const unique = {};
      topic.forEach((topic2) => {
        unique[checkTopic(topic2)] = true;
      });
      const sorted = Object.keys(unique);
      sorted.sort();
      return sorted.join("|");
    } else {
      return checkTopic(topic);
    }
  }).join("&");
}
function deserializeTopics(data) {
  if (data === "") {
    return [];
  }
  return data.split(/&/g).map((topic) => {
    if (topic === "") {
      return [];
    }
    const comps = topic.split("|").map((topic2) => {
      return topic2 === "null" ? null : topic2;
    });
    return comps.length === 1 ? comps[0] : comps;
  });
}
function getEventTag2(eventName) {
  if (typeof eventName === "string") {
    eventName = eventName.toLowerCase();
    if (hexDataLength(eventName) === 32) {
      return "tx:" + eventName;
    }
    if (eventName.indexOf(":") === -1) {
      return eventName;
    }
  } else if (Array.isArray(eventName)) {
    return "filter:*:" + serializeTopics(eventName);
  } else if (ForkEvent.isForkEvent(eventName)) {
    logger30.warn("not implemented");
    throw new Error("not implemented");
  } else if (eventName && typeof eventName === "object") {
    return "filter:" + (eventName.address || "*") + ":" + serializeTopics(eventName.topics || []);
  }
  throw new Error("invalid event - " + eventName);
}
function getTime() {
  return new Date().getTime();
}
function stall(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
var PollableEvents = ["block", "network", "pending", "poll"];
var Event2 = class {
  constructor(tag, listener, once) {
    defineReadOnly(this, "tag", tag);
    defineReadOnly(this, "listener", listener);
    defineReadOnly(this, "once", once);
  }
  get event() {
    switch (this.type) {
      case "tx":
        return this.hash;
      case "filter":
        return this.filter;
    }
    return this.tag;
  }
  get type() {
    return this.tag.split(":")[0];
  }
  get hash() {
    const comps = this.tag.split(":");
    if (comps[0] !== "tx") {
      return null;
    }
    return comps[1];
  }
  get filter() {
    const comps = this.tag.split(":");
    if (comps[0] !== "filter") {
      return null;
    }
    const address = comps[1];
    const topics = deserializeTopics(comps[2]);
    const filter2 = {};
    if (topics.length > 0) {
      filter2.topics = topics;
    }
    if (address && address !== "*") {
      filter2.address = address;
    }
    return filter2;
  }
  pollable() {
    return this.tag.indexOf(":") >= 0 || PollableEvents.indexOf(this.tag) >= 0;
  }
};
var coinInfos = {
  "0": { symbol: "btc", p2pkh: 0, p2sh: 5, prefix: "bc" },
  "2": { symbol: "ltc", p2pkh: 48, p2sh: 50, prefix: "ltc" },
  "3": { symbol: "doge", p2pkh: 30, p2sh: 22 },
  "60": { symbol: "eth", ilk: "eth" },
  "61": { symbol: "etc", ilk: "eth" },
  "700": { symbol: "xdai", ilk: "eth" }
};
function bytes32ify(value) {
  return hexZeroPad(BigNumber.from(value).toHexString(), 32);
}
function base58Encode(data) {
  return Base58.encode(concat([data, hexDataSlice(sha256(sha256(data)), 0, 4)]));
}
var matchers = [
  new RegExp("^(https)://(.*)$", "i"),
  new RegExp("^(data):(.*)$", "i"),
  new RegExp("^(ipfs)://(.*)$", "i"),
  new RegExp("^eip155:[0-9]+/(erc[0-9]+):(.*)$", "i")
];
function _parseString(result) {
  try {
    return toUtf8String(_parseBytes(result));
  } catch (error) {
  }
  return null;
}
function _parseBytes(result) {
  if (result === "0x") {
    return null;
  }
  const offset = BigNumber.from(hexDataSlice(result, 0, 32)).toNumber();
  const length = BigNumber.from(hexDataSlice(result, offset, offset + 32)).toNumber();
  return hexDataSlice(result, offset + 32, offset + 32 + length);
}
var Resolver = class {
  constructor(provider, address, name2, resolvedAddress) {
    defineReadOnly(this, "provider", provider);
    defineReadOnly(this, "name", name2);
    defineReadOnly(this, "address", provider.formatter.address(address));
    defineReadOnly(this, "_resolvedAddress", resolvedAddress);
  }
  _fetchBytes(selector, parameters) {
    return __awaiter10(this, void 0, void 0, function* () {
      const tx = {
        to: this.address,
        data: hexConcat([selector, namehash(this.name), parameters || "0x"])
      };
      try {
        return _parseBytes(yield this.provider.call(tx));
      } catch (error) {
        if (error.code === Logger.errors.CALL_EXCEPTION) {
          return null;
        }
        return null;
      }
    });
  }
  _getAddress(coinType, hexBytes) {
    const coinInfo = coinInfos[String(coinType)];
    if (coinInfo == null) {
      logger30.throwError(`unsupported coin type: ${coinType}`, Logger.errors.UNSUPPORTED_OPERATION, {
        operation: `getAddress(${coinType})`
      });
    }
    if (coinInfo.ilk === "eth") {
      return this.provider.formatter.address(hexBytes);
    }
    const bytes = arrayify(hexBytes);
    if (coinInfo.p2pkh != null) {
      const p2pkh = hexBytes.match(/^0x76a9([0-9a-f][0-9a-f])([0-9a-f]*)88ac$/);
      if (p2pkh) {
        const length = parseInt(p2pkh[1], 16);
        if (p2pkh[2].length === length * 2 && length >= 1 && length <= 75) {
          return base58Encode(concat([[coinInfo.p2pkh], "0x" + p2pkh[2]]));
        }
      }
    }
    if (coinInfo.p2sh != null) {
      const p2sh = hexBytes.match(/^0xa9([0-9a-f][0-9a-f])([0-9a-f]*)87$/);
      if (p2sh) {
        const length = parseInt(p2sh[1], 16);
        if (p2sh[2].length === length * 2 && length >= 1 && length <= 75) {
          return base58Encode(concat([[coinInfo.p2sh], "0x" + p2sh[2]]));
        }
      }
    }
    if (coinInfo.prefix != null) {
      const length = bytes[1];
      let version27 = bytes[0];
      if (version27 === 0) {
        if (length !== 20 && length !== 32) {
          version27 = -1;
        }
      } else {
        version27 = -1;
      }
      if (version27 >= 0 && bytes.length === 2 + length && length >= 1 && length <= 75) {
        const words2 = import_bech32.default.toWords(bytes.slice(2));
        words2.unshift(version27);
        return import_bech32.default.encode(coinInfo.prefix, words2);
      }
    }
    return null;
  }
  getAddress(coinType) {
    return __awaiter10(this, void 0, void 0, function* () {
      if (coinType == null) {
        coinType = 60;
      }
      if (coinType === 60) {
        try {
          const transaction = {
            to: this.address,
            data: "0x3b3b57de" + namehash(this.name).substring(2)
          };
          const hexBytes2 = yield this.provider.call(transaction);
          if (hexBytes2 === "0x" || hexBytes2 === HashZero) {
            return null;
          }
          return this.provider.formatter.callAddress(hexBytes2);
        } catch (error) {
          if (error.code === Logger.errors.CALL_EXCEPTION) {
            return null;
          }
          throw error;
        }
      }
      const hexBytes = yield this._fetchBytes("0xf1cb7e06", bytes32ify(coinType));
      if (hexBytes == null || hexBytes === "0x") {
        return null;
      }
      const address = this._getAddress(coinType, hexBytes);
      if (address == null) {
        logger30.throwError(`invalid or unsupported coin data`, Logger.errors.UNSUPPORTED_OPERATION, {
          operation: `getAddress(${coinType})`,
          coinType,
          data: hexBytes
        });
      }
      return address;
    });
  }
  getAvatar() {
    return __awaiter10(this, void 0, void 0, function* () {
      const linkage = [];
      try {
        const avatar = yield this.getText("avatar");
        if (avatar == null) {
          return null;
        }
        for (let i3 = 0; i3 < matchers.length; i3++) {
          const match = avatar.match(matchers[i3]);
          if (match == null) {
            continue;
          }
          switch (match[1]) {
            case "https":
              linkage.push({ type: "url", content: avatar });
              return { linkage, url: avatar };
            case "data":
              linkage.push({ type: "data", content: avatar });
              return { linkage, url: avatar };
            case "ipfs":
              linkage.push({ type: "ipfs", content: avatar });
              return { linkage, url: `https://gateway.ipfs.io/ipfs/${avatar.substring(7)}` };
            case "erc721":
            case "erc1155": {
              const selector = match[1] === "erc721" ? "0xc87b56dd" : "0x0e89341c";
              linkage.push({ type: match[1], content: avatar });
              const owner = this._resolvedAddress || (yield this.getAddress());
              const comps = (match[2] || "").split("/");
              if (comps.length !== 2) {
                return null;
              }
              const addr = yield this.provider.formatter.address(comps[0]);
              const tokenId = hexZeroPad(BigNumber.from(comps[1]).toHexString(), 32);
              if (match[1] === "erc721") {
                const tokenOwner = this.provider.formatter.callAddress(yield this.provider.call({
                  to: addr,
                  data: hexConcat(["0x6352211e", tokenId])
                }));
                if (owner !== tokenOwner) {
                  return null;
                }
                linkage.push({ type: "owner", content: tokenOwner });
              } else if (match[1] === "erc1155") {
                const balance = BigNumber.from(yield this.provider.call({
                  to: addr,
                  data: hexConcat(["0x00fdd58e", hexZeroPad(owner, 32), tokenId])
                }));
                if (balance.isZero()) {
                  return null;
                }
                linkage.push({ type: "balance", content: balance.toString() });
              }
              const tx = {
                to: this.provider.formatter.address(comps[0]),
                data: hexConcat([selector, tokenId])
              };
              let metadataUrl = _parseString(yield this.provider.call(tx));
              if (metadataUrl == null) {
                return null;
              }
              linkage.push({ type: "metadata-url", content: metadataUrl });
              if (match[1] === "erc1155") {
                metadataUrl = metadataUrl.replace("{id}", tokenId.substring(2));
              }
              const metadata = yield fetchJson(metadataUrl);
              if (!metadata || typeof metadata.image !== "string" || !metadata.image.match(/^https:\/\//i)) {
                return null;
              }
              linkage.push({ type: "metadata", content: JSON.stringify(metadata) });
              linkage.push({ type: "url", content: metadata.image });
              return { linkage, url: metadata.image };
            }
          }
        }
      } catch (error) {
      }
      return null;
    });
  }
  getContentHash() {
    return __awaiter10(this, void 0, void 0, function* () {
      const hexBytes = yield this._fetchBytes("0xbc1c58d1");
      if (hexBytes == null || hexBytes === "0x") {
        return null;
      }
      const ipfs = hexBytes.match(/^0xe3010170(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);
      if (ipfs) {
        const length = parseInt(ipfs[3], 16);
        if (ipfs[4].length === length * 2) {
          return "ipfs://" + Base58.encode("0x" + ipfs[1]);
        }
      }
      const swarm = hexBytes.match(/^0xe40101fa011b20([0-9a-f]*)$/);
      if (swarm) {
        if (swarm[1].length === 32 * 2) {
          return "bzz://" + swarm[1];
        }
      }
      return logger30.throwError(`invalid or unsupported content hash data`, Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "getContentHash()",
        data: hexBytes
      });
    });
  }
  getText(key2) {
    return __awaiter10(this, void 0, void 0, function* () {
      let keyBytes = toUtf8Bytes(key2);
      keyBytes = concat([bytes32ify(64), bytes32ify(keyBytes.length), keyBytes]);
      if (keyBytes.length % 32 !== 0) {
        keyBytes = concat([keyBytes, hexZeroPad("0x", 32 - key2.length % 32)]);
      }
      const hexBytes = yield this._fetchBytes("0x59d1d43c", hexlify(keyBytes));
      if (hexBytes == null || hexBytes === "0x") {
        return null;
      }
      return toUtf8String(hexBytes);
    });
  }
};
var defaultFormatter = null;
var nextPollId = 1;
var BaseProvider = class extends Provider {
  constructor(network) {
    logger30.checkNew(new.target, Provider);
    super();
    this._events = [];
    this._emitted = { block: -2 };
    this.formatter = new.target.getFormatter();
    defineReadOnly(this, "anyNetwork", network === "any");
    if (this.anyNetwork) {
      network = this.detectNetwork();
    }
    if (network instanceof Promise) {
      this._networkPromise = network;
      network.catch((error) => {
      });
      this._ready().catch((error) => {
      });
    } else {
      const knownNetwork = getStatic(new.target, "getNetwork")(network);
      if (knownNetwork) {
        defineReadOnly(this, "_network", knownNetwork);
        this.emit("network", knownNetwork, null);
      } else {
        logger30.throwArgumentError("invalid network", "network", network);
      }
    }
    this._maxInternalBlockNumber = -1024;
    this._lastBlockNumber = -2;
    this._pollingInterval = 4e3;
    this._fastQueryDate = 0;
  }
  _ready() {
    return __awaiter10(this, void 0, void 0, function* () {
      if (this._network == null) {
        let network = null;
        if (this._networkPromise) {
          try {
            network = yield this._networkPromise;
          } catch (error) {
          }
        }
        if (network == null) {
          network = yield this.detectNetwork();
        }
        if (!network) {
          logger30.throwError("no network detected", Logger.errors.UNKNOWN_ERROR, {});
        }
        if (this._network == null) {
          if (this.anyNetwork) {
            this._network = network;
          } else {
            defineReadOnly(this, "_network", network);
          }
          this.emit("network", network, null);
        }
      }
      return this._network;
    });
  }
  get ready() {
    return poll(() => {
      return this._ready().then((network) => {
        return network;
      }, (error) => {
        if (error.code === Logger.errors.NETWORK_ERROR && error.event === "noNetwork") {
          return void 0;
        }
        throw error;
      });
    });
  }
  static getFormatter() {
    if (defaultFormatter == null) {
      defaultFormatter = new Formatter();
    }
    return defaultFormatter;
  }
  static getNetwork(network) {
    return getNetwork(network == null ? "homestead" : network);
  }
  _getInternalBlockNumber(maxAge) {
    return __awaiter10(this, void 0, void 0, function* () {
      yield this._ready();
      if (maxAge > 0) {
        while (this._internalBlockNumber) {
          const internalBlockNumber = this._internalBlockNumber;
          try {
            const result = yield internalBlockNumber;
            if (getTime() - result.respTime <= maxAge) {
              return result.blockNumber;
            }
            break;
          } catch (error) {
            if (this._internalBlockNumber === internalBlockNumber) {
              break;
            }
          }
        }
      }
      const reqTime = getTime();
      const checkInternalBlockNumber = resolveProperties({
        blockNumber: this.perform("getBlockNumber", {}),
        networkError: this.getNetwork().then((network) => null, (error) => error)
      }).then(({ blockNumber, networkError }) => {
        if (networkError) {
          if (this._internalBlockNumber === checkInternalBlockNumber) {
            this._internalBlockNumber = null;
          }
          throw networkError;
        }
        const respTime = getTime();
        blockNumber = BigNumber.from(blockNumber).toNumber();
        if (blockNumber < this._maxInternalBlockNumber) {
          blockNumber = this._maxInternalBlockNumber;
        }
        this._maxInternalBlockNumber = blockNumber;
        this._setFastBlockNumber(blockNumber);
        return { blockNumber, reqTime, respTime };
      });
      this._internalBlockNumber = checkInternalBlockNumber;
      checkInternalBlockNumber.catch((error) => {
        if (this._internalBlockNumber === checkInternalBlockNumber) {
          this._internalBlockNumber = null;
        }
      });
      return (yield checkInternalBlockNumber).blockNumber;
    });
  }
  poll() {
    return __awaiter10(this, void 0, void 0, function* () {
      const pollId = nextPollId++;
      const runners = [];
      let blockNumber = null;
      try {
        blockNumber = yield this._getInternalBlockNumber(100 + this.pollingInterval / 2);
      } catch (error) {
        this.emit("error", error);
        return;
      }
      this._setFastBlockNumber(blockNumber);
      this.emit("poll", pollId, blockNumber);
      if (blockNumber === this._lastBlockNumber) {
        this.emit("didPoll", pollId);
        return;
      }
      if (this._emitted.block === -2) {
        this._emitted.block = blockNumber - 1;
      }
      if (Math.abs(this._emitted.block - blockNumber) > 1e3) {
        logger30.warn(`network block skew detected; skipping block events (emitted=${this._emitted.block} blockNumber${blockNumber})`);
        this.emit("error", logger30.makeError("network block skew detected", Logger.errors.NETWORK_ERROR, {
          blockNumber,
          event: "blockSkew",
          previousBlockNumber: this._emitted.block
        }));
        this.emit("block", blockNumber);
      } else {
        for (let i3 = this._emitted.block + 1; i3 <= blockNumber; i3++) {
          this.emit("block", i3);
        }
      }
      if (this._emitted.block !== blockNumber) {
        this._emitted.block = blockNumber;
        Object.keys(this._emitted).forEach((key2) => {
          if (key2 === "block") {
            return;
          }
          const eventBlockNumber = this._emitted[key2];
          if (eventBlockNumber === "pending") {
            return;
          }
          if (blockNumber - eventBlockNumber > 12) {
            delete this._emitted[key2];
          }
        });
      }
      if (this._lastBlockNumber === -2) {
        this._lastBlockNumber = blockNumber - 1;
      }
      this._events.forEach((event) => {
        switch (event.type) {
          case "tx": {
            const hash3 = event.hash;
            let runner = this.getTransactionReceipt(hash3).then((receipt) => {
              if (!receipt || receipt.blockNumber == null) {
                return null;
              }
              this._emitted["t:" + hash3] = receipt.blockNumber;
              this.emit(hash3, receipt);
              return null;
            }).catch((error) => {
              this.emit("error", error);
            });
            runners.push(runner);
            break;
          }
          case "filter": {
            const filter2 = event.filter;
            filter2.fromBlock = this._lastBlockNumber + 1;
            filter2.toBlock = blockNumber;
            const runner = this.getLogs(filter2).then((logs) => {
              if (logs.length === 0) {
                return;
              }
              logs.forEach((log) => {
                this._emitted["b:" + log.blockHash] = log.blockNumber;
                this._emitted["t:" + log.transactionHash] = log.blockNumber;
                this.emit(filter2, log);
              });
            }).catch((error) => {
              this.emit("error", error);
            });
            runners.push(runner);
            break;
          }
        }
      });
      this._lastBlockNumber = blockNumber;
      Promise.all(runners).then(() => {
        this.emit("didPoll", pollId);
      }).catch((error) => {
        this.emit("error", error);
      });
      return;
    });
  }
  resetEventsBlock(blockNumber) {
    this._lastBlockNumber = blockNumber - 1;
    if (this.polling) {
      this.poll();
    }
  }
  get network() {
    return this._network;
  }
  detectNetwork() {
    return __awaiter10(this, void 0, void 0, function* () {
      return logger30.throwError("provider does not support network detection", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "provider.detectNetwork"
      });
    });
  }
  getNetwork() {
    return __awaiter10(this, void 0, void 0, function* () {
      const network = yield this._ready();
      const currentNetwork = yield this.detectNetwork();
      if (network.chainId !== currentNetwork.chainId) {
        if (this.anyNetwork) {
          this._network = currentNetwork;
          this._lastBlockNumber = -2;
          this._fastBlockNumber = null;
          this._fastBlockNumberPromise = null;
          this._fastQueryDate = 0;
          this._emitted.block = -2;
          this._maxInternalBlockNumber = -1024;
          this._internalBlockNumber = null;
          this.emit("network", currentNetwork, network);
          yield stall(0);
          return this._network;
        }
        const error = logger30.makeError("underlying network changed", Logger.errors.NETWORK_ERROR, {
          event: "changed",
          network,
          detectedNetwork: currentNetwork
        });
        this.emit("error", error);
        throw error;
      }
      return network;
    });
  }
  get blockNumber() {
    this._getInternalBlockNumber(100 + this.pollingInterval / 2).then((blockNumber) => {
      this._setFastBlockNumber(blockNumber);
    }, (error) => {
    });
    return this._fastBlockNumber != null ? this._fastBlockNumber : -1;
  }
  get polling() {
    return this._poller != null;
  }
  set polling(value) {
    if (value && !this._poller) {
      this._poller = setInterval(() => {
        this.poll();
      }, this.pollingInterval);
      if (!this._bootstrapPoll) {
        this._bootstrapPoll = setTimeout(() => {
          this.poll();
          this._bootstrapPoll = setTimeout(() => {
            if (!this._poller) {
              this.poll();
            }
            this._bootstrapPoll = null;
          }, this.pollingInterval);
        }, 0);
      }
    } else if (!value && this._poller) {
      clearInterval(this._poller);
      this._poller = null;
    }
  }
  get pollingInterval() {
    return this._pollingInterval;
  }
  set pollingInterval(value) {
    if (typeof value !== "number" || value <= 0 || parseInt(String(value)) != value) {
      throw new Error("invalid polling interval");
    }
    this._pollingInterval = value;
    if (this._poller) {
      clearInterval(this._poller);
      this._poller = setInterval(() => {
        this.poll();
      }, this._pollingInterval);
    }
  }
  _getFastBlockNumber() {
    const now2 = getTime();
    if (now2 - this._fastQueryDate > 2 * this._pollingInterval) {
      this._fastQueryDate = now2;
      this._fastBlockNumberPromise = this.getBlockNumber().then((blockNumber) => {
        if (this._fastBlockNumber == null || blockNumber > this._fastBlockNumber) {
          this._fastBlockNumber = blockNumber;
        }
        return this._fastBlockNumber;
      });
    }
    return this._fastBlockNumberPromise;
  }
  _setFastBlockNumber(blockNumber) {
    if (this._fastBlockNumber != null && blockNumber < this._fastBlockNumber) {
      return;
    }
    this._fastQueryDate = getTime();
    if (this._fastBlockNumber == null || blockNumber > this._fastBlockNumber) {
      this._fastBlockNumber = blockNumber;
      this._fastBlockNumberPromise = Promise.resolve(blockNumber);
    }
  }
  waitForTransaction(transactionHash, confirmations, timeout) {
    return __awaiter10(this, void 0, void 0, function* () {
      return this._waitForTransaction(transactionHash, confirmations == null ? 1 : confirmations, timeout || 0, null);
    });
  }
  _waitForTransaction(transactionHash, confirmations, timeout, replaceable) {
    return __awaiter10(this, void 0, void 0, function* () {
      const receipt = yield this.getTransactionReceipt(transactionHash);
      if ((receipt ? receipt.confirmations : 0) >= confirmations) {
        return receipt;
      }
      return new Promise((resolve, reject) => {
        const cancelFuncs = [];
        let done = false;
        const alreadyDone = function() {
          if (done) {
            return true;
          }
          done = true;
          cancelFuncs.forEach((func) => {
            func();
          });
          return false;
        };
        const minedHandler = (receipt2) => {
          if (receipt2.confirmations < confirmations) {
            return;
          }
          if (alreadyDone()) {
            return;
          }
          resolve(receipt2);
        };
        this.on(transactionHash, minedHandler);
        cancelFuncs.push(() => {
          this.removeListener(transactionHash, minedHandler);
        });
        if (replaceable) {
          let lastBlockNumber = replaceable.startBlock;
          let scannedBlock = null;
          const replaceHandler = (blockNumber) => __awaiter10(this, void 0, void 0, function* () {
            if (done) {
              return;
            }
            yield stall(1e3);
            this.getTransactionCount(replaceable.from).then((nonce) => __awaiter10(this, void 0, void 0, function* () {
              if (done) {
                return;
              }
              if (nonce <= replaceable.nonce) {
                lastBlockNumber = blockNumber;
              } else {
                {
                  const mined = yield this.getTransaction(transactionHash);
                  if (mined && mined.blockNumber != null) {
                    return;
                  }
                }
                if (scannedBlock == null) {
                  scannedBlock = lastBlockNumber - 3;
                  if (scannedBlock < replaceable.startBlock) {
                    scannedBlock = replaceable.startBlock;
                  }
                }
                while (scannedBlock <= blockNumber) {
                  if (done) {
                    return;
                  }
                  const block = yield this.getBlockWithTransactions(scannedBlock);
                  for (let ti = 0; ti < block.transactions.length; ti++) {
                    const tx = block.transactions[ti];
                    if (tx.hash === transactionHash) {
                      return;
                    }
                    if (tx.from === replaceable.from && tx.nonce === replaceable.nonce) {
                      if (done) {
                        return;
                      }
                      const receipt2 = yield this.waitForTransaction(tx.hash, confirmations);
                      if (alreadyDone()) {
                        return;
                      }
                      let reason = "replaced";
                      if (tx.data === replaceable.data && tx.to === replaceable.to && tx.value.eq(replaceable.value)) {
                        reason = "repriced";
                      } else if (tx.data === "0x" && tx.from === tx.to && tx.value.isZero()) {
                        reason = "cancelled";
                      }
                      reject(logger30.makeError("transaction was replaced", Logger.errors.TRANSACTION_REPLACED, {
                        cancelled: reason === "replaced" || reason === "cancelled",
                        reason,
                        replacement: this._wrapTransaction(tx),
                        hash: transactionHash,
                        receipt: receipt2
                      }));
                      return;
                    }
                  }
                  scannedBlock++;
                }
              }
              if (done) {
                return;
              }
              this.once("block", replaceHandler);
            }), (error) => {
              if (done) {
                return;
              }
              this.once("block", replaceHandler);
            });
          });
          if (done) {
            return;
          }
          this.once("block", replaceHandler);
          cancelFuncs.push(() => {
            this.removeListener("block", replaceHandler);
          });
        }
        if (typeof timeout === "number" && timeout > 0) {
          const timer2 = setTimeout(() => {
            if (alreadyDone()) {
              return;
            }
            reject(logger30.makeError("timeout exceeded", Logger.errors.TIMEOUT, { timeout }));
          }, timeout);
          if (timer2.unref) {
            timer2.unref();
          }
          cancelFuncs.push(() => {
            clearTimeout(timer2);
          });
        }
      });
    });
  }
  getBlockNumber() {
    return __awaiter10(this, void 0, void 0, function* () {
      return this._getInternalBlockNumber(0);
    });
  }
  getGasPrice() {
    return __awaiter10(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const result = yield this.perform("getGasPrice", {});
      try {
        return BigNumber.from(result);
      } catch (error) {
        return logger30.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
          method: "getGasPrice",
          result,
          error
        });
      }
    });
  }
  getBalance(addressOrName, blockTag) {
    return __awaiter10(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield resolveProperties({
        address: this._getAddress(addressOrName),
        blockTag: this._getBlockTag(blockTag)
      });
      const result = yield this.perform("getBalance", params);
      try {
        return BigNumber.from(result);
      } catch (error) {
        return logger30.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
          method: "getBalance",
          params,
          result,
          error
        });
      }
    });
  }
  getTransactionCount(addressOrName, blockTag) {
    return __awaiter10(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield resolveProperties({
        address: this._getAddress(addressOrName),
        blockTag: this._getBlockTag(blockTag)
      });
      const result = yield this.perform("getTransactionCount", params);
      try {
        return BigNumber.from(result).toNumber();
      } catch (error) {
        return logger30.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
          method: "getTransactionCount",
          params,
          result,
          error
        });
      }
    });
  }
  getCode(addressOrName, blockTag) {
    return __awaiter10(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield resolveProperties({
        address: this._getAddress(addressOrName),
        blockTag: this._getBlockTag(blockTag)
      });
      const result = yield this.perform("getCode", params);
      try {
        return hexlify(result);
      } catch (error) {
        return logger30.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
          method: "getCode",
          params,
          result,
          error
        });
      }
    });
  }
  getStorageAt(addressOrName, position, blockTag) {
    return __awaiter10(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield resolveProperties({
        address: this._getAddress(addressOrName),
        blockTag: this._getBlockTag(blockTag),
        position: Promise.resolve(position).then((p2) => hexValue(p2))
      });
      const result = yield this.perform("getStorageAt", params);
      try {
        return hexlify(result);
      } catch (error) {
        return logger30.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
          method: "getStorageAt",
          params,
          result,
          error
        });
      }
    });
  }
  _wrapTransaction(tx, hash3, startBlock) {
    if (hash3 != null && hexDataLength(hash3) !== 32) {
      throw new Error("invalid response - sendTransaction");
    }
    const result = tx;
    if (hash3 != null && tx.hash !== hash3) {
      logger30.throwError("Transaction hash mismatch from Provider.sendTransaction.", Logger.errors.UNKNOWN_ERROR, { expectedHash: tx.hash, returnedHash: hash3 });
    }
    result.wait = (confirms, timeout) => __awaiter10(this, void 0, void 0, function* () {
      if (confirms == null) {
        confirms = 1;
      }
      if (timeout == null) {
        timeout = 0;
      }
      let replacement = void 0;
      if (confirms !== 0 && startBlock != null) {
        replacement = {
          data: tx.data,
          from: tx.from,
          nonce: tx.nonce,
          to: tx.to,
          value: tx.value,
          startBlock
        };
      }
      const receipt = yield this._waitForTransaction(tx.hash, confirms, timeout, replacement);
      if (receipt == null && confirms === 0) {
        return null;
      }
      this._emitted["t:" + tx.hash] = receipt.blockNumber;
      if (receipt.status === 0) {
        logger30.throwError("transaction failed", Logger.errors.CALL_EXCEPTION, {
          transactionHash: tx.hash,
          transaction: tx,
          receipt
        });
      }
      return receipt;
    });
    return result;
  }
  sendTransaction(signedTransaction) {
    return __awaiter10(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const hexTx = yield Promise.resolve(signedTransaction).then((t3) => hexlify(t3));
      const tx = this.formatter.transaction(signedTransaction);
      if (tx.confirmations == null) {
        tx.confirmations = 0;
      }
      const blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
      try {
        const hash3 = yield this.perform("sendTransaction", { signedTransaction: hexTx });
        return this._wrapTransaction(tx, hash3, blockNumber);
      } catch (error) {
        error.transaction = tx;
        error.transactionHash = tx.hash;
        throw error;
      }
    });
  }
  _getTransactionRequest(transaction) {
    return __awaiter10(this, void 0, void 0, function* () {
      const values = yield transaction;
      const tx = {};
      ["from", "to"].forEach((key2) => {
        if (values[key2] == null) {
          return;
        }
        tx[key2] = Promise.resolve(values[key2]).then((v3) => v3 ? this._getAddress(v3) : null);
      });
      ["gasLimit", "gasPrice", "maxFeePerGas", "maxPriorityFeePerGas", "value"].forEach((key2) => {
        if (values[key2] == null) {
          return;
        }
        tx[key2] = Promise.resolve(values[key2]).then((v3) => v3 ? BigNumber.from(v3) : null);
      });
      ["type"].forEach((key2) => {
        if (values[key2] == null) {
          return;
        }
        tx[key2] = Promise.resolve(values[key2]).then((v3) => v3 != null ? v3 : null);
      });
      if (values.accessList) {
        tx.accessList = this.formatter.accessList(values.accessList);
      }
      ["data"].forEach((key2) => {
        if (values[key2] == null) {
          return;
        }
        tx[key2] = Promise.resolve(values[key2]).then((v3) => v3 ? hexlify(v3) : null);
      });
      return this.formatter.transactionRequest(yield resolveProperties(tx));
    });
  }
  _getFilter(filter2) {
    return __awaiter10(this, void 0, void 0, function* () {
      filter2 = yield filter2;
      const result = {};
      if (filter2.address != null) {
        result.address = this._getAddress(filter2.address);
      }
      ["blockHash", "topics"].forEach((key2) => {
        if (filter2[key2] == null) {
          return;
        }
        result[key2] = filter2[key2];
      });
      ["fromBlock", "toBlock"].forEach((key2) => {
        if (filter2[key2] == null) {
          return;
        }
        result[key2] = this._getBlockTag(filter2[key2]);
      });
      return this.formatter.filter(yield resolveProperties(result));
    });
  }
  call(transaction, blockTag) {
    return __awaiter10(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield resolveProperties({
        transaction: this._getTransactionRequest(transaction),
        blockTag: this._getBlockTag(blockTag)
      });
      const result = yield this.perform("call", params);
      try {
        return hexlify(result);
      } catch (error) {
        return logger30.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
          method: "call",
          params,
          result,
          error
        });
      }
    });
  }
  estimateGas(transaction) {
    return __awaiter10(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield resolveProperties({
        transaction: this._getTransactionRequest(transaction)
      });
      const result = yield this.perform("estimateGas", params);
      try {
        return BigNumber.from(result);
      } catch (error) {
        return logger30.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
          method: "estimateGas",
          params,
          result,
          error
        });
      }
    });
  }
  _getAddress(addressOrName) {
    return __awaiter10(this, void 0, void 0, function* () {
      addressOrName = yield addressOrName;
      if (typeof addressOrName !== "string") {
        logger30.throwArgumentError("invalid address or ENS name", "name", addressOrName);
      }
      const address = yield this.resolveName(addressOrName);
      if (address == null) {
        logger30.throwError("ENS name not configured", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: `resolveName(${JSON.stringify(addressOrName)})`
        });
      }
      return address;
    });
  }
  _getBlock(blockHashOrBlockTag, includeTransactions) {
    return __awaiter10(this, void 0, void 0, function* () {
      yield this.getNetwork();
      blockHashOrBlockTag = yield blockHashOrBlockTag;
      let blockNumber = -128;
      const params = {
        includeTransactions: !!includeTransactions
      };
      if (isHexString(blockHashOrBlockTag, 32)) {
        params.blockHash = blockHashOrBlockTag;
      } else {
        try {
          params.blockTag = yield this._getBlockTag(blockHashOrBlockTag);
          if (isHexString(params.blockTag)) {
            blockNumber = parseInt(params.blockTag.substring(2), 16);
          }
        } catch (error) {
          logger30.throwArgumentError("invalid block hash or block tag", "blockHashOrBlockTag", blockHashOrBlockTag);
        }
      }
      return poll(() => __awaiter10(this, void 0, void 0, function* () {
        const block = yield this.perform("getBlock", params);
        if (block == null) {
          if (params.blockHash != null) {
            if (this._emitted["b:" + params.blockHash] == null) {
              return null;
            }
          }
          if (params.blockTag != null) {
            if (blockNumber > this._emitted.block) {
              return null;
            }
          }
          return void 0;
        }
        if (includeTransactions) {
          let blockNumber2 = null;
          for (let i3 = 0; i3 < block.transactions.length; i3++) {
            const tx = block.transactions[i3];
            if (tx.blockNumber == null) {
              tx.confirmations = 0;
            } else if (tx.confirmations == null) {
              if (blockNumber2 == null) {
                blockNumber2 = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
              }
              let confirmations = blockNumber2 - tx.blockNumber + 1;
              if (confirmations <= 0) {
                confirmations = 1;
              }
              tx.confirmations = confirmations;
            }
          }
          const blockWithTxs = this.formatter.blockWithTransactions(block);
          blockWithTxs.transactions = blockWithTxs.transactions.map((tx) => this._wrapTransaction(tx));
          return blockWithTxs;
        }
        return this.formatter.block(block);
      }), { oncePoll: this });
    });
  }
  getBlock(blockHashOrBlockTag) {
    return this._getBlock(blockHashOrBlockTag, false);
  }
  getBlockWithTransactions(blockHashOrBlockTag) {
    return this._getBlock(blockHashOrBlockTag, true);
  }
  getTransaction(transactionHash) {
    return __awaiter10(this, void 0, void 0, function* () {
      yield this.getNetwork();
      transactionHash = yield transactionHash;
      const params = { transactionHash: this.formatter.hash(transactionHash, true) };
      return poll(() => __awaiter10(this, void 0, void 0, function* () {
        const result = yield this.perform("getTransaction", params);
        if (result == null) {
          if (this._emitted["t:" + transactionHash] == null) {
            return null;
          }
          return void 0;
        }
        const tx = this.formatter.transactionResponse(result);
        if (tx.blockNumber == null) {
          tx.confirmations = 0;
        } else if (tx.confirmations == null) {
          const blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
          let confirmations = blockNumber - tx.blockNumber + 1;
          if (confirmations <= 0) {
            confirmations = 1;
          }
          tx.confirmations = confirmations;
        }
        return this._wrapTransaction(tx);
      }), { oncePoll: this });
    });
  }
  getTransactionReceipt(transactionHash) {
    return __awaiter10(this, void 0, void 0, function* () {
      yield this.getNetwork();
      transactionHash = yield transactionHash;
      const params = { transactionHash: this.formatter.hash(transactionHash, true) };
      return poll(() => __awaiter10(this, void 0, void 0, function* () {
        const result = yield this.perform("getTransactionReceipt", params);
        if (result == null) {
          if (this._emitted["t:" + transactionHash] == null) {
            return null;
          }
          return void 0;
        }
        if (result.blockHash == null) {
          return void 0;
        }
        const receipt = this.formatter.receipt(result);
        if (receipt.blockNumber == null) {
          receipt.confirmations = 0;
        } else if (receipt.confirmations == null) {
          const blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
          let confirmations = blockNumber - receipt.blockNumber + 1;
          if (confirmations <= 0) {
            confirmations = 1;
          }
          receipt.confirmations = confirmations;
        }
        return receipt;
      }), { oncePoll: this });
    });
  }
  getLogs(filter2) {
    return __awaiter10(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const params = yield resolveProperties({ filter: this._getFilter(filter2) });
      const logs = yield this.perform("getLogs", params);
      logs.forEach((log) => {
        if (log.removed == null) {
          log.removed = false;
        }
      });
      return Formatter.arrayOf(this.formatter.filterLog.bind(this.formatter))(logs);
    });
  }
  getEtherPrice() {
    return __awaiter10(this, void 0, void 0, function* () {
      yield this.getNetwork();
      return this.perform("getEtherPrice", {});
    });
  }
  _getBlockTag(blockTag) {
    return __awaiter10(this, void 0, void 0, function* () {
      blockTag = yield blockTag;
      if (typeof blockTag === "number" && blockTag < 0) {
        if (blockTag % 1) {
          logger30.throwArgumentError("invalid BlockTag", "blockTag", blockTag);
        }
        let blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
        blockNumber += blockTag;
        if (blockNumber < 0) {
          blockNumber = 0;
        }
        return this.formatter.blockTag(blockNumber);
      }
      return this.formatter.blockTag(blockTag);
    });
  }
  getResolver(name2) {
    return __awaiter10(this, void 0, void 0, function* () {
      try {
        const address = yield this._getResolver(name2);
        if (address == null) {
          return null;
        }
        return new Resolver(this, address, name2);
      } catch (error) {
        if (error.code === Logger.errors.CALL_EXCEPTION) {
          return null;
        }
        return null;
      }
    });
  }
  _getResolver(name2) {
    return __awaiter10(this, void 0, void 0, function* () {
      const network = yield this.getNetwork();
      if (!network.ensAddress) {
        logger30.throwError("network does not support ENS", Logger.errors.UNSUPPORTED_OPERATION, { operation: "ENS", network: network.name });
      }
      const transaction = {
        to: network.ensAddress,
        data: "0x0178b8bf" + namehash(name2).substring(2)
      };
      try {
        return this.formatter.callAddress(yield this.call(transaction));
      } catch (error) {
        if (error.code === Logger.errors.CALL_EXCEPTION) {
          return null;
        }
        throw error;
      }
    });
  }
  resolveName(name2) {
    return __awaiter10(this, void 0, void 0, function* () {
      name2 = yield name2;
      try {
        return Promise.resolve(this.formatter.address(name2));
      } catch (error) {
        if (isHexString(name2)) {
          throw error;
        }
      }
      if (typeof name2 !== "string") {
        logger30.throwArgumentError("invalid ENS name", "name", name2);
      }
      const resolver = yield this.getResolver(name2);
      if (!resolver) {
        return null;
      }
      return yield resolver.getAddress();
    });
  }
  lookupAddress(address) {
    return __awaiter10(this, void 0, void 0, function* () {
      address = yield address;
      address = this.formatter.address(address);
      const reverseName = address.substring(2).toLowerCase() + ".addr.reverse";
      const resolverAddress = yield this._getResolver(reverseName);
      if (!resolverAddress) {
        return null;
      }
      let bytes = arrayify(yield this.call({
        to: resolverAddress,
        data: "0x691f3431" + namehash(reverseName).substring(2)
      }));
      if (bytes.length < 32 || !BigNumber.from(bytes.slice(0, 32)).eq(32)) {
        return null;
      }
      bytes = bytes.slice(32);
      if (bytes.length < 32) {
        return null;
      }
      const length = BigNumber.from(bytes.slice(0, 32)).toNumber();
      bytes = bytes.slice(32);
      if (length > bytes.length) {
        return null;
      }
      const name2 = toUtf8String(bytes.slice(0, length));
      const addr = yield this.resolveName(name2);
      if (addr != address) {
        return null;
      }
      return name2;
    });
  }
  getAvatar(nameOrAddress) {
    return __awaiter10(this, void 0, void 0, function* () {
      let resolver = null;
      if (isHexString(nameOrAddress)) {
        const address = this.formatter.address(nameOrAddress);
        const reverseName = address.substring(2).toLowerCase() + ".addr.reverse";
        const resolverAddress = yield this._getResolver(reverseName);
        if (!resolverAddress) {
          return null;
        }
        resolver = new Resolver(this, resolverAddress, "_", address);
      } else {
        resolver = yield this.getResolver(nameOrAddress);
      }
      const avatar = yield resolver.getAvatar();
      if (avatar == null) {
        return null;
      }
      return avatar.url;
    });
  }
  perform(method, params) {
    return logger30.throwError(method + " not implemented", Logger.errors.NOT_IMPLEMENTED, { operation: method });
  }
  _startEvent(event) {
    this.polling = this._events.filter((e3) => e3.pollable()).length > 0;
  }
  _stopEvent(event) {
    this.polling = this._events.filter((e3) => e3.pollable()).length > 0;
  }
  _addEventListener(eventName, listener, once) {
    const event = new Event2(getEventTag2(eventName), listener, once);
    this._events.push(event);
    this._startEvent(event);
    return this;
  }
  on(eventName, listener) {
    return this._addEventListener(eventName, listener, false);
  }
  once(eventName, listener) {
    return this._addEventListener(eventName, listener, true);
  }
  emit(eventName, ...args) {
    let result = false;
    let stopped = [];
    let eventTag = getEventTag2(eventName);
    this._events = this._events.filter((event) => {
      if (event.tag !== eventTag) {
        return true;
      }
      setTimeout(() => {
        event.listener.apply(this, args);
      }, 0);
      result = true;
      if (event.once) {
        stopped.push(event);
        return false;
      }
      return true;
    });
    stopped.forEach((event) => {
      this._stopEvent(event);
    });
    return result;
  }
  listenerCount(eventName) {
    if (!eventName) {
      return this._events.length;
    }
    let eventTag = getEventTag2(eventName);
    return this._events.filter((event) => {
      return event.tag === eventTag;
    }).length;
  }
  listeners(eventName) {
    if (eventName == null) {
      return this._events.map((event) => event.listener);
    }
    let eventTag = getEventTag2(eventName);
    return this._events.filter((event) => event.tag === eventTag).map((event) => event.listener);
  }
  off(eventName, listener) {
    if (listener == null) {
      return this.removeAllListeners(eventName);
    }
    const stopped = [];
    let found = false;
    let eventTag = getEventTag2(eventName);
    this._events = this._events.filter((event) => {
      if (event.tag !== eventTag || event.listener != listener) {
        return true;
      }
      if (found) {
        return true;
      }
      found = true;
      stopped.push(event);
      return false;
    });
    stopped.forEach((event) => {
      this._stopEvent(event);
    });
    return this;
  }
  removeAllListeners(eventName) {
    let stopped = [];
    if (eventName == null) {
      stopped = this._events;
      this._events = [];
    } else {
      const eventTag = getEventTag2(eventName);
      this._events = this._events.filter((event) => {
        if (event.tag !== eventTag) {
          return true;
        }
        stopped.push(event);
        return false;
      });
    }
    stopped.forEach((event) => {
      this._stopEvent(event);
    });
    return this;
  }
};

// node_modules/@ethersproject/providers/lib.esm/json-rpc-provider.js
"use strict";
var __awaiter11 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var logger31 = new Logger(version23);
var errorGas = ["call", "estimateGas"];
function checkError(method, error, params) {
  if (method === "call" && error.code === Logger.errors.SERVER_ERROR) {
    const e3 = error.error;
    if (e3 && e3.message.match("reverted") && isHexString(e3.data)) {
      return e3.data;
    }
    logger31.throwError("missing revert data in call exception", Logger.errors.CALL_EXCEPTION, {
      error,
      data: "0x"
    });
  }
  let message = error.message;
  if (error.code === Logger.errors.SERVER_ERROR && error.error && typeof error.error.message === "string") {
    message = error.error.message;
  } else if (typeof error.body === "string") {
    message = error.body;
  } else if (typeof error.responseText === "string") {
    message = error.responseText;
  }
  message = (message || "").toLowerCase();
  const transaction = params.transaction || params.signedTransaction;
  if (message.match(/insufficient funds|base fee exceeds gas limit/)) {
    logger31.throwError("insufficient funds for intrinsic transaction cost", Logger.errors.INSUFFICIENT_FUNDS, {
      error,
      method,
      transaction
    });
  }
  if (message.match(/nonce too low/)) {
    logger31.throwError("nonce has already been used", Logger.errors.NONCE_EXPIRED, {
      error,
      method,
      transaction
    });
  }
  if (message.match(/replacement transaction underpriced/)) {
    logger31.throwError("replacement fee too low", Logger.errors.REPLACEMENT_UNDERPRICED, {
      error,
      method,
      transaction
    });
  }
  if (message.match(/only replay-protected/)) {
    logger31.throwError("legacy pre-eip-155 transactions not supported", Logger.errors.UNSUPPORTED_OPERATION, {
      error,
      method,
      transaction
    });
  }
  if (errorGas.indexOf(method) >= 0 && message.match(/gas required exceeds allowance|always failing transaction|execution reverted/)) {
    logger31.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", Logger.errors.UNPREDICTABLE_GAS_LIMIT, {
      error,
      method,
      transaction
    });
  }
  throw error;
}
function timer(timeout) {
  return new Promise(function(resolve) {
    setTimeout(resolve, timeout);
  });
}
function getResult(payload) {
  if (payload.error) {
    const error = new Error(payload.error.message);
    error.code = payload.error.code;
    error.data = payload.error.data;
    throw error;
  }
  return payload.result;
}
function getLowerCase(value) {
  if (value) {
    return value.toLowerCase();
  }
  return value;
}
var _constructorGuard5 = {};
var JsonRpcSigner = class extends Signer {
  constructor(constructorGuard, provider, addressOrIndex) {
    logger31.checkNew(new.target, JsonRpcSigner);
    super();
    if (constructorGuard !== _constructorGuard5) {
      throw new Error("do not call the JsonRpcSigner constructor directly; use provider.getSigner");
    }
    defineReadOnly(this, "provider", provider);
    if (addressOrIndex == null) {
      addressOrIndex = 0;
    }
    if (typeof addressOrIndex === "string") {
      defineReadOnly(this, "_address", this.provider.formatter.address(addressOrIndex));
      defineReadOnly(this, "_index", null);
    } else if (typeof addressOrIndex === "number") {
      defineReadOnly(this, "_index", addressOrIndex);
      defineReadOnly(this, "_address", null);
    } else {
      logger31.throwArgumentError("invalid address or index", "addressOrIndex", addressOrIndex);
    }
  }
  connect(provider) {
    return logger31.throwError("cannot alter JSON-RPC Signer connection", Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "connect"
    });
  }
  connectUnchecked() {
    return new UncheckedJsonRpcSigner(_constructorGuard5, this.provider, this._address || this._index);
  }
  getAddress() {
    if (this._address) {
      return Promise.resolve(this._address);
    }
    return this.provider.send("eth_accounts", []).then((accounts) => {
      if (accounts.length <= this._index) {
        logger31.throwError("unknown account #" + this._index, Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "getAddress"
        });
      }
      return this.provider.formatter.address(accounts[this._index]);
    });
  }
  sendUncheckedTransaction(transaction) {
    transaction = shallowCopy(transaction);
    const fromAddress = this.getAddress().then((address) => {
      if (address) {
        address = address.toLowerCase();
      }
      return address;
    });
    if (transaction.gasLimit == null) {
      const estimate = shallowCopy(transaction);
      estimate.from = fromAddress;
      transaction.gasLimit = this.provider.estimateGas(estimate);
    }
    if (transaction.to != null) {
      transaction.to = Promise.resolve(transaction.to).then((to) => __awaiter11(this, void 0, void 0, function* () {
        if (to == null) {
          return null;
        }
        const address = yield this.provider.resolveName(to);
        if (address == null) {
          logger31.throwArgumentError("provided ENS name resolves to null", "tx.to", to);
        }
        return address;
      }));
    }
    return resolveProperties({
      tx: resolveProperties(transaction),
      sender: fromAddress
    }).then(({ tx, sender }) => {
      if (tx.from != null) {
        if (tx.from.toLowerCase() !== sender) {
          logger31.throwArgumentError("from address mismatch", "transaction", transaction);
        }
      } else {
        tx.from = sender;
      }
      const hexTx = this.provider.constructor.hexlifyTransaction(tx, { from: true });
      return this.provider.send("eth_sendTransaction", [hexTx]).then((hash3) => {
        return hash3;
      }, (error) => {
        return checkError("sendTransaction", error, hexTx);
      });
    });
  }
  signTransaction(transaction) {
    return logger31.throwError("signing transactions is unsupported", Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "signTransaction"
    });
  }
  sendTransaction(transaction) {
    return __awaiter11(this, void 0, void 0, function* () {
      const blockNumber = yield this.provider._getInternalBlockNumber(100 + 2 * this.provider.pollingInterval);
      const hash3 = yield this.sendUncheckedTransaction(transaction);
      try {
        return yield poll(() => __awaiter11(this, void 0, void 0, function* () {
          const tx = yield this.provider.getTransaction(hash3);
          if (tx === null) {
            return void 0;
          }
          return this.provider._wrapTransaction(tx, hash3, blockNumber);
        }), { oncePoll: this.provider });
      } catch (error) {
        error.transactionHash = hash3;
        throw error;
      }
    });
  }
  signMessage(message) {
    return __awaiter11(this, void 0, void 0, function* () {
      const data = typeof message === "string" ? toUtf8Bytes(message) : message;
      const address = yield this.getAddress();
      return yield this.provider.send("personal_sign", [hexlify(data), address.toLowerCase()]);
    });
  }
  _legacySignMessage(message) {
    return __awaiter11(this, void 0, void 0, function* () {
      const data = typeof message === "string" ? toUtf8Bytes(message) : message;
      const address = yield this.getAddress();
      return yield this.provider.send("eth_sign", [address.toLowerCase(), hexlify(data)]);
    });
  }
  _signTypedData(domain, types, value) {
    return __awaiter11(this, void 0, void 0, function* () {
      const populated = yield TypedDataEncoder.resolveNames(domain, types, value, (name2) => {
        return this.provider.resolveName(name2);
      });
      const address = yield this.getAddress();
      return yield this.provider.send("eth_signTypedData_v4", [
        address.toLowerCase(),
        JSON.stringify(TypedDataEncoder.getPayload(populated.domain, types, populated.value))
      ]);
    });
  }
  unlock(password) {
    return __awaiter11(this, void 0, void 0, function* () {
      const provider = this.provider;
      const address = yield this.getAddress();
      return provider.send("personal_unlockAccount", [address.toLowerCase(), password, null]);
    });
  }
};
var UncheckedJsonRpcSigner = class extends JsonRpcSigner {
  sendTransaction(transaction) {
    return this.sendUncheckedTransaction(transaction).then((hash3) => {
      return {
        hash: hash3,
        nonce: null,
        gasLimit: null,
        gasPrice: null,
        data: null,
        value: null,
        chainId: null,
        confirmations: 0,
        from: null,
        wait: (confirmations) => {
          return this.provider.waitForTransaction(hash3, confirmations);
        }
      };
    });
  }
};
var allowedTransactionKeys4 = {
  chainId: true,
  data: true,
  gasLimit: true,
  gasPrice: true,
  nonce: true,
  to: true,
  value: true,
  type: true,
  accessList: true,
  maxFeePerGas: true,
  maxPriorityFeePerGas: true
};
var JsonRpcProvider = class extends BaseProvider {
  constructor(url, network) {
    logger31.checkNew(new.target, JsonRpcProvider);
    let networkOrReady = network;
    if (networkOrReady == null) {
      networkOrReady = new Promise((resolve, reject) => {
        setTimeout(() => {
          this.detectNetwork().then((network2) => {
            resolve(network2);
          }, (error) => {
            reject(error);
          });
        }, 0);
      });
    }
    super(networkOrReady);
    if (!url) {
      url = getStatic(this.constructor, "defaultUrl")();
    }
    if (typeof url === "string") {
      defineReadOnly(this, "connection", Object.freeze({
        url
      }));
    } else {
      defineReadOnly(this, "connection", Object.freeze(shallowCopy(url)));
    }
    this._nextId = 42;
  }
  get _cache() {
    if (this._eventLoopCache == null) {
      this._eventLoopCache = {};
    }
    return this._eventLoopCache;
  }
  static defaultUrl() {
    return "http://localhost:8545";
  }
  detectNetwork() {
    if (!this._cache["detectNetwork"]) {
      this._cache["detectNetwork"] = this._uncachedDetectNetwork();
      setTimeout(() => {
        this._cache["detectNetwork"] = null;
      }, 0);
    }
    return this._cache["detectNetwork"];
  }
  _uncachedDetectNetwork() {
    return __awaiter11(this, void 0, void 0, function* () {
      yield timer(0);
      let chainId = null;
      try {
        chainId = yield this.send("eth_chainId", []);
      } catch (error) {
        try {
          chainId = yield this.send("net_version", []);
        } catch (error2) {
        }
      }
      if (chainId != null) {
        const getNetwork2 = getStatic(this.constructor, "getNetwork");
        try {
          return getNetwork2(BigNumber.from(chainId).toNumber());
        } catch (error) {
          return logger31.throwError("could not detect network", Logger.errors.NETWORK_ERROR, {
            chainId,
            event: "invalidNetwork",
            serverError: error
          });
        }
      }
      return logger31.throwError("could not detect network", Logger.errors.NETWORK_ERROR, {
        event: "noNetwork"
      });
    });
  }
  getSigner(addressOrIndex) {
    return new JsonRpcSigner(_constructorGuard5, this, addressOrIndex);
  }
  getUncheckedSigner(addressOrIndex) {
    return this.getSigner(addressOrIndex).connectUnchecked();
  }
  listAccounts() {
    return this.send("eth_accounts", []).then((accounts) => {
      return accounts.map((a3) => this.formatter.address(a3));
    });
  }
  send(method, params) {
    const request = {
      method,
      params,
      id: this._nextId++,
      jsonrpc: "2.0"
    };
    this.emit("debug", {
      action: "request",
      request: deepCopy(request),
      provider: this
    });
    const cache = ["eth_chainId", "eth_blockNumber"].indexOf(method) >= 0;
    if (cache && this._cache[method]) {
      return this._cache[method];
    }
    const result = fetchJson(this.connection, JSON.stringify(request), getResult).then((result2) => {
      this.emit("debug", {
        action: "response",
        request,
        response: result2,
        provider: this
      });
      return result2;
    }, (error) => {
      this.emit("debug", {
        action: "response",
        error,
        request,
        provider: this
      });
      throw error;
    });
    if (cache) {
      this._cache[method] = result;
      setTimeout(() => {
        this._cache[method] = null;
      }, 0);
    }
    return result;
  }
  prepareRequest(method, params) {
    switch (method) {
      case "getBlockNumber":
        return ["eth_blockNumber", []];
      case "getGasPrice":
        return ["eth_gasPrice", []];
      case "getBalance":
        return ["eth_getBalance", [getLowerCase(params.address), params.blockTag]];
      case "getTransactionCount":
        return ["eth_getTransactionCount", [getLowerCase(params.address), params.blockTag]];
      case "getCode":
        return ["eth_getCode", [getLowerCase(params.address), params.blockTag]];
      case "getStorageAt":
        return ["eth_getStorageAt", [getLowerCase(params.address), params.position, params.blockTag]];
      case "sendTransaction":
        return ["eth_sendRawTransaction", [params.signedTransaction]];
      case "getBlock":
        if (params.blockTag) {
          return ["eth_getBlockByNumber", [params.blockTag, !!params.includeTransactions]];
        } else if (params.blockHash) {
          return ["eth_getBlockByHash", [params.blockHash, !!params.includeTransactions]];
        }
        return null;
      case "getTransaction":
        return ["eth_getTransactionByHash", [params.transactionHash]];
      case "getTransactionReceipt":
        return ["eth_getTransactionReceipt", [params.transactionHash]];
      case "call": {
        const hexlifyTransaction = getStatic(this.constructor, "hexlifyTransaction");
        return ["eth_call", [hexlifyTransaction(params.transaction, { from: true }), params.blockTag]];
      }
      case "estimateGas": {
        const hexlifyTransaction = getStatic(this.constructor, "hexlifyTransaction");
        return ["eth_estimateGas", [hexlifyTransaction(params.transaction, { from: true })]];
      }
      case "getLogs":
        if (params.filter && params.filter.address != null) {
          params.filter.address = getLowerCase(params.filter.address);
        }
        return ["eth_getLogs", [params.filter]];
      default:
        break;
    }
    return null;
  }
  perform(method, params) {
    return __awaiter11(this, void 0, void 0, function* () {
      if (method === "call" || method === "estimateGas") {
        const tx = params.transaction;
        if (tx && tx.type != null && BigNumber.from(tx.type).isZero()) {
          if (tx.maxFeePerGas == null && tx.maxPriorityFeePerGas == null) {
            const feeData = yield this.getFeeData();
            if (feeData.maxFeePerGas == null && feeData.maxPriorityFeePerGas == null) {
              params = shallowCopy(params);
              params.transaction = shallowCopy(tx);
              delete params.transaction.type;
            }
          }
        }
      }
      const args = this.prepareRequest(method, params);
      if (args == null) {
        logger31.throwError(method + " not implemented", Logger.errors.NOT_IMPLEMENTED, { operation: method });
      }
      try {
        return yield this.send(args[0], args[1]);
      } catch (error) {
        return checkError(method, error, params);
      }
    });
  }
  _startEvent(event) {
    if (event.tag === "pending") {
      this._startPending();
    }
    super._startEvent(event);
  }
  _startPending() {
    if (this._pendingFilter != null) {
      return;
    }
    const self2 = this;
    const pendingFilter = this.send("eth_newPendingTransactionFilter", []);
    this._pendingFilter = pendingFilter;
    pendingFilter.then(function(filterId) {
      function poll2() {
        self2.send("eth_getFilterChanges", [filterId]).then(function(hashes) {
          if (self2._pendingFilter != pendingFilter) {
            return null;
          }
          let seq = Promise.resolve();
          hashes.forEach(function(hash3) {
            self2._emitted["t:" + hash3.toLowerCase()] = "pending";
            seq = seq.then(function() {
              return self2.getTransaction(hash3).then(function(tx) {
                self2.emit("pending", tx);
                return null;
              });
            });
          });
          return seq.then(function() {
            return timer(1e3);
          });
        }).then(function() {
          if (self2._pendingFilter != pendingFilter) {
            self2.send("eth_uninstallFilter", [filterId]);
            return;
          }
          setTimeout(function() {
            poll2();
          }, 0);
          return null;
        }).catch((error) => {
        });
      }
      poll2();
      return filterId;
    }).catch((error) => {
    });
  }
  _stopEvent(event) {
    if (event.tag === "pending" && this.listenerCount("pending") === 0) {
      this._pendingFilter = null;
    }
    super._stopEvent(event);
  }
  static hexlifyTransaction(transaction, allowExtra) {
    const allowed = shallowCopy(allowedTransactionKeys4);
    if (allowExtra) {
      for (const key2 in allowExtra) {
        if (allowExtra[key2]) {
          allowed[key2] = true;
        }
      }
    }
    checkProperties(transaction, allowed);
    const result = {};
    ["gasLimit", "gasPrice", "type", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "value"].forEach(function(key2) {
      if (transaction[key2] == null) {
        return;
      }
      const value = hexValue(transaction[key2]);
      if (key2 === "gasLimit") {
        key2 = "gas";
      }
      result[key2] = value;
    });
    ["from", "to", "data"].forEach(function(key2) {
      if (transaction[key2] == null) {
        return;
      }
      result[key2] = hexlify(transaction[key2]);
    });
    if (transaction.accessList) {
      result["accessList"] = accessListify(transaction.accessList);
    }
    return result;
  }
};

// node_modules/@ethersproject/providers/lib.esm/ws.js
"use strict";
var WS = null;
try {
  WS = WebSocket;
  if (WS == null) {
    throw new Error("inject please");
  }
} catch (error) {
  const logger46 = new Logger(version23);
  WS = function() {
    logger46.throwError("WebSockets not supported in this environment", Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "new WebSocket()"
    });
  };
}

// node_modules/@ethersproject/providers/lib.esm/websocket-provider.js
"use strict";
var __awaiter12 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var logger32 = new Logger(version23);
var NextId = 1;
var WebSocketProvider = class extends JsonRpcProvider {
  constructor(url, network) {
    if (network === "any") {
      logger32.throwError("WebSocketProvider does not support 'any' network yet", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "network:any"
      });
    }
    super(url, network);
    this._pollingInterval = -1;
    this._wsReady = false;
    defineReadOnly(this, "_websocket", new WS(this.connection.url));
    defineReadOnly(this, "_requests", {});
    defineReadOnly(this, "_subs", {});
    defineReadOnly(this, "_subIds", {});
    defineReadOnly(this, "_detectNetwork", super.detectNetwork());
    this._websocket.onopen = () => {
      this._wsReady = true;
      Object.keys(this._requests).forEach((id2) => {
        this._websocket.send(this._requests[id2].payload);
      });
    };
    this._websocket.onmessage = (messageEvent) => {
      const data = messageEvent.data;
      const result = JSON.parse(data);
      if (result.id != null) {
        const id2 = String(result.id);
        const request = this._requests[id2];
        delete this._requests[id2];
        if (result.result !== void 0) {
          request.callback(null, result.result);
          this.emit("debug", {
            action: "response",
            request: JSON.parse(request.payload),
            response: result.result,
            provider: this
          });
        } else {
          let error = null;
          if (result.error) {
            error = new Error(result.error.message || "unknown error");
            defineReadOnly(error, "code", result.error.code || null);
            defineReadOnly(error, "response", data);
          } else {
            error = new Error("unknown error");
          }
          request.callback(error, void 0);
          this.emit("debug", {
            action: "response",
            error,
            request: JSON.parse(request.payload),
            provider: this
          });
        }
      } else if (result.method === "eth_subscription") {
        const sub = this._subs[result.params.subscription];
        if (sub) {
          sub.processFunc(result.params.result);
        }
      } else {
        console.warn("this should not happen");
      }
    };
    const fauxPoll = setInterval(() => {
      this.emit("poll");
    }, 1e3);
    if (fauxPoll.unref) {
      fauxPoll.unref();
    }
  }
  detectNetwork() {
    return this._detectNetwork;
  }
  get pollingInterval() {
    return 0;
  }
  resetEventsBlock(blockNumber) {
    logger32.throwError("cannot reset events block on WebSocketProvider", Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "resetEventBlock"
    });
  }
  set pollingInterval(value) {
    logger32.throwError("cannot set polling interval on WebSocketProvider", Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "setPollingInterval"
    });
  }
  poll() {
    return __awaiter12(this, void 0, void 0, function* () {
      return null;
    });
  }
  set polling(value) {
    if (!value) {
      return;
    }
    logger32.throwError("cannot set polling on WebSocketProvider", Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "setPolling"
    });
  }
  send(method, params) {
    const rid = NextId++;
    return new Promise((resolve, reject) => {
      function callback(error, result) {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
      const payload = JSON.stringify({
        method,
        params,
        id: rid,
        jsonrpc: "2.0"
      });
      this.emit("debug", {
        action: "request",
        request: JSON.parse(payload),
        provider: this
      });
      this._requests[String(rid)] = { callback, payload };
      if (this._wsReady) {
        this._websocket.send(payload);
      }
    });
  }
  static defaultUrl() {
    return "ws://localhost:8546";
  }
  _subscribe(tag, param, processFunc) {
    return __awaiter12(this, void 0, void 0, function* () {
      let subIdPromise = this._subIds[tag];
      if (subIdPromise == null) {
        subIdPromise = Promise.all(param).then((param2) => {
          return this.send("eth_subscribe", param2);
        });
        this._subIds[tag] = subIdPromise;
      }
      const subId = yield subIdPromise;
      this._subs[subId] = { tag, processFunc };
    });
  }
  _startEvent(event) {
    switch (event.type) {
      case "block":
        this._subscribe("block", ["newHeads"], (result) => {
          const blockNumber = BigNumber.from(result.number).toNumber();
          this._emitted.block = blockNumber;
          this.emit("block", blockNumber);
        });
        break;
      case "pending":
        this._subscribe("pending", ["newPendingTransactions"], (result) => {
          this.emit("pending", result);
        });
        break;
      case "filter":
        this._subscribe(event.tag, ["logs", this._getFilter(event.filter)], (result) => {
          if (result.removed == null) {
            result.removed = false;
          }
          this.emit(event.filter, this.formatter.filterLog(result));
        });
        break;
      case "tx": {
        const emitReceipt = (event2) => {
          const hash3 = event2.hash;
          this.getTransactionReceipt(hash3).then((receipt) => {
            if (!receipt) {
              return;
            }
            this.emit(hash3, receipt);
          });
        };
        emitReceipt(event);
        this._subscribe("tx", ["newHeads"], (result) => {
          this._events.filter((e3) => e3.type === "tx").forEach(emitReceipt);
        });
        break;
      }
      case "debug":
      case "poll":
      case "willPoll":
      case "didPoll":
      case "error":
        break;
      default:
        console.log("unhandled:", event);
        break;
    }
  }
  _stopEvent(event) {
    let tag = event.tag;
    if (event.type === "tx") {
      if (this._events.filter((e3) => e3.type === "tx").length) {
        return;
      }
      tag = "tx";
    } else if (this.listenerCount(event.event)) {
      return;
    }
    const subId = this._subIds[tag];
    if (!subId) {
      return;
    }
    delete this._subIds[tag];
    subId.then((subId2) => {
      if (!this._subs[subId2]) {
        return;
      }
      delete this._subs[subId2];
      this.send("eth_unsubscribe", [subId2]);
    });
  }
  destroy() {
    return __awaiter12(this, void 0, void 0, function* () {
      if (this._websocket.readyState === WS.CONNECTING) {
        yield new Promise((resolve) => {
          this._websocket.onopen = function() {
            resolve(true);
          };
          this._websocket.onerror = function() {
            resolve(false);
          };
        });
      }
      this._websocket.close(1e3);
    });
  }
};

// node_modules/@ethersproject/providers/lib.esm/url-json-rpc-provider.js
"use strict";
var __awaiter13 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var logger33 = new Logger(version23);
var StaticJsonRpcProvider = class extends JsonRpcProvider {
  detectNetwork() {
    const _super = Object.create(null, {
      detectNetwork: { get: () => super.detectNetwork }
    });
    return __awaiter13(this, void 0, void 0, function* () {
      let network = this.network;
      if (network == null) {
        network = yield _super.detectNetwork.call(this);
        if (!network) {
          logger33.throwError("no network detected", Logger.errors.UNKNOWN_ERROR, {});
        }
        if (this._network == null) {
          defineReadOnly(this, "_network", network);
          this.emit("network", network, null);
        }
      }
      return network;
    });
  }
};
var UrlJsonRpcProvider = class extends StaticJsonRpcProvider {
  constructor(network, apiKey) {
    logger33.checkAbstract(new.target, UrlJsonRpcProvider);
    network = getStatic(new.target, "getNetwork")(network);
    apiKey = getStatic(new.target, "getApiKey")(apiKey);
    const connection = getStatic(new.target, "getUrl")(network, apiKey);
    super(connection, network);
    if (typeof apiKey === "string") {
      defineReadOnly(this, "apiKey", apiKey);
    } else if (apiKey != null) {
      Object.keys(apiKey).forEach((key2) => {
        defineReadOnly(this, key2, apiKey[key2]);
      });
    }
  }
  _startPending() {
    logger33.warn("WARNING: API provider does not support pending filters");
  }
  isCommunityResource() {
    return false;
  }
  getSigner(address) {
    return logger33.throwError("API provider does not support signing", Logger.errors.UNSUPPORTED_OPERATION, { operation: "getSigner" });
  }
  listAccounts() {
    return Promise.resolve([]);
  }
  static getApiKey(apiKey) {
    return apiKey;
  }
  static getUrl(network, apiKey) {
    return logger33.throwError("not implemented; sub-classes must override getUrl", Logger.errors.NOT_IMPLEMENTED, {
      operation: "getUrl"
    });
  }
};

// node_modules/@ethersproject/providers/lib.esm/alchemy-provider.js
"use strict";
var logger34 = new Logger(version23);
var defaultApiKey = "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC";
var AlchemyWebSocketProvider = class extends WebSocketProvider {
  constructor(network, apiKey) {
    const provider = new AlchemyProvider(network, apiKey);
    const url = provider.connection.url.replace(/^http/i, "ws").replace(".alchemyapi.", ".ws.alchemyapi.");
    super(url, provider.network);
    defineReadOnly(this, "apiKey", provider.apiKey);
  }
  isCommunityResource() {
    return this.apiKey === defaultApiKey;
  }
};
var AlchemyProvider = class extends UrlJsonRpcProvider {
  static getWebSocketProvider(network, apiKey) {
    return new AlchemyWebSocketProvider(network, apiKey);
  }
  static getApiKey(apiKey) {
    if (apiKey == null) {
      return defaultApiKey;
    }
    if (apiKey && typeof apiKey !== "string") {
      logger34.throwArgumentError("invalid apiKey", "apiKey", apiKey);
    }
    return apiKey;
  }
  static getUrl(network, apiKey) {
    let host = null;
    switch (network.name) {
      case "homestead":
        host = "eth-mainnet.alchemyapi.io/v2/";
        break;
      case "ropsten":
        host = "eth-ropsten.alchemyapi.io/v2/";
        break;
      case "rinkeby":
        host = "eth-rinkeby.alchemyapi.io/v2/";
        break;
      case "goerli":
        host = "eth-goerli.alchemyapi.io/v2/";
        break;
      case "kovan":
        host = "eth-kovan.alchemyapi.io/v2/";
        break;
      case "matic":
        host = "polygon-mainnet.g.alchemy.com/v2/";
        break;
      case "maticmum":
        host = "polygon-mumbai.g.alchemy.com/v2/";
        break;
      default:
        logger34.throwArgumentError("unsupported network", "network", arguments[0]);
    }
    return {
      allowGzip: true,
      url: "https://" + host + apiKey,
      throttleCallback: (attempt, url) => {
        if (apiKey === defaultApiKey) {
          showThrottleMessage();
        }
        return Promise.resolve(true);
      }
    };
  }
  isCommunityResource() {
    return this.apiKey === defaultApiKey;
  }
};

// node_modules/@ethersproject/providers/lib.esm/cloudflare-provider.js
"use strict";
var __awaiter14 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var logger35 = new Logger(version23);
var CloudflareProvider = class extends UrlJsonRpcProvider {
  static getApiKey(apiKey) {
    if (apiKey != null) {
      logger35.throwArgumentError("apiKey not supported for cloudflare", "apiKey", apiKey);
    }
    return null;
  }
  static getUrl(network, apiKey) {
    let host = null;
    switch (network.name) {
      case "homestead":
        host = "https://cloudflare-eth.com/";
        break;
      default:
        logger35.throwArgumentError("unsupported network", "network", arguments[0]);
    }
    return host;
  }
  perform(method, params) {
    const _super = Object.create(null, {
      perform: { get: () => super.perform }
    });
    return __awaiter14(this, void 0, void 0, function* () {
      if (method === "getBlockNumber") {
        const block = yield _super.perform.call(this, "getBlock", { blockTag: "latest" });
        return block.number;
      }
      return _super.perform.call(this, method, params);
    });
  }
};

// node_modules/@ethersproject/providers/lib.esm/etherscan-provider.js
"use strict";
var __awaiter15 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var logger36 = new Logger(version23);
function getTransactionPostData(transaction) {
  const result = {};
  for (let key2 in transaction) {
    if (transaction[key2] == null) {
      continue;
    }
    let value = transaction[key2];
    if (key2 === "type" && value === 0) {
      continue;
    }
    if ({ type: true, gasLimit: true, gasPrice: true, maxFeePerGs: true, maxPriorityFeePerGas: true, nonce: true, value: true }[key2]) {
      value = hexValue(hexlify(value));
    } else if (key2 === "accessList") {
      value = "[" + accessListify(value).map((set) => {
        return `{address:"${set.address}",storageKeys:["${set.storageKeys.join('","')}"]}`;
      }).join(",") + "]";
    } else {
      value = hexlify(value);
    }
    result[key2] = value;
  }
  return result;
}
function getResult2(result) {
  if (result.status == 0 && (result.message === "No records found" || result.message === "No transactions found")) {
    return result.result;
  }
  if (result.status != 1 || result.message != "OK") {
    const error = new Error("invalid response");
    error.result = JSON.stringify(result);
    if ((result.result || "").toLowerCase().indexOf("rate limit") >= 0) {
      error.throttleRetry = true;
    }
    throw error;
  }
  return result.result;
}
function getJsonResult(result) {
  if (result && result.status == 0 && result.message == "NOTOK" && (result.result || "").toLowerCase().indexOf("rate limit") >= 0) {
    const error = new Error("throttled response");
    error.result = JSON.stringify(result);
    error.throttleRetry = true;
    throw error;
  }
  if (result.jsonrpc != "2.0") {
    const error = new Error("invalid response");
    error.result = JSON.stringify(result);
    throw error;
  }
  if (result.error) {
    const error = new Error(result.error.message || "unknown error");
    if (result.error.code) {
      error.code = result.error.code;
    }
    if (result.error.data) {
      error.data = result.error.data;
    }
    throw error;
  }
  return result.result;
}
function checkLogTag(blockTag) {
  if (blockTag === "pending") {
    throw new Error("pending not supported");
  }
  if (blockTag === "latest") {
    return blockTag;
  }
  return parseInt(blockTag.substring(2), 16);
}
var defaultApiKey2 = "9D13ZE7XSBTJ94N9BNJ2MA33VMAY2YPIRB";
function checkError2(method, error, transaction) {
  if (method === "call" && error.code === Logger.errors.SERVER_ERROR) {
    const e3 = error.error;
    if (e3 && (e3.message.match(/reverted/i) || e3.message.match(/VM execution error/i))) {
      let data = e3.data;
      if (data) {
        data = "0x" + data.replace(/^.*0x/i, "");
      }
      if (isHexString(data)) {
        return data;
      }
      logger36.throwError("missing revert data in call exception", Logger.errors.CALL_EXCEPTION, {
        error,
        data: "0x"
      });
    }
  }
  let message = error.message;
  if (error.code === Logger.errors.SERVER_ERROR) {
    if (error.error && typeof error.error.message === "string") {
      message = error.error.message;
    } else if (typeof error.body === "string") {
      message = error.body;
    } else if (typeof error.responseText === "string") {
      message = error.responseText;
    }
  }
  message = (message || "").toLowerCase();
  if (message.match(/insufficient funds/)) {
    logger36.throwError("insufficient funds for intrinsic transaction cost", Logger.errors.INSUFFICIENT_FUNDS, {
      error,
      method,
      transaction
    });
  }
  if (message.match(/same hash was already imported|transaction nonce is too low|nonce too low/)) {
    logger36.throwError("nonce has already been used", Logger.errors.NONCE_EXPIRED, {
      error,
      method,
      transaction
    });
  }
  if (message.match(/another transaction with same nonce/)) {
    logger36.throwError("replacement fee too low", Logger.errors.REPLACEMENT_UNDERPRICED, {
      error,
      method,
      transaction
    });
  }
  if (message.match(/execution failed due to an exception|execution reverted/)) {
    logger36.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", Logger.errors.UNPREDICTABLE_GAS_LIMIT, {
      error,
      method,
      transaction
    });
  }
  throw error;
}
var EtherscanProvider = class extends BaseProvider {
  constructor(network, apiKey) {
    logger36.checkNew(new.target, EtherscanProvider);
    super(network);
    defineReadOnly(this, "baseUrl", this.getBaseUrl());
    defineReadOnly(this, "apiKey", apiKey || defaultApiKey2);
  }
  getBaseUrl() {
    switch (this.network ? this.network.name : "invalid") {
      case "homestead":
        return "https://api.etherscan.io";
      case "ropsten":
        return "https://api-ropsten.etherscan.io";
      case "rinkeby":
        return "https://api-rinkeby.etherscan.io";
      case "kovan":
        return "https://api-kovan.etherscan.io";
      case "goerli":
        return "https://api-goerli.etherscan.io";
      default:
    }
    return logger36.throwArgumentError("unsupported network", "network", name);
  }
  getUrl(module2, params) {
    const query = Object.keys(params).reduce((accum, key2) => {
      const value = params[key2];
      if (value != null) {
        accum += `&${key2}=${value}`;
      }
      return accum;
    }, "");
    const apiKey = this.apiKey ? `&apikey=${this.apiKey}` : "";
    return `${this.baseUrl}/api?module=${module2}${query}${apiKey}`;
  }
  getPostUrl() {
    return `${this.baseUrl}/api`;
  }
  getPostData(module2, params) {
    params.module = module2;
    params.apikey = this.apiKey;
    return params;
  }
  fetch(module2, params, post) {
    return __awaiter15(this, void 0, void 0, function* () {
      const url = post ? this.getPostUrl() : this.getUrl(module2, params);
      const payload = post ? this.getPostData(module2, params) : null;
      const procFunc = module2 === "proxy" ? getJsonResult : getResult2;
      this.emit("debug", {
        action: "request",
        request: url,
        provider: this
      });
      const connection = {
        url,
        throttleSlotInterval: 1e3,
        throttleCallback: (attempt, url2) => {
          if (this.isCommunityResource()) {
            showThrottleMessage();
          }
          return Promise.resolve(true);
        }
      };
      let payloadStr = null;
      if (payload) {
        connection.headers = { "content-type": "application/x-www-form-urlencoded; charset=UTF-8" };
        payloadStr = Object.keys(payload).map((key2) => {
          return `${key2}=${payload[key2]}`;
        }).join("&");
      }
      const result = yield fetchJson(connection, payloadStr, procFunc || getJsonResult);
      this.emit("debug", {
        action: "response",
        request: url,
        response: deepCopy(result),
        provider: this
      });
      return result;
    });
  }
  detectNetwork() {
    return __awaiter15(this, void 0, void 0, function* () {
      return this.network;
    });
  }
  perform(method, params) {
    const _super = Object.create(null, {
      perform: { get: () => super.perform }
    });
    return __awaiter15(this, void 0, void 0, function* () {
      switch (method) {
        case "getBlockNumber":
          return this.fetch("proxy", { action: "eth_blockNumber" });
        case "getGasPrice":
          return this.fetch("proxy", { action: "eth_gasPrice" });
        case "getBalance":
          return this.fetch("account", {
            action: "balance",
            address: params.address,
            tag: params.blockTag
          });
        case "getTransactionCount":
          return this.fetch("proxy", {
            action: "eth_getTransactionCount",
            address: params.address,
            tag: params.blockTag
          });
        case "getCode":
          return this.fetch("proxy", {
            action: "eth_getCode",
            address: params.address,
            tag: params.blockTag
          });
        case "getStorageAt":
          return this.fetch("proxy", {
            action: "eth_getStorageAt",
            address: params.address,
            position: params.position,
            tag: params.blockTag
          });
        case "sendTransaction":
          return this.fetch("proxy", {
            action: "eth_sendRawTransaction",
            hex: params.signedTransaction
          }, true).catch((error) => {
            return checkError2("sendTransaction", error, params.signedTransaction);
          });
        case "getBlock":
          if (params.blockTag) {
            return this.fetch("proxy", {
              action: "eth_getBlockByNumber",
              tag: params.blockTag,
              boolean: params.includeTransactions ? "true" : "false"
            });
          }
          throw new Error("getBlock by blockHash not implemented");
        case "getTransaction":
          return this.fetch("proxy", {
            action: "eth_getTransactionByHash",
            txhash: params.transactionHash
          });
        case "getTransactionReceipt":
          return this.fetch("proxy", {
            action: "eth_getTransactionReceipt",
            txhash: params.transactionHash
          });
        case "call": {
          if (params.blockTag !== "latest") {
            throw new Error("EtherscanProvider does not support blockTag for call");
          }
          const postData = getTransactionPostData(params.transaction);
          postData.module = "proxy";
          postData.action = "eth_call";
          try {
            return yield this.fetch("proxy", postData, true);
          } catch (error) {
            return checkError2("call", error, params.transaction);
          }
        }
        case "estimateGas": {
          const postData = getTransactionPostData(params.transaction);
          postData.module = "proxy";
          postData.action = "eth_estimateGas";
          try {
            return yield this.fetch("proxy", postData, true);
          } catch (error) {
            return checkError2("estimateGas", error, params.transaction);
          }
        }
        case "getLogs": {
          const args = { action: "getLogs" };
          if (params.filter.fromBlock) {
            args.fromBlock = checkLogTag(params.filter.fromBlock);
          }
          if (params.filter.toBlock) {
            args.toBlock = checkLogTag(params.filter.toBlock);
          }
          if (params.filter.address) {
            args.address = params.filter.address;
          }
          if (params.filter.topics && params.filter.topics.length > 0) {
            if (params.filter.topics.length > 1) {
              logger36.throwError("unsupported topic count", Logger.errors.UNSUPPORTED_OPERATION, { topics: params.filter.topics });
            }
            if (params.filter.topics.length === 1) {
              const topic0 = params.filter.topics[0];
              if (typeof topic0 !== "string" || topic0.length !== 66) {
                logger36.throwError("unsupported topic format", Logger.errors.UNSUPPORTED_OPERATION, { topic0 });
              }
              args.topic0 = topic0;
            }
          }
          const logs = yield this.fetch("logs", args);
          let blocks = {};
          for (let i3 = 0; i3 < logs.length; i3++) {
            const log = logs[i3];
            if (log.blockHash != null) {
              continue;
            }
            if (blocks[log.blockNumber] == null) {
              const block = yield this.getBlock(log.blockNumber);
              if (block) {
                blocks[log.blockNumber] = block.hash;
              }
            }
            log.blockHash = blocks[log.blockNumber];
          }
          return logs;
        }
        case "getEtherPrice":
          if (this.network.name !== "homestead") {
            return 0;
          }
          return parseFloat((yield this.fetch("stats", { action: "ethprice" })).ethusd);
        default:
          break;
      }
      return _super.perform.call(this, method, params);
    });
  }
  getHistory(addressOrName, startBlock, endBlock) {
    return __awaiter15(this, void 0, void 0, function* () {
      const params = {
        action: "txlist",
        address: yield this.resolveName(addressOrName),
        startblock: startBlock == null ? 0 : startBlock,
        endblock: endBlock == null ? 99999999 : endBlock,
        sort: "asc"
      };
      const result = yield this.fetch("account", params);
      return result.map((tx) => {
        ["contractAddress", "to"].forEach(function(key2) {
          if (tx[key2] == "") {
            delete tx[key2];
          }
        });
        if (tx.creates == null && tx.contractAddress != null) {
          tx.creates = tx.contractAddress;
        }
        const item = this.formatter.transactionResponse(tx);
        if (tx.timeStamp) {
          item.timestamp = parseInt(tx.timeStamp);
        }
        return item;
      });
    });
  }
  isCommunityResource() {
    return this.apiKey === defaultApiKey2;
  }
};

// node_modules/@ethersproject/providers/lib.esm/fallback-provider.js
"use strict";
var __awaiter16 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var logger37 = new Logger(version23);
function now() {
  return new Date().getTime();
}
function checkNetworks(networks2) {
  let result = null;
  for (let i3 = 0; i3 < networks2.length; i3++) {
    const network = networks2[i3];
    if (network == null) {
      return null;
    }
    if (result) {
      if (!(result.name === network.name && result.chainId === network.chainId && (result.ensAddress === network.ensAddress || result.ensAddress == null && network.ensAddress == null))) {
        logger37.throwArgumentError("provider mismatch", "networks", networks2);
      }
    } else {
      result = network;
    }
  }
  return result;
}
function median(values, maxDelta) {
  values = values.slice().sort();
  const middle = Math.floor(values.length / 2);
  if (values.length % 2) {
    return values[middle];
  }
  const a3 = values[middle - 1], b3 = values[middle];
  if (maxDelta != null && Math.abs(a3 - b3) > maxDelta) {
    return null;
  }
  return (a3 + b3) / 2;
}
function serialize2(value) {
  if (value === null) {
    return "null";
  } else if (typeof value === "number" || typeof value === "boolean") {
    return JSON.stringify(value);
  } else if (typeof value === "string") {
    return value;
  } else if (BigNumber.isBigNumber(value)) {
    return value.toString();
  } else if (Array.isArray(value)) {
    return JSON.stringify(value.map((i3) => serialize2(i3)));
  } else if (typeof value === "object") {
    const keys = Object.keys(value);
    keys.sort();
    return "{" + keys.map((key2) => {
      let v3 = value[key2];
      if (typeof v3 === "function") {
        v3 = "[function]";
      } else {
        v3 = serialize2(v3);
      }
      return JSON.stringify(key2) + ":" + v3;
    }).join(",") + "}";
  }
  throw new Error("unknown value type: " + typeof value);
}
var nextRid = 1;
function stall2(duration) {
  let cancel = null;
  let timer2 = null;
  let promise = new Promise((resolve) => {
    cancel = function() {
      if (timer2) {
        clearTimeout(timer2);
        timer2 = null;
      }
      resolve();
    };
    timer2 = setTimeout(cancel, duration);
  });
  const wait = (func) => {
    promise = promise.then(func);
    return promise;
  };
  function getPromise() {
    return promise;
  }
  return { cancel, getPromise, wait };
}
var ForwardErrors = [
  Logger.errors.CALL_EXCEPTION,
  Logger.errors.INSUFFICIENT_FUNDS,
  Logger.errors.NONCE_EXPIRED,
  Logger.errors.REPLACEMENT_UNDERPRICED,
  Logger.errors.UNPREDICTABLE_GAS_LIMIT
];
var ForwardProperties = [
  "address",
  "args",
  "errorArgs",
  "errorSignature",
  "method",
  "transaction"
];
function exposeDebugConfig(config, now2) {
  const result = {
    weight: config.weight
  };
  Object.defineProperty(result, "provider", { get: () => config.provider });
  if (config.start) {
    result.start = config.start;
  }
  if (now2) {
    result.duration = now2 - config.start;
  }
  if (config.done) {
    if (config.error) {
      result.error = config.error;
    } else {
      result.result = config.result || null;
    }
  }
  return result;
}
function normalizedTally(normalize, quorum) {
  return function(configs) {
    const tally = {};
    configs.forEach((c3) => {
      const value = normalize(c3.result);
      if (!tally[value]) {
        tally[value] = { count: 0, result: c3.result };
      }
      tally[value].count++;
    });
    const keys = Object.keys(tally);
    for (let i3 = 0; i3 < keys.length; i3++) {
      const check = tally[keys[i3]];
      if (check.count >= quorum) {
        return check.result;
      }
    }
    return void 0;
  };
}
function getProcessFunc(provider, method, params) {
  let normalize = serialize2;
  switch (method) {
    case "getBlockNumber":
      return function(configs) {
        const values = configs.map((c3) => c3.result);
        let blockNumber = median(configs.map((c3) => c3.result), 2);
        if (blockNumber == null) {
          return void 0;
        }
        blockNumber = Math.ceil(blockNumber);
        if (values.indexOf(blockNumber + 1) >= 0) {
          blockNumber++;
        }
        if (blockNumber >= provider._highestBlockNumber) {
          provider._highestBlockNumber = blockNumber;
        }
        return provider._highestBlockNumber;
      };
    case "getGasPrice":
      return function(configs) {
        const values = configs.map((c3) => c3.result);
        values.sort();
        return values[Math.floor(values.length / 2)];
      };
    case "getEtherPrice":
      return function(configs) {
        return median(configs.map((c3) => c3.result));
      };
    case "getBalance":
    case "getTransactionCount":
    case "getCode":
    case "getStorageAt":
    case "call":
    case "estimateGas":
    case "getLogs":
      break;
    case "getTransaction":
    case "getTransactionReceipt":
      normalize = function(tx) {
        if (tx == null) {
          return null;
        }
        tx = shallowCopy(tx);
        tx.confirmations = -1;
        return serialize2(tx);
      };
      break;
    case "getBlock":
      if (params.includeTransactions) {
        normalize = function(block) {
          if (block == null) {
            return null;
          }
          block = shallowCopy(block);
          block.transactions = block.transactions.map((tx) => {
            tx = shallowCopy(tx);
            tx.confirmations = -1;
            return tx;
          });
          return serialize2(block);
        };
      } else {
        normalize = function(block) {
          if (block == null) {
            return null;
          }
          return serialize2(block);
        };
      }
      break;
    default:
      throw new Error("unknown method: " + method);
  }
  return normalizedTally(normalize, provider.quorum);
}
function waitForSync(config, blockNumber) {
  return __awaiter16(this, void 0, void 0, function* () {
    const provider = config.provider;
    if (provider.blockNumber != null && provider.blockNumber >= blockNumber || blockNumber === -1) {
      return provider;
    }
    return poll(() => {
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          if (provider.blockNumber >= blockNumber) {
            return resolve(provider);
          }
          if (config.cancelled) {
            return resolve(null);
          }
          return resolve(void 0);
        }, 0);
      });
    }, { oncePoll: provider });
  });
}
function getRunner(config, currentBlockNumber, method, params) {
  return __awaiter16(this, void 0, void 0, function* () {
    let provider = config.provider;
    switch (method) {
      case "getBlockNumber":
      case "getGasPrice":
        return provider[method]();
      case "getEtherPrice":
        if (provider.getEtherPrice) {
          return provider.getEtherPrice();
        }
        break;
      case "getBalance":
      case "getTransactionCount":
      case "getCode":
        if (params.blockTag && isHexString(params.blockTag)) {
          provider = yield waitForSync(config, currentBlockNumber);
        }
        return provider[method](params.address, params.blockTag || "latest");
      case "getStorageAt":
        if (params.blockTag && isHexString(params.blockTag)) {
          provider = yield waitForSync(config, currentBlockNumber);
        }
        return provider.getStorageAt(params.address, params.position, params.blockTag || "latest");
      case "getBlock":
        if (params.blockTag && isHexString(params.blockTag)) {
          provider = yield waitForSync(config, currentBlockNumber);
        }
        return provider[params.includeTransactions ? "getBlockWithTransactions" : "getBlock"](params.blockTag || params.blockHash);
      case "call":
      case "estimateGas":
        if (params.blockTag && isHexString(params.blockTag)) {
          provider = yield waitForSync(config, currentBlockNumber);
        }
        return provider[method](params.transaction);
      case "getTransaction":
      case "getTransactionReceipt":
        return provider[method](params.transactionHash);
      case "getLogs": {
        let filter2 = params.filter;
        if (filter2.fromBlock && isHexString(filter2.fromBlock) || filter2.toBlock && isHexString(filter2.toBlock)) {
          provider = yield waitForSync(config, currentBlockNumber);
        }
        return provider.getLogs(filter2);
      }
    }
    return logger37.throwError("unknown method error", Logger.errors.UNKNOWN_ERROR, {
      method,
      params
    });
  });
}
var FallbackProvider = class extends BaseProvider {
  constructor(providers, quorum) {
    logger37.checkNew(new.target, FallbackProvider);
    if (providers.length === 0) {
      logger37.throwArgumentError("missing providers", "providers", providers);
    }
    const providerConfigs = providers.map((configOrProvider, index) => {
      if (Provider.isProvider(configOrProvider)) {
        const stallTimeout = isCommunityResource(configOrProvider) ? 2e3 : 750;
        const priority = 1;
        return Object.freeze({ provider: configOrProvider, weight: 1, stallTimeout, priority });
      }
      const config = shallowCopy(configOrProvider);
      if (config.priority == null) {
        config.priority = 1;
      }
      if (config.stallTimeout == null) {
        config.stallTimeout = isCommunityResource(configOrProvider) ? 2e3 : 750;
      }
      if (config.weight == null) {
        config.weight = 1;
      }
      const weight = config.weight;
      if (weight % 1 || weight > 512 || weight < 1) {
        logger37.throwArgumentError("invalid weight; must be integer in [1, 512]", `providers[${index}].weight`, weight);
      }
      return Object.freeze(config);
    });
    const total = providerConfigs.reduce((accum, c3) => accum + c3.weight, 0);
    if (quorum == null) {
      quorum = total / 2;
    } else if (quorum > total) {
      logger37.throwArgumentError("quorum will always fail; larger than total weight", "quorum", quorum);
    }
    let networkOrReady = checkNetworks(providerConfigs.map((c3) => c3.provider.network));
    if (networkOrReady == null) {
      networkOrReady = new Promise((resolve, reject) => {
        setTimeout(() => {
          this.detectNetwork().then(resolve, reject);
        }, 0);
      });
    }
    super(networkOrReady);
    defineReadOnly(this, "providerConfigs", Object.freeze(providerConfigs));
    defineReadOnly(this, "quorum", quorum);
    this._highestBlockNumber = -1;
  }
  detectNetwork() {
    return __awaiter16(this, void 0, void 0, function* () {
      const networks2 = yield Promise.all(this.providerConfigs.map((c3) => c3.provider.getNetwork()));
      return checkNetworks(networks2);
    });
  }
  perform(method, params) {
    return __awaiter16(this, void 0, void 0, function* () {
      if (method === "sendTransaction") {
        const results = yield Promise.all(this.providerConfigs.map((c3) => {
          return c3.provider.sendTransaction(params.signedTransaction).then((result) => {
            return result.hash;
          }, (error) => {
            return error;
          });
        }));
        for (let i4 = 0; i4 < results.length; i4++) {
          const result = results[i4];
          if (typeof result === "string") {
            return result;
          }
        }
        throw results[0];
      }
      if (this._highestBlockNumber === -1 && method !== "getBlockNumber") {
        yield this.getBlockNumber();
      }
      const processFunc = getProcessFunc(this, method, params);
      const configs = shuffled(this.providerConfigs.map(shallowCopy));
      configs.sort((a3, b3) => a3.priority - b3.priority);
      const currentBlockNumber = this._highestBlockNumber;
      let i3 = 0;
      let first = true;
      while (true) {
        const t0 = now();
        let inflightWeight = configs.filter((c3) => c3.runner && t0 - c3.start < c3.stallTimeout).reduce((accum, c3) => accum + c3.weight, 0);
        while (inflightWeight < this.quorum && i3 < configs.length) {
          const config = configs[i3++];
          const rid = nextRid++;
          config.start = now();
          config.staller = stall2(config.stallTimeout);
          config.staller.wait(() => {
            config.staller = null;
          });
          config.runner = getRunner(config, currentBlockNumber, method, params).then((result) => {
            config.done = true;
            config.result = result;
            if (this.listenerCount("debug")) {
              this.emit("debug", {
                action: "request",
                rid,
                backend: exposeDebugConfig(config, now()),
                request: { method, params: deepCopy(params) },
                provider: this
              });
            }
          }, (error) => {
            config.done = true;
            config.error = error;
            if (this.listenerCount("debug")) {
              this.emit("debug", {
                action: "request",
                rid,
                backend: exposeDebugConfig(config, now()),
                request: { method, params: deepCopy(params) },
                provider: this
              });
            }
          });
          if (this.listenerCount("debug")) {
            this.emit("debug", {
              action: "request",
              rid,
              backend: exposeDebugConfig(config, null),
              request: { method, params: deepCopy(params) },
              provider: this
            });
          }
          inflightWeight += config.weight;
        }
        const waiting = [];
        configs.forEach((c3) => {
          if (c3.done || !c3.runner) {
            return;
          }
          waiting.push(c3.runner);
          if (c3.staller) {
            waiting.push(c3.staller.getPromise());
          }
        });
        if (waiting.length) {
          yield Promise.race(waiting);
        }
        const results = configs.filter((c3) => c3.done && c3.error == null);
        if (results.length >= this.quorum) {
          const result = processFunc(results);
          if (result !== void 0) {
            configs.forEach((c3) => {
              if (c3.staller) {
                c3.staller.cancel();
              }
              c3.cancelled = true;
            });
            return result;
          }
          if (!first) {
            yield stall2(100).getPromise();
          }
          first = false;
        }
        const errors = configs.reduce((accum, c3) => {
          if (!c3.done || c3.error == null) {
            return accum;
          }
          const code = c3.error.code;
          if (ForwardErrors.indexOf(code) >= 0) {
            if (!accum[code]) {
              accum[code] = { error: c3.error, weight: 0 };
            }
            accum[code].weight += c3.weight;
          }
          return accum;
        }, {});
        Object.keys(errors).forEach((errorCode) => {
          const tally = errors[errorCode];
          if (tally.weight < this.quorum) {
            return;
          }
          configs.forEach((c3) => {
            if (c3.staller) {
              c3.staller.cancel();
            }
            c3.cancelled = true;
          });
          const e3 = tally.error;
          const props = {};
          ForwardProperties.forEach((name2) => {
            if (e3[name2] == null) {
              return;
            }
            props[name2] = e3[name2];
          });
          logger37.throwError(e3.reason || e3.message, errorCode, props);
        });
        if (configs.filter((c3) => !c3.done).length === 0) {
          break;
        }
      }
      configs.forEach((c3) => {
        if (c3.staller) {
          c3.staller.cancel();
        }
        c3.cancelled = true;
      });
      return logger37.throwError("failed to meet quorum", Logger.errors.SERVER_ERROR, {
        method,
        params,
        results: configs.map((c3) => exposeDebugConfig(c3)),
        provider: this
      });
    });
  }
};

// node_modules/@ethersproject/providers/lib.esm/ipc-provider.js
"use strict";
var IpcProvider = null;

// node_modules/@ethersproject/providers/lib.esm/infura-provider.js
"use strict";
var logger38 = new Logger(version23);
var defaultProjectId = "84842078b09946638c03157f83405213";
var InfuraWebSocketProvider = class extends WebSocketProvider {
  constructor(network, apiKey) {
    const provider = new InfuraProvider(network, apiKey);
    const connection = provider.connection;
    if (connection.password) {
      logger38.throwError("INFURA WebSocket project secrets unsupported", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "InfuraProvider.getWebSocketProvider()"
      });
    }
    const url = connection.url.replace(/^http/i, "ws").replace("/v3/", "/ws/v3/");
    super(url, network);
    defineReadOnly(this, "apiKey", provider.projectId);
    defineReadOnly(this, "projectId", provider.projectId);
    defineReadOnly(this, "projectSecret", provider.projectSecret);
  }
  isCommunityResource() {
    return this.projectId === defaultProjectId;
  }
};
var InfuraProvider = class extends UrlJsonRpcProvider {
  static getWebSocketProvider(network, apiKey) {
    return new InfuraWebSocketProvider(network, apiKey);
  }
  static getApiKey(apiKey) {
    const apiKeyObj = {
      apiKey: defaultProjectId,
      projectId: defaultProjectId,
      projectSecret: null
    };
    if (apiKey == null) {
      return apiKeyObj;
    }
    if (typeof apiKey === "string") {
      apiKeyObj.projectId = apiKey;
    } else if (apiKey.projectSecret != null) {
      logger38.assertArgument(typeof apiKey.projectId === "string", "projectSecret requires a projectId", "projectId", apiKey.projectId);
      logger38.assertArgument(typeof apiKey.projectSecret === "string", "invalid projectSecret", "projectSecret", "[REDACTED]");
      apiKeyObj.projectId = apiKey.projectId;
      apiKeyObj.projectSecret = apiKey.projectSecret;
    } else if (apiKey.projectId) {
      apiKeyObj.projectId = apiKey.projectId;
    }
    apiKeyObj.apiKey = apiKeyObj.projectId;
    return apiKeyObj;
  }
  static getUrl(network, apiKey) {
    let host = null;
    switch (network ? network.name : "unknown") {
      case "homestead":
        host = "mainnet.infura.io";
        break;
      case "ropsten":
        host = "ropsten.infura.io";
        break;
      case "rinkeby":
        host = "rinkeby.infura.io";
        break;
      case "kovan":
        host = "kovan.infura.io";
        break;
      case "goerli":
        host = "goerli.infura.io";
        break;
      case "matic":
        host = "polygon-mainnet.infura.io";
        break;
      case "maticmum":
        host = "polygon-mumbai.infura.io";
        break;
      default:
        logger38.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
          argument: "network",
          value: network
        });
    }
    const connection = {
      allowGzip: true,
      url: "https://" + host + "/v3/" + apiKey.projectId,
      throttleCallback: (attempt, url) => {
        if (apiKey.projectId === defaultProjectId) {
          showThrottleMessage();
        }
        return Promise.resolve(true);
      }
    };
    if (apiKey.projectSecret != null) {
      connection.user = "";
      connection.password = apiKey.projectSecret;
    }
    return connection;
  }
  isCommunityResource() {
    return this.projectId === defaultProjectId;
  }
};

// node_modules/@ethersproject/providers/lib.esm/json-rpc-batch-provider.js
var JsonRpcBatchProvider = class extends JsonRpcProvider {
  send(method, params) {
    const request = {
      method,
      params,
      id: this._nextId++,
      jsonrpc: "2.0"
    };
    if (this._pendingBatch == null) {
      this._pendingBatch = [];
    }
    const inflightRequest = { request, resolve: null, reject: null };
    const promise = new Promise((resolve, reject) => {
      inflightRequest.resolve = resolve;
      inflightRequest.reject = reject;
    });
    this._pendingBatch.push(inflightRequest);
    if (!this._pendingBatchAggregator) {
      this._pendingBatchAggregator = setTimeout(() => {
        const batch = this._pendingBatch;
        this._pendingBatch = null;
        this._pendingBatchAggregator = null;
        const request2 = batch.map((inflight) => inflight.request);
        this.emit("debug", {
          action: "requestBatch",
          request: deepCopy(request2),
          provider: this
        });
        return fetchJson(this.connection, JSON.stringify(request2)).then((result) => {
          this.emit("debug", {
            action: "response",
            request: request2,
            response: result,
            provider: this
          });
          batch.forEach((inflightRequest2, index) => {
            const payload = result[index];
            if (payload.error) {
              const error = new Error(payload.error.message);
              error.code = payload.error.code;
              error.data = payload.error.data;
              inflightRequest2.reject(error);
            } else {
              inflightRequest2.resolve(payload.result);
            }
          });
        }, (error) => {
          this.emit("debug", {
            action: "response",
            error,
            request: request2,
            provider: this
          });
          batch.forEach((inflightRequest2) => {
            inflightRequest2.reject(error);
          });
        });
      }, 10);
    }
    return promise;
  }
};

// node_modules/@ethersproject/providers/lib.esm/nodesmith-provider.js
"use strict";
var logger39 = new Logger(version23);
var defaultApiKey3 = "ETHERS_JS_SHARED";
var NodesmithProvider = class extends UrlJsonRpcProvider {
  static getApiKey(apiKey) {
    if (apiKey && typeof apiKey !== "string") {
      logger39.throwArgumentError("invalid apiKey", "apiKey", apiKey);
    }
    return apiKey || defaultApiKey3;
  }
  static getUrl(network, apiKey) {
    logger39.warn("NodeSmith will be discontinued on 2019-12-20; please migrate to another platform.");
    let host = null;
    switch (network.name) {
      case "homestead":
        host = "https://ethereum.api.nodesmith.io/v1/mainnet/jsonrpc";
        break;
      case "ropsten":
        host = "https://ethereum.api.nodesmith.io/v1/ropsten/jsonrpc";
        break;
      case "rinkeby":
        host = "https://ethereum.api.nodesmith.io/v1/rinkeby/jsonrpc";
        break;
      case "goerli":
        host = "https://ethereum.api.nodesmith.io/v1/goerli/jsonrpc";
        break;
      case "kovan":
        host = "https://ethereum.api.nodesmith.io/v1/kovan/jsonrpc";
        break;
      default:
        logger39.throwArgumentError("unsupported network", "network", arguments[0]);
    }
    return host + "?apiKey=" + apiKey;
  }
};

// node_modules/@ethersproject/providers/lib.esm/pocket-provider.js
"use strict";
var logger40 = new Logger(version23);
var defaultApplicationIds = {
  homestead: "6004bcd10040261633ade990",
  ropsten: "6004bd4d0040261633ade991",
  rinkeby: "6004bda20040261633ade994",
  goerli: "6004bd860040261633ade992"
};
var PocketProvider = class extends UrlJsonRpcProvider {
  constructor(network, apiKey) {
    if (apiKey == null) {
      const n2 = getStatic(new.target, "getNetwork")(network);
      if (n2) {
        const applicationId = defaultApplicationIds[n2.name];
        if (applicationId) {
          apiKey = {
            applicationId,
            loadBalancer: true
          };
        }
      }
      if (apiKey == null) {
        logger40.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
          argument: "network",
          value: network
        });
      }
    }
    super(network, apiKey);
  }
  static getApiKey(apiKey) {
    if (apiKey == null) {
      logger40.throwArgumentError("PocketProvider.getApiKey does not support null apiKey", "apiKey", apiKey);
    }
    const apiKeyObj = {
      applicationId: null,
      loadBalancer: false,
      applicationSecretKey: null
    };
    if (typeof apiKey === "string") {
      apiKeyObj.applicationId = apiKey;
    } else if (apiKey.applicationSecretKey != null) {
      logger40.assertArgument(typeof apiKey.applicationId === "string", "applicationSecretKey requires an applicationId", "applicationId", apiKey.applicationId);
      logger40.assertArgument(typeof apiKey.applicationSecretKey === "string", "invalid applicationSecretKey", "applicationSecretKey", "[REDACTED]");
      apiKeyObj.applicationId = apiKey.applicationId;
      apiKeyObj.applicationSecretKey = apiKey.applicationSecretKey;
      apiKeyObj.loadBalancer = !!apiKey.loadBalancer;
    } else if (apiKey.applicationId) {
      logger40.assertArgument(typeof apiKey.applicationId === "string", "apiKey.applicationId must be a string", "apiKey.applicationId", apiKey.applicationId);
      apiKeyObj.applicationId = apiKey.applicationId;
      apiKeyObj.loadBalancer = !!apiKey.loadBalancer;
    } else {
      logger40.throwArgumentError("unsupported PocketProvider apiKey", "apiKey", apiKey);
    }
    return apiKeyObj;
  }
  static getUrl(network, apiKey) {
    let host = null;
    switch (network ? network.name : "unknown") {
      case "homestead":
        host = "eth-mainnet.gateway.pokt.network";
        break;
      case "ropsten":
        host = "eth-ropsten.gateway.pokt.network";
        break;
      case "rinkeby":
        host = "eth-rinkeby.gateway.pokt.network";
        break;
      case "goerli":
        host = "eth-goerli.gateway.pokt.network";
        break;
      default:
        logger40.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
          argument: "network",
          value: network
        });
    }
    let url = null;
    if (apiKey.loadBalancer) {
      url = `https://${host}/v1/lb/${apiKey.applicationId}`;
    } else {
      url = `https://${host}/v1/${apiKey.applicationId}`;
    }
    const connection = { url };
    connection.headers = {};
    if (apiKey.applicationSecretKey != null) {
      connection.user = "";
      connection.password = apiKey.applicationSecretKey;
    }
    return connection;
  }
  isCommunityResource() {
    return this.applicationId === defaultApplicationIds[this.network.name];
  }
};

// node_modules/@ethersproject/providers/lib.esm/web3-provider.js
"use strict";
var logger41 = new Logger(version23);
var _nextId = 1;
function buildWeb3LegacyFetcher(provider, sendFunc) {
  const fetcher = "Web3LegacyFetcher";
  return function(method, params) {
    const request = {
      method,
      params,
      id: _nextId++,
      jsonrpc: "2.0"
    };
    return new Promise((resolve, reject) => {
      this.emit("debug", {
        action: "request",
        fetcher,
        request: deepCopy(request),
        provider: this
      });
      sendFunc(request, (error, response) => {
        if (error) {
          this.emit("debug", {
            action: "response",
            fetcher,
            error,
            request,
            provider: this
          });
          return reject(error);
        }
        this.emit("debug", {
          action: "response",
          fetcher,
          request,
          response,
          provider: this
        });
        if (response.error) {
          const error2 = new Error(response.error.message);
          error2.code = response.error.code;
          error2.data = response.error.data;
          return reject(error2);
        }
        resolve(response.result);
      });
    });
  };
}
function buildEip1193Fetcher(provider) {
  return function(method, params) {
    if (params == null) {
      params = [];
    }
    const request = { method, params };
    this.emit("debug", {
      action: "request",
      fetcher: "Eip1193Fetcher",
      request: deepCopy(request),
      provider: this
    });
    return provider.request(request).then((response) => {
      this.emit("debug", {
        action: "response",
        fetcher: "Eip1193Fetcher",
        request,
        response,
        provider: this
      });
      return response;
    }, (error) => {
      this.emit("debug", {
        action: "response",
        fetcher: "Eip1193Fetcher",
        request,
        error,
        provider: this
      });
      throw error;
    });
  };
}
var Web3Provider = class extends JsonRpcProvider {
  constructor(provider, network) {
    logger41.checkNew(new.target, Web3Provider);
    if (provider == null) {
      logger41.throwArgumentError("missing provider", "provider", provider);
    }
    let path = null;
    let jsonRpcFetchFunc = null;
    let subprovider = null;
    if (typeof provider === "function") {
      path = "unknown:";
      jsonRpcFetchFunc = provider;
    } else {
      path = provider.host || provider.path || "";
      if (!path && provider.isMetaMask) {
        path = "metamask";
      }
      subprovider = provider;
      if (provider.request) {
        if (path === "") {
          path = "eip-1193:";
        }
        jsonRpcFetchFunc = buildEip1193Fetcher(provider);
      } else if (provider.sendAsync) {
        jsonRpcFetchFunc = buildWeb3LegacyFetcher(provider, provider.sendAsync.bind(provider));
      } else if (provider.send) {
        jsonRpcFetchFunc = buildWeb3LegacyFetcher(provider, provider.send.bind(provider));
      } else {
        logger41.throwArgumentError("unsupported provider", "provider", provider);
      }
      if (!path) {
        path = "unknown:";
      }
    }
    super(path, network);
    defineReadOnly(this, "jsonRpcFetchFunc", jsonRpcFetchFunc);
    defineReadOnly(this, "provider", subprovider);
  }
  send(method, params) {
    return this.jsonRpcFetchFunc(method, params);
  }
};

// node_modules/@ethersproject/providers/lib.esm/index.js
"use strict";
var logger42 = new Logger(version23);
function getDefaultProvider(network, options) {
  if (network == null) {
    network = "homestead";
  }
  if (typeof network === "string") {
    const match = network.match(/^(ws|http)s?:/i);
    if (match) {
      switch (match[1]) {
        case "http":
          return new JsonRpcProvider(network);
        case "ws":
          return new WebSocketProvider(network);
        default:
          logger42.throwArgumentError("unsupported URL scheme", "network", network);
      }
    }
  }
  const n2 = getNetwork(network);
  if (!n2 || !n2._defaultProvider) {
    logger42.throwError("unsupported getDefaultProvider network", Logger.errors.NETWORK_ERROR, {
      operation: "getDefaultProvider",
      network
    });
  }
  return n2._defaultProvider({
    FallbackProvider,
    AlchemyProvider,
    CloudflareProvider,
    EtherscanProvider,
    InfuraProvider,
    JsonRpcProvider,
    NodesmithProvider,
    PocketProvider,
    Web3Provider,
    IpcProvider
  }, options);
}

// node_modules/ethers/lib.esm/utils.js
var utils_exports = {};
__export(utils_exports, {
  AbiCoder: () => AbiCoder,
  ConstructorFragment: () => ConstructorFragment,
  ErrorFragment: () => ErrorFragment,
  EventFragment: () => EventFragment,
  FormatTypes: () => FormatTypes,
  Fragment: () => Fragment,
  FunctionFragment: () => FunctionFragment,
  HDNode: () => HDNode,
  Indexed: () => Indexed,
  Interface: () => Interface,
  LogDescription: () => LogDescription,
  Logger: () => Logger,
  ParamType: () => ParamType,
  RLP: () => lib_exports,
  SigningKey: () => SigningKey,
  SupportedAlgorithm: () => SupportedAlgorithm,
  TransactionDescription: () => TransactionDescription,
  TransactionTypes: () => TransactionTypes,
  UnicodeNormalizationForm: () => UnicodeNormalizationForm,
  Utf8ErrorFuncs: () => Utf8ErrorFuncs,
  Utf8ErrorReason: () => Utf8ErrorReason,
  _TypedDataEncoder: () => TypedDataEncoder,
  _fetchData: () => _fetchData,
  _toEscapedUtf8String: () => _toEscapedUtf8String,
  accessListify: () => accessListify,
  arrayify: () => arrayify,
  base58: () => Base58,
  base64: () => lib_exports3,
  checkProperties: () => checkProperties,
  checkResultErrors: () => checkResultErrors,
  commify: () => commify,
  computeAddress: () => computeAddress,
  computeHmac: () => computeHmac,
  computePublicKey: () => computePublicKey,
  concat: () => concat,
  deepCopy: () => deepCopy,
  defaultAbiCoder: () => defaultAbiCoder,
  defaultPath: () => defaultPath,
  defineReadOnly: () => defineReadOnly,
  entropyToMnemonic: () => entropyToMnemonic,
  fetchJson: () => fetchJson,
  formatBytes32String: () => formatBytes32String,
  formatEther: () => formatEther,
  formatUnits: () => formatUnits,
  getAccountPath: () => getAccountPath,
  getAddress: () => getAddress,
  getContractAddress: () => getContractAddress,
  getCreate2Address: () => getCreate2Address,
  getIcapAddress: () => getIcapAddress,
  getJsonWalletAddress: () => getJsonWalletAddress,
  getStatic: () => getStatic,
  hashMessage: () => hashMessage,
  hexConcat: () => hexConcat,
  hexDataLength: () => hexDataLength,
  hexDataSlice: () => hexDataSlice,
  hexStripZeros: () => hexStripZeros,
  hexValue: () => hexValue,
  hexZeroPad: () => hexZeroPad,
  hexlify: () => hexlify,
  id: () => id,
  isAddress: () => isAddress,
  isBytes: () => isBytes,
  isBytesLike: () => isBytesLike,
  isHexString: () => isHexString,
  isValidMnemonic: () => isValidMnemonic,
  isValidName: () => isValidName,
  joinSignature: () => joinSignature,
  keccak256: () => keccak256,
  mnemonicToEntropy: () => mnemonicToEntropy,
  mnemonicToSeed: () => mnemonicToSeed,
  namehash: () => namehash,
  nameprep: () => nameprep,
  parseBytes32String: () => parseBytes32String,
  parseEther: () => parseEther,
  parseTransaction: () => parse,
  parseUnits: () => parseUnits,
  poll: () => poll,
  randomBytes: () => randomBytes,
  recoverAddress: () => recoverAddress,
  recoverPublicKey: () => recoverPublicKey,
  resolveProperties: () => resolveProperties,
  ripemd160: () => ripemd160,
  serializeTransaction: () => serialize,
  sha256: () => sha256,
  sha512: () => sha512,
  shallowCopy: () => shallowCopy,
  shuffled: () => shuffled,
  solidityKeccak256: () => keccak2562,
  solidityPack: () => pack2,
  soliditySha256: () => sha2562,
  splitSignature: () => splitSignature,
  stripZeros: () => stripZeros,
  toUtf8Bytes: () => toUtf8Bytes,
  toUtf8CodePoints: () => toUtf8CodePoints,
  toUtf8String: () => toUtf8String,
  verifyMessage: () => verifyMessage,
  verifyTypedData: () => verifyTypedData,
  zeroPad: () => zeroPad
});

// node_modules/@ethersproject/solidity/lib.esm/_version.js
var version24 = "solidity/5.5.0";

// node_modules/@ethersproject/solidity/lib.esm/index.js
"use strict";
var regexBytes = new RegExp("^bytes([0-9]+)$");
var regexNumber = new RegExp("^(u?int)([0-9]*)$");
var regexArray = new RegExp("^(.*)\\[([0-9]*)\\]$");
var Zeros2 = "0000000000000000000000000000000000000000000000000000000000000000";
var logger43 = new Logger(version24);
function _pack(type, value, isArray) {
  switch (type) {
    case "address":
      if (isArray) {
        return zeroPad(value, 32);
      }
      return arrayify(value);
    case "string":
      return toUtf8Bytes(value);
    case "bytes":
      return arrayify(value);
    case "bool":
      value = value ? "0x01" : "0x00";
      if (isArray) {
        return zeroPad(value, 32);
      }
      return arrayify(value);
  }
  let match = type.match(regexNumber);
  if (match) {
    let size = parseInt(match[2] || "256");
    if (match[2] && String(size) !== match[2] || size % 8 !== 0 || size === 0 || size > 256) {
      logger43.throwArgumentError("invalid number type", "type", type);
    }
    if (isArray) {
      size = 256;
    }
    value = BigNumber.from(value).toTwos(size);
    return zeroPad(value, size / 8);
  }
  match = type.match(regexBytes);
  if (match) {
    const size = parseInt(match[1]);
    if (String(size) !== match[1] || size === 0 || size > 32) {
      logger43.throwArgumentError("invalid bytes type", "type", type);
    }
    if (arrayify(value).byteLength !== size) {
      logger43.throwArgumentError(`invalid value for ${type}`, "value", value);
    }
    if (isArray) {
      return arrayify((value + Zeros2).substring(0, 66));
    }
    return value;
  }
  match = type.match(regexArray);
  if (match && Array.isArray(value)) {
    const baseType = match[1];
    const count = parseInt(match[2] || String(value.length));
    if (count != value.length) {
      logger43.throwArgumentError(`invalid array length for ${type}`, "value", value);
    }
    const result = [];
    value.forEach(function(value2) {
      result.push(_pack(baseType, value2, true));
    });
    return concat(result);
  }
  return logger43.throwArgumentError("invalid type", "type", type);
}
function pack2(types, values) {
  if (types.length != values.length) {
    logger43.throwArgumentError("wrong number of values; expected ${ types.length }", "values", values);
  }
  const tight = [];
  types.forEach(function(type, index) {
    tight.push(_pack(type, values[index]));
  });
  return hexlify(concat(tight));
}
function keccak2562(types, values) {
  return keccak256(pack2(types, values));
}
function sha2562(types, values) {
  return sha256(pack2(types, values));
}

// node_modules/@ethersproject/units/lib.esm/_version.js
var version25 = "units/5.5.0";

// node_modules/@ethersproject/units/lib.esm/index.js
"use strict";
var logger44 = new Logger(version25);
var names = [
  "wei",
  "kwei",
  "mwei",
  "gwei",
  "szabo",
  "finney",
  "ether"
];
function commify(value) {
  const comps = String(value).split(".");
  if (comps.length > 2 || !comps[0].match(/^-?[0-9]*$/) || comps[1] && !comps[1].match(/^[0-9]*$/) || value === "." || value === "-.") {
    logger44.throwArgumentError("invalid value", "value", value);
  }
  let whole = comps[0];
  let negative = "";
  if (whole.substring(0, 1) === "-") {
    negative = "-";
    whole = whole.substring(1);
  }
  while (whole.substring(0, 1) === "0") {
    whole = whole.substring(1);
  }
  if (whole === "") {
    whole = "0";
  }
  let suffix = "";
  if (comps.length === 2) {
    suffix = "." + (comps[1] || "0");
  }
  while (suffix.length > 2 && suffix[suffix.length - 1] === "0") {
    suffix = suffix.substring(0, suffix.length - 1);
  }
  const formatted = [];
  while (whole.length) {
    if (whole.length <= 3) {
      formatted.unshift(whole);
      break;
    } else {
      const index = whole.length - 3;
      formatted.unshift(whole.substring(index));
      whole = whole.substring(0, index);
    }
  }
  return negative + formatted.join(",") + suffix;
}
function formatUnits(value, unitName) {
  if (typeof unitName === "string") {
    const index = names.indexOf(unitName);
    if (index !== -1) {
      unitName = 3 * index;
    }
  }
  return formatFixed(value, unitName != null ? unitName : 18);
}
function parseUnits(value, unitName) {
  if (typeof value !== "string") {
    logger44.throwArgumentError("value must be a string", "value", value);
  }
  if (typeof unitName === "string") {
    const index = names.indexOf(unitName);
    if (index !== -1) {
      unitName = 3 * index;
    }
  }
  return parseFixed(value, unitName != null ? unitName : 18);
}
function formatEther(wei) {
  return formatUnits(wei, 18);
}
function parseEther(ether) {
  return parseUnits(ether, 18);
}

// node_modules/ethers/lib.esm/utils.js
"use strict";

// node_modules/ethers/lib.esm/_version.js
var version26 = "ethers/5.5.1";

// node_modules/ethers/lib.esm/ethers.js
"use strict";
var logger45 = new Logger(version26);

// node_modules/ethers/lib.esm/index.js
"use strict";
try {
  const anyGlobal2 = window;
  if (anyGlobal2._ethers == null) {
    anyGlobal2._ethers = ethers_exports;
  }
} catch (error) {
}

// src/plugins/data/DaoConfig.ts
var DAO_A_CONTRACT_ADDRESS = "0xEcC8572e9ffCA02Aba6f89D127541b0984a6B511";
var DAO_B_CONTRACT_ADDRESS = "0x27E0053f853dB33588D18030e79aCECd52C8bfC4";
var PROVIDER_RPC_URL = "https://rpc.xdaichain.com";

// src/plugins/df-apis/Backend/GameLogic/ArrivalUtils.ts
var import_types3 = __toModule(require_dist());
var blocksLeftToProspectExpiration = (currentBlockNumber, prospectedBlockNumber) => {
  return (prospectedBlockNumber || 0) + 255 - currentBlockNumber;
};
var prospectExpired = (currentBlockNumber, prospectedBlockNumber) => {
  return blocksLeftToProspectExpiration(currentBlockNumber, prospectedBlockNumber) <= 0;
};
var isFindable = (planet, currentBlockNumber) => {
  return currentBlockNumber !== void 0 && planet.planetType === import_types3.PlanetType.RUINS && planet.prospectedBlockNumber !== void 0 && !planet.hasTriedFindingArtifact && !prospectExpired(currentBlockNumber, planet.prospectedBlockNumber);
};
var isProspectable = (planet) => {
  return planet.planetType === import_types3.PlanetType.RUINS && planet.prospectedBlockNumber === void 0;
};
var enoughEnergyToProspect = (p2) => {
  return p2.energy / p2.energyCap > 0.955;
};

// src/plugins/helpers/df.ts
var df = window.df;
var ui = window.ui;
var { getPlanetName, getPlayerColor } = df.getProcgenUtils();
var getTwitter = (address) => df.getTwitter(address);
function useSelectedPlanet() {
  const [selected, setSelected] = l2(void 0);
  y2(() => {
    const { unsubscribe } = ui.selectedPlanetId$.subscribe(setSelected);
    return () => {
      unsubscribe();
    };
  });
  return selected;
}
function echo(msg) {
  df.terminal.current.println(msg);
}
var bulkUiRefresh = async (planets) => {
  const locationIds = planets.map((p2) => p2.locationId);
  await df.bulkHardRefreshPlanets(locationIds);
};

// src/plugins/data/Store.ts
var DAO_ABI = require_DaoContract();
var StoreContextA = D(null);
var StoreContextB = D(null);
var StoreProviderA = StoreContextA.Provider;
var StoreProviderB = StoreContextB.Provider;
function useStoreA() {
  return T2(StoreContextA);
}
function useStoreB() {
  return T2(StoreContextB);
}
function createStoreA() {
  const daoColor = "red";
  const daoName = "Red Team";
  const daoAddressLowerCase = DAO_A_CONTRACT_ADDRESS.toLowerCase();
  const provider = new ethers_exports.providers.JsonRpcProvider(PROVIDER_RPC_URL);
  const wallet = new ethers_exports.Wallet(df.getPrivateKey(), provider);
  const myAddressLowerCase = wallet.address.toLowerCase();
  const daoContract = new ethers_exports.Contract(daoAddressLowerCase, DAO_ABI, wallet);
  const coreContract = df.contractsAPI.coreContract;
  const whitelistContract = df.contractsAPI.whitelistContract;
  const store = { daoColor, daoName, provider, wallet, myAddressLowerCase, daoAddressLowerCase, coreContract, whitelistContract, daoContract };
  console.log("createStoreA", { df, ui, store });
  return store;
}
function createStoreB() {
  const daoColor = "blue";
  const daoName = "Blue Team";
  const daoAddressLowerCase = DAO_B_CONTRACT_ADDRESS.toLowerCase();
  const provider = new ethers_exports.providers.JsonRpcProvider(PROVIDER_RPC_URL);
  const wallet = new ethers_exports.Wallet(df.getPrivateKey(), provider);
  const myAddressLowerCase = wallet.address.toLowerCase();
  const daoContract = new ethers_exports.Contract(daoAddressLowerCase, DAO_ABI, wallet);
  const coreContract = df.contractsAPI.coreContract;
  const whitelistContract = df.contractsAPI.whitelistContract;
  const store = { daoColor, daoName, provider, wallet, myAddressLowerCase, daoAddressLowerCase, coreContract, whitelistContract, daoContract };
  console.log("createStoreB", { df, ui, store });
  return store;
}

// src/plugins/components/Navigation.tsx
var styles = {
  container: {
    position: "relative",
    height: "100%"
  },
  content: {
    paddingBottom: "44px",
    height: "100%",
    overflowY: "scroll"
  },
  tabs: {
    display: "grid",
    position: "absolute",
    padding: "8px",
    gridColumnGap: "8px",
    justifyContent: "flex-start",
    gridTemplateColumns: "auto auto auto 1fr",
    alignItems: "center",
    bottom: 0,
    width: "100%",
    background: colors.background,
    borderTop: `1px solid ${colors.borderlight}`
  }
};
function Navigation({ tabs }) {
  const { daoContract, wallet } = useStoreA();
  const playerAddress = wallet.address;
  const [activeTab, setActiveTab] = l2(tabs[0].name);
  const { TabContent } = tabs.find((tab) => tab.name === activeTab);
  const [contributions, setContributions] = l2(0);
  const [loading, setLoading] = l2(true);
  y2(() => {
    const getContributions = async () => {
      try {
        const score = await daoContract.contributions(playerAddress);
        setContributions(Number(score));
        if (loading)
          setLoading(false);
        console.log(`get player contribution score = ${score}`);
      } catch (e3) {
        console.error(`get player contribution error`, e3);
      }
    };
    const interval = setInterval(getContributions, 1e4);
    getContributions();
    return () => clearInterval(interval);
  }, []);
  const styleTab = (isActive) => ({
    color: isActive ? colors.dfwhite : colors.muted,
    background: colors.background
  });
  return /* @__PURE__ */ v("div", {
    style: styles.container
  }, /* @__PURE__ */ v("div", {
    style: styles.content
  }, /* @__PURE__ */ v(TabContent, null)), /* @__PURE__ */ v("div", {
    style: styles.tabs
  }, tabs.map((tab) => /* @__PURE__ */ v(Button, {
    key: tab.name,
    style: styleTab(tab.name === activeTab),
    onClick: () => setActiveTab(tab.name),
    children: tab.name
  })), /* @__PURE__ */ v("div", {
    style: { textAlign: "right" }
  }, "(My Contribution: ", loading ? "..." : contributions, ")")));
}

// src/plugins/views/DaoView.tsx
var Promise2 = __toModule(require_bluebird());
var import_types4 = __toModule(require_dist());

// src/plugins/views/Logo.tsx
function Logo({ size = 80 }) {
  return /* @__PURE__ */ v("div", {
    style: { width: size, height: size, zIndex: -1, top: 20, right: 20, position: "absolute", opacity: 0.3 }
  }, /* @__PURE__ */ v("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 58.87 59.21"
  }, /* @__PURE__ */ v("g", null, /* @__PURE__ */ v("g", null, /* @__PURE__ */ v("path", {
    fill: "white",
    d: "M35.17 26.25c1.31.37 2.72.21 4 .56a9.91 9.91 0 011.08 18.9c-2.28.9-4.87.34-7 1.78a6.05 6.05 0 107 9.9 6 6 0 001.79-2 7.73 7.73 0 00.85-3.39 10.18 10.18 0 019.32-9.43 8.49 8.49 0 003.15-.57 6.18 6.18 0 002.39-2 6.12 6.12 0 00-1.51-8.52 6.18 6.18 0 00-2.49-1 20.83 20.83 0 01-4-.63 10 10 0 01-3.09-1.73 10.29 10.29 0 01-3.49-5.63c-.27-1.26-.17-2.49-.47-3.72a6.05 6.05 0 10-10 6 5.91 5.91 0 002.47 1.48z"
  }), /* @__PURE__ */ v("path", {
    fill: "white",
    d: "M32.24 35.57c-.37 1.31-.21 2.72-.56 4a9.91 9.91 0 01-18.9 1.08c-.9-2.28-.34-4.87-1.78-6.95a6.05 6.05 0 10-7.92 8.75 7.76 7.76 0 003.45.8A10.19 10.19 0 0116 52.57a8.64 8.64 0 00.61 3.14 6.19 6.19 0 001.94 2.39 6.12 6.12 0 009.54-4 20.83 20.83 0 01.63-4A10.19 10.19 0 0136 43.52c1.21-.27 2.47-.14 3.67-.47a6 6 0 00-3.23-11.66 6.11 6.11 0 00-2.77 1.66 6 6 0 00-1.43 2.52z"
  }), /* @__PURE__ */ v("path", {
    fill: "white",
    d: "M23.71 33c-1.31-.37-2.72-.21-4-.56A10.11 10.11 0 0112.44 25a10.09 10.09 0 016.15-11.47c2.28-.9 4.87-.34 7-1.78a6.06 6.06 0 10-8.76-7.93A7.83 7.83 0 0016 7.28a10.17 10.17 0 01-9.32 9.43 8.86 8.86 0 00-3.14.61 6.28 6.28 0 00-2.39 1.94 6.11 6.11 0 004 9.54 20.83 20.83 0 014 .63 10.23 10.23 0 013.09 1.73 10.29 10.29 0 013.49 5.63c.27 1.21.14 2.47.47 3.67A6 6 0 1023.71 33z"
  }), /* @__PURE__ */ v("path", {
    fill: "white",
    d: "M26.63 23.68c.37-1.31.21-2.72.56-4a9.91 9.91 0 0118.9-1.08c.9 2.28.34 4.87 1.78 7a6.05 6.05 0 009.9-7 6.29 6.29 0 00-2-1.79 7.9 7.9 0 00-3.45-.8 10.17 10.17 0 01-9.45-9.37 8.68 8.68 0 00-.61-3.14 6.26 6.26 0 00-1.92-2.4 6.13 6.13 0 00-9.54 4 20.83 20.83 0 01-.63 4 10.11 10.11 0 01-1.73 3.09 10.24 10.24 0 01-5.63 3.49c-1.21.27-2.47.14-3.67.47a6 6 0 003.23 11.66 6.33 6.33 0 004.26-4.13z"
  })))));
}

// src/plugins/views/DaoView.tsx
function DaoView() {
  const { daoColor, daoName, provider, coreContract, daoContract, myAddressLowerCase, daoAddressLowerCase } = useStoreA();
  const selectedPlanetId = useSelectedPlanet();
  function getRandomActionId() {
    const hex = "0123456789abcdef";
    return Array(10).map(() => hex[Math.floor(hex.length * Math.random())]).join("");
  }
  async function checkMyContribution() {
    echo("");
    echo("get contribution...");
    const contribution = await daoContract.contributions(myAddressLowerCase);
    echo(`contribution: ${contribution}`);
  }
  async function _registerPlanetOwners(planets) {
    try {
      planets = planets.filter(isNotDaoPlanet);
      echo(`RegisterPlanetOwners: ${planets.length} planets...`);
      const locationIds = planets.map((p2) => `0x${p2.locationId}`);
      const updateTx = await daoContract.registerPlanetOwners(locationIds);
      const updateTxResponse = await updateTx.wait();
      console.log(`RegisterPlanetOwners: tx`, updateTx, updateTxResponse);
      echo(`RegisterPlanetOwners: complete`);
    } catch (error) {
      console.log(`RegisterPlanetOwners: error`, error);
      echo(`RegisterPlanetOwners: error ${error}`);
    }
  }
  async function _safeTransferPlanet(p2) {
    try {
      await ensurePlanetRegisteredToMe(p2);
      await df.contractsAPI.transferOwnership(p2.locationId, daoAddressLowerCase, getRandomActionId());
      await ensurePlanetOwnedByDao(p2);
      return true;
    } catch (e3) {
      console.error(`transfer planet error`, e3);
      return false;
    }
  }
  async function _safeTransferPlanets(planets) {
    const desc = `transfer ${planets.length} planets to dao`;
    try {
      echo(`${desc} start...`);
      const successedPlanets = await Promise2.filter(planets, _safeTransferPlanet);
      await bulkUiRefresh(successedPlanets).catch(console.error);
      echo(`${desc} complete`);
      return successedPlanets;
    } catch (e3) {
      echo(`${desc} error ${e3}`);
      console.log(`${desc} error`, e3);
      return [];
    }
  }
  async function _contractWithdrawSilver(planets) {
    if (!planets || planets.length === 0)
      return;
    try {
      const gasLimit = 1e3 * 1e4;
      const locationIds = planets.map((p2) => `0x${p2.locationId}`);
      const tx = await daoContract.withdrawSilverAndReturnPlanets(locationIds, { gasLimit });
      console.log(`WithdrawSilver: tx`, tx);
      const receipt = await tx.wait();
      console.log(`WithdrawSilver: receipt`, receipt);
      echo(`WithdrawSilver: block number ${receipt?.blockNumber}`);
    } catch (e3) {
      console.log(`WithdrawSilver: error`, e3);
      echo(`WithdrawSilver: error ${e3}`);
    }
  }
  async function makeFindArgs(p2) {
    return df.snarkHelper.getFindArtifactArgs(p2.location.coords.x, p2.location.coords.y);
  }
  async function _contractFindArtifacts(planets) {
    if (!planets || planets.length === 0)
      return;
    try {
      const gasLimit = 1e3 * 1e4;
      const findArgs = await Promise2.map(planets, makeFindArgs);
      const tx = await daoContract.findArtifactAndReturnPlanets(findArgs, { gasLimit });
      console.log(`FindArtifact: tx`, tx);
      const receipt = await tx.wait();
      console.log(`FindArtifact: receipt`, receipt);
      echo(`FindArtifact: block number ${receipt?.blockNumber}, status = ${receipt?.status === 1 ? "success" : "failed " + receipt?.status}`);
    } catch (e3) {
      console.log(`FindArtifact: error`, e3);
      echo(`FindArtifact: error ${e3}`);
    }
  }
  function isDaoPlanet(planet) {
    return planet.owner.toLowerCase() === daoAddressLowerCase;
  }
  function isNotDaoPlanet(planet) {
    return planet.owner.toLowerCase() !== daoAddressLowerCase;
  }
  async function isPlanetRegisteredToMe(planet) {
    const registrar = (await daoContract.registeredOwners(`0x${planet.locationId}`)).toLowerCase();
    return registrar === myAddressLowerCase;
  }
  async function isDaoPlanetInContract(locationId) {
    const planet = await coreContract.planets(`0x${locationId}`);
    return planet.owner.toLowerCase() == daoAddressLowerCase;
  }
  async function isMyPlanetInContract(p2) {
    const planet = await coreContract.planets(`0x${p2.locationId}`);
    return planet.owner.toLowerCase() == myAddressLowerCase;
  }
  async function ensurePlanetRegisteredToMe(p2) {
    if (!await isPlanetRegisteredToMe(p2)) {
      throw Error(`planet ${p2.locationId} has not registered to me (${myAddressLowerCase})`);
    }
  }
  async function ensurePlanetOwnedByDao(p2) {
    if (!await isDaoPlanetInContract(p2.locationId)) {
      throw Error(`planet ${p2.locationId} is not owned by dao ${daoAddressLowerCase}`);
    }
  }
  async function checkSelectedPlanetStatus() {
    if (!selectedPlanetId) {
      echo(`Please seleted a planet`);
      return;
    }
    const planet = df.getPlanetWithId(selectedPlanetId);
    const pName = getPlanetName(planet);
    console.log(`selectedPlanet`, planet);
    const owner = planet.owner.toLowerCase();
    switch (owner) {
      case daoAddressLowerCase:
        const registrar = (await daoContract.registeredOwners(`0x${selectedPlanetId}`)).toLowerCase();
        if (registrar === ethers_exports.constants.AddressZero) {
          echo(`selected planet is ${pName}, owned by dao (${owner}), registered to nobody`);
        } else if (registrar === myAddressLowerCase) {
          echo(`selected planet is ${pName}, owned by dao (${owner}), registered to me (${owner})`);
        } else {
          echo(`selected planet is ${pName}, owned by dao (${owner}), registered to player ${owner}`);
        }
        break;
      case myAddressLowerCase:
        echo(`selected planet is ${pName}, owned by me (${myAddressLowerCase})`);
        break;
      case ethers_exports.constants.AddressZero:
        echo(`selected planet is ${pName}, owned by nobody`);
        break;
      default:
        echo(`selected planet is ${pName}, owned by player ${owner}`);
        break;
    }
  }
  async function listAllPlanetsByOwner() {
    const allOwnedPlanets = df.getAllOwnedPlanets();
    const dict = {};
    allOwnedPlanets.forEach((p2) => {
      const owner = p2.owner.toLowerCase();
      const planets = dict[owner] || [];
      planets.push(p2);
      dict[owner] = planets;
    });
    const planetsByOwner = [];
    for (const owner in dict) {
      const planets = dict[owner];
      const planetCount = planets.length;
      const role = owner === myAddressLowerCase ? "me" : owner === daoAddressLowerCase ? "dao" : "other";
      planetsByOwner.push({ owner, role, planetCount, planets });
    }
    planetsByOwner.sort((a3, b3) => b3.planets.length - a3.planets.length);
    echo(`PlanetsByOwner: ${allOwnedPlanets.length} planets, see them in developer console (Press F12 in Chrome)`);
    console.log(`PlanetsByOwner`, planetsByOwner);
  }
  async function listPlanets(fetcher, listName, selectFirst = false) {
    echo("");
    echo(`${listName}: fetch start...`);
    const planets = await fetcher();
    console.log(`${listName}`, planets);
    if (!planets || planets.length === 0) {
      echo(`${listName}: no planet found.`);
    } else {
      const planetsInfo = planets.map((p2) => `  ${getPlanetName(p2)}, ${p2.locationId}`).join("\n");
      echo(`${listName}: found ${planets.length} planets: [
${planetsInfo}
]`);
      if (selectFirst) {
        ui.setSelectedId(planets[0]?.locationId);
      }
    }
  }
  async function listAllDaoPlanets() {
    return listPlanets(async () => {
      let planets = df.getAllOwnedPlanets().filter(isDaoPlanet);
      return planets;
    }, "DaoPlanets", true);
  }
  async function listDaoPlanetsRegisteredToMe() {
    return listPlanets(async () => {
      let planets = df.getAllOwnedPlanets().filter(isDaoPlanet);
      planets = await Promise2.filter(planets, isPlanetRegisteredToMe);
      return planets;
    }, "DaoPlanetsRegisteredToMe", true);
  }
  async function listWithdrawablePlanets() {
    return listPlanets(async () => {
      const planets = await allCandidatePlanets();
      return planets.filter((p2) => p2.planetType === import_types4.PlanetType.TRADING_POST && p2.silver > 100);
    }, "WithdrawablePlanets", true);
  }
  async function listProspectablePlanets() {
    return listPlanets(async () => {
      const planets = await allCandidatePlanets();
      return planets.filter(isProspectable).filter(enoughEnergyToProspect);
    }, "ProspectablePlanets", true);
  }
  async function listFindablePlanets() {
    return listPlanets(async () => {
      const planets = await allCandidatePlanets();
      const currentBlockNumber = await provider.getBlockNumber();
      return planets.filter((p2) => isFindable(p2, currentBlockNumber));
    }, "FindablePlanets", true);
  }
  async function _withdrawSilver(planets) {
    planets = planets.filter((p2) => p2.planetType === import_types4.PlanetType.TRADING_POST && p2.silver > 100);
    console.log(`WithdrawSilver: ${planets.length} planets matched`, planets);
    if (!planets.length) {
      echo(`WithdrawSilver: no planet matched`);
      return;
    }
    echo(`WithdrawSilver: ${planets.length} planets matched`);
    await bulkUiRefresh(planets);
    await _registerPlanetOwners(planets);
    planets = await _safeTransferPlanets(planets);
    await _contractWithdrawSilver(planets);
    planets = await Promise2.filter(planets, isMyPlanetInContract);
    echo(`WithdrawSilver: complete, returned ${planets.length} planets`);
  }
  async function _safeProspectPlanet(p2) {
    const pName = getPlanetName(p2);
    const desc = `prospect planet ${pName}`;
    try {
      const actionId = getRandomActionId();
      const prospectReceipt = await df.contractsAPI.prospectPlanet(p2.locationId, actionId);
      const prospectStatus = prospectReceipt.status;
      echo(`${desc}: block number = ${prospectReceipt.blockNumber}, status = ${prospectStatus}`);
      if (!prospectStatus) {
        echo(`${desc}: status error ${prospectStatus}`);
        console.error(`${desc}: status error`, prospectStatus);
        return false;
      }
      return true;
    } catch (e3) {
      echo(`${desc}: error ${e3}`);
      console.error(`${desc}: error`, e3);
    }
  }
  async function _prospect(planets) {
    planets = planets.filter(isProspectable).filter(enoughEnergyToProspect);
    console.log(`Prospect: ${planets.length} planets matched`, planets);
    if (!planets.length) {
      echo(`Prospect: no planet matched`);
      return;
    }
    echo(`Prospect: ${planets.length} planets matched`);
    planets = await Promise2.filter(planets, _safeProspectPlanet);
    await df.bulkHardRefreshPlanets(planets.map((p2) => p2.locationId));
    echo(`Prospect: complete, prospected ${planets.length} planets`);
  }
  async function _findArtifact(planets) {
    const currentBlockNumber = await provider.getBlockNumber();
    planets = planets.filter((p2) => isFindable(p2, currentBlockNumber));
    console.log(`FindArtifact: ${planets.length} planets`, planets);
    if (!planets.length) {
      echo(`FindArtifact: no planet matched`);
      return;
    }
    echo(`FindArtifact: ${planets.length} planets matched`);
    await bulkUiRefresh(planets);
    await _registerPlanetOwners(planets);
    planets = await _safeTransferPlanets(planets);
    await _contractFindArtifacts(planets);
    planets = await Promise2.filter(planets, isMyPlanetInContract);
    echo(`FindArtifact: complete, returned ${planets.length} planets`);
  }
  async function allCandidatePlanets() {
    const myPlanets = df.getMyPlanets();
    const daoPlanets = df.getAllOwnedPlanets().filter(isDaoPlanet);
    const myDaoPlanets = await Promise2.filter(daoPlanets, isPlanetRegisteredToMe);
    return [...myPlanets, ...myDaoPlanets];
  }
  async function selectedApplyOperation(operation, opName) {
    echo("");
    if (!selectedPlanetId) {
      echo(`Please seleted a planet`);
      return;
    }
    const planet = df.getPlanetWithId(selectedPlanetId);
    const pName = getPlanetName(planet);
    const desc = `${opName} on selected planet (${pName})`;
    echo(`${desc} start...`);
    try {
      await operation([planet]);
      echo(`${desc} complete`);
    } catch (e3) {
      echo(`${desc} error: ${e3}`);
      console.log(`${desc} error`, e3);
    }
  }
  async function allApplyOperation(operation, opName) {
    echo("");
    const desc = `${opName} for all planets`;
    echo(`${desc} start...`);
    try {
      const planets = await allCandidatePlanets();
      await operation(planets);
      echo(`${desc} complete`);
    } catch (e3) {
      echo(`${desc} error: ${e3}`);
      console.log(`${desc} error`, e3);
    }
  }
  async function selectedWithdrawSilver() {
    return selectedApplyOperation(_withdrawSilver, "WithdrawSilver");
  }
  async function selectedProspect() {
    return selectedApplyOperation(_prospect, "Prospect");
  }
  async function selectedFindArtifact() {
    return selectedApplyOperation(_findArtifact, "FindArtifact");
  }
  async function allWithdrawSilver() {
    return allApplyOperation(_withdrawSilver, "WithdrawSilver");
  }
  async function allProspect() {
    return allApplyOperation(_prospect, "Prospect");
  }
  async function allFindArtifact() {
    return allApplyOperation(_findArtifact, "FindArtifact");
  }
  return /* @__PURE__ */ v("div", {
    style: { padding: 10, height: "100%", overflowY: "scroll" }
  }, /* @__PURE__ */ v("div", {
    style: { display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }
  }, /* @__PURE__ */ v(Logo, null), /* @__PURE__ */ v("span", null, "DAO")), /* @__PURE__ */ v("div", null, /* @__PURE__ */ v("div", null, /* @__PURE__ */ v("p", {
    style: { marginTop: 8 }
  }, "1. Operation on Selected Planet:"), /* @__PURE__ */ v("button", {
    style: { marginRight: 8 },
    onClick: selectedWithdrawSilver
  }, "Withdraw Silver"), /* @__PURE__ */ v("button", {
    style: { marginRight: 8 },
    onClick: selectedProspect
  }, "Prospect"), /* @__PURE__ */ v("button", {
    style: { marginRight: 8 },
    onClick: selectedFindArtifact
  }, "Find Artifact")), /* @__PURE__ */ v("div", null, /* @__PURE__ */ v("p", {
    style: { marginTop: 8 }
  }, "2. Operation on All Matched Planets:"), /* @__PURE__ */ v("button", {
    style: { marginRight: 8 },
    onClick: allWithdrawSilver
  }, "Withdraw Silver"), /* @__PURE__ */ v("button", {
    style: { marginRight: 8 },
    onClick: allProspect
  }, "Prospect"), /* @__PURE__ */ v("button", {
    style: { marginRight: 8 },
    onClick: allFindArtifact
  }, "Find Artifacts")), /* @__PURE__ */ v("div", null, /* @__PURE__ */ v("p", {
    style: { marginTop: 8 }
  }, "3. Check Status:"), /* @__PURE__ */ v("button", {
    style: { marginRight: 8 },
    onClick: checkMyContribution
  }, "Check My Contribution"), /* @__PURE__ */ v("button", {
    style: { marginRight: 8 },
    onClick: checkSelectedPlanetStatus
  }, "Selected Planet Status")), /* @__PURE__ */ v("div", null, /* @__PURE__ */ v("p", {
    style: { marginTop: 8 }
  }, "4. Advanced Mode: List And Select Planets"), /* @__PURE__ */ v("div", null, /* @__PURE__ */ v("button", {
    style: { marginRight: 8 },
    onClick: listAllPlanetsByOwner
  }, "listAllPlanetsByOwner"), /* @__PURE__ */ v("button", {
    style: { marginRight: 8 },
    onClick: listAllDaoPlanets
  }, "DaoPlanets"), /* @__PURE__ */ v("button", {
    style: { marginRight: 8 },
    onClick: listDaoPlanetsRegisteredToMe
  }, "DaoPlanetsRegisteredToMe")), /* @__PURE__ */ v("div", {
    style: { marginTop: 8 }
  }, /* @__PURE__ */ v("button", {
    style: { marginRight: 8 },
    onClick: listWithdrawablePlanets
  }, "WithdrawablePlanets"), /* @__PURE__ */ v("button", {
    style: { marginRight: 8 },
    onClick: listProspectablePlanets
  }, "ProspectablePlanets"), /* @__PURE__ */ v("button", {
    style: { marginRight: 8 },
    onClick: listFindablePlanets
  }, "FindablePlanets")))));
}

// src/plugins/views/LeaderboardView.tsx
var Promise3 = __toModule(require_bluebird());

// src/plugins/components/Loading.tsx
function Loading({ length = 5, padding: padding2 = 8 }) {
  const [indicator, setIndicator] = l2(". ");
  y2(() => {
    let timeout = setTimeout(() => {
      if (indicator.length === length * 2)
        setIndicator(". ");
      else
        setIndicator(indicator + ". ");
    }, 150);
    return () => clearTimeout(timeout);
  }, [indicator]);
  return /* @__PURE__ */ v("div", {
    style: { padding: padding2 }
  }, indicator);
}

// src/plugins/components/ErrorLabel.tsx
function ErrorLabel({ error }) {
  return error ? /* @__PURE__ */ v("p", {
    style: { marginBottom: 8, padding: 8, color: colors.dfred }
  }, "Error: ", error.message) : null;
}

// src/plugins/views/LeaderboardView.tsx
function loadLeaderboard(store) {
  const { daoName, daoContract, coreContract, daoAddressLowerCase } = store;
  const [leaderboard, setLeaderboard] = l2({ dao: null, players: [] });
  const [loading, setLoading] = l2(true);
  const [error, setError] = l2(null);
  async function getDfScore(address) {
    try {
      const player = await coreContract.players(address);
      return Number(player.score);
    } catch (e3) {
      console.error(`get df score error`, e3);
      return 0;
    }
  }
  async function getContribution(address) {
    try {
      return Number(await daoContract.contributions(address));
    } catch (e3) {
      console.error(`get contribution error`, e3);
      return 0;
    }
  }
  async function loadData() {
    try {
      echo("");
      echo(`${daoName} fetch data...`);
      setLoading(true);
      setError(null);
      const count = await daoContract.playerCounter();
      const indexes = [...Array(count).keys()];
      const players = await Promise3.map(indexes, (i3) => daoContract.players(i3));
      const dfScores = await Promise3.map(players, getDfScore);
      const contributions = await Promise3.map(players, getContribution);
      const daoDfScore = await getDfScore(daoAddressLowerCase);
      const playerContributions = indexes.map((i3) => {
        return {
          address: players[i3],
          dfScore: dfScores[i3],
          contribution: contributions[i3],
          rank: 0
        };
      });
      const sortedPlayerContributions = playerContributions.sort((a3, b3) => b3.contribution - a3.contribution).map((entry, index) => {
        return {
          ...entry,
          rank: index + 1
        };
      });
      const daoPlayer = {
        address: daoAddressLowerCase,
        dfScore: daoDfScore,
        contribution: 0,
        rank: 0
      };
      console.log({ daoPlayer, sortedPlayerContributions });
      setLeaderboard({ dao: daoPlayer, players: sortedPlayerContributions });
      setLoading(false);
      echo(`${daoName} fetch data complete`);
    } catch (e3) {
      setLoading(false);
      setError(e3);
      echo(`${daoName} fetch data error ${error}`);
      console.log(`error`, e3);
    }
  }
  y2(() => {
    loadData();
  }, []);
  return { loading, error, leaderboard, loadData };
}
function addressUrl(address) {
  return `https://blockscout.com/xdai/mainnet/address/${address}/transactions`;
}
function addressText(address) {
  return `${address.slice(0, 7)}...`;
}
function PlayerName({ address }) {
  const handle = getTwitter(address.toLowerCase());
  const color = getPlayerColor(address);
  const name2 = handle ? `@${handle}` : addressText(address);
  const url = handle ? `https://twitter.com/${handle}` : addressUrl(address);
  return /* @__PURE__ */ v("a", {
    href: url,
    target: "_blank",
    style: { color },
    children: name2
  });
}
function LeaderboardView() {
  function renderPlayer(score) {
    const color = getPlayerColor(score.address);
    const { address, rank, contribution, dfScore } = score;
    return /* @__PURE__ */ v("div", {
      style: { display: "flex", gap: 5, color, alignItems: "baseline" },
      key: rank
    }, /* @__PURE__ */ v("p", null, rank, "."), /* @__PURE__ */ v(PlayerName, {
      address
    }), /* @__PURE__ */ v("p", {
      style: { fontSize: "0.8em", color: "#838383" }
    }, "(Score ", dfScore, ")"), /* @__PURE__ */ v("p", {
      style: { marginLeft: "auto" }
    }, contribution));
  }
  function renderLeaderboard(store) {
    const { leaderboard, loading, error, loadData } = loadLeaderboard(store);
    function renderData() {
      return /* @__PURE__ */ v("div", {
        style: { height: "100%", width: "100%", display: "flex", flexDirection: "column", alignItems: "start", gap: 5 }
      }, /* @__PURE__ */ v("p", {
        style: { fontSize: "0.9em", color: "white" }
      }, "Team Score: ", leaderboard?.dao?.dfScore || 0), /* @__PURE__ */ v("p", {
        style: { fontSize: "0.8em" }
      }, "Player Contributions:"), /* @__PURE__ */ v("div", {
        style: { width: "100%", flexGrow: 1, overflowY: "scroll", fontSize: "0.8em" }
      }, leaderboard.players.map(renderPlayer)), /* @__PURE__ */ v("button", {
        onClick: loadData
      }, "Refresh"));
    }
    let content;
    if (loading) {
      content = /* @__PURE__ */ v(Loading, null);
    } else if (error) {
      content = /* @__PURE__ */ v(ErrorLabel, {
        error
      });
    } else {
      content = renderData();
    }
    const daoUrl = addressUrl(store.daoAddressLowerCase);
    const daoStr = `(${addressText(store.daoAddressLowerCase)})`;
    return /* @__PURE__ */ v("div", {
      style: { padding: 5, flexGrow: 1, width: "50%", display: "flex", flexDirection: "column" }
    }, /* @__PURE__ */ v("p", {
      style: { color: store.daoColor, paddingBottom: 5 }
    }, store.daoName, " ", /* @__PURE__ */ v("a", {
      href: daoUrl,
      target: "_blank"
    }, daoStr)), content);
  }
  return /* @__PURE__ */ v("div", {
    style: { display: "flex", gap: 10, alignItems: "stretch", height: "100%" }
  }, renderLeaderboard(useStoreA()), renderLeaderboard(useStoreB()));
}

// src/plugins/views/DaoAppB.tsx
function DaoApp() {
  return /* @__PURE__ */ v(StoreProviderA, {
    value: createStoreB(),
    children: ""
  }, /* @__PURE__ */ v(StoreProviderB, {
    value: createStoreA(),
    children: ""
  }, /* @__PURE__ */ v(Navigation, {
    tabs: [
      { name: "Contribute", TabContent: DaoView },
      { name: "Leaderboard", TabContent: LeaderboardView }
    ]
  })));
}

// src/plugins/GangPluginBlue.tsx
var DaoPlugin = class {
  constructor() {
    this.container = null;
  }
  async render(container) {
    this.container = container;
    container.style.width = "600px";
    container.style.height = "400px";
    container.style.padding = 0;
    S(/* @__PURE__ */ v(DaoApp, null), container);
  }
  destroy() {
    S(null, this.container);
  }
};
var GangPluginBlue_default = DaoPlugin;
export {
  GangPluginBlue_default as default
};
/* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2018 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2018
 * @license MIT
 */
