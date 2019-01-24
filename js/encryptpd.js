var open_flag = !1, password_gb_interval = null;


function DesEncrypt(b) {
    return b = enString(b)
}

function DesDecrypt(b) {
    return b = deString(b)
}

function formatToHex(b, a) {
    var c = Array(8), d = Array(8);
    c[0] = "0x06";
    d[0] = "0x00";
    d[1] = "0x00";
    for (var e = 1, h = 2, l = "", g = 0; g < b.length; g += 2) c[e++] = "0x" + b.charAt(g) + b.charAt(g + 1);
    c[4] = "0xFF";
    c[5] = "0xFF";
    c[6] = "0xFF";
    c[7] = "0xFF";
    for (g = a.length - 13; g < a.length - 1; g += 2) d[h++] = "0x" + a.charAt(g) + a.charAt(g + 1);
    for (g = 0; 8 > g; g++) l += convertToHex(d[g] ^ c[g]);
    return do_encrypt(l)
}

function convertToHex(b) {
    b = b.toString(16);
    1 == b.length && (b = "0" + b);
    return b = "0x" + b.toUpperCase()
}


function do_encrypt(b) {
    var a = window.publicKey;
    a || (a = "e1796383971e7b5dd9b551090b2b51bb97a49ac03f9ed73e43461309af33028ee5740f32f329266da69562993736145641f078544f955e61e5b430b0176319a85aacf8653043ec92b9cf374e1853630b68480d406ef15f9d3c161d540bb405d9b85401cb3661951672839750922ff76adf5739ea9beb66da00b1217fcce6b1f74ac2cfa454103bb11ee8ee415baad82d8d89847f5a60570ff2f049b4e35bae0052eab8b79e8211737fbc6b2a940ce8db5004871d9b2a1f98d1281267b3308858b48f20fac2910c33ba38782f48a38d59b606cf5899a0f36a08940f27cff003cb84d629e83e27a86b0be54c6e7d457b2b642e4ee8dfccebde5112883ae157d315");
    var c = new RSAKey;
    c.setPublic(a, window.exponent);
    if (b = c.encrypt(b)) {
        return b;
    }

    alert("加密失败")
}

function do_encrypt_back(b) {
    var a = window.publicKey;
    a || (a = "e1796383971e7b5dd9b551090b2b51bb97a49ac03f9ed73e43461309af33028ee5740f32f329266da69562993736145641f078544f955e61e5b430b0176319a85aacf8653043ec92b9cf374e1853630b68480d406ef15f9d3c161d540bb405d9b85401cb3661951672839750922ff76adf5739ea9beb66da00b1217fcce6b1f74ac2cfa454103bb11ee8ee415baad82d8d89847f5a60570ff2f049b4e35bae0052eab8b79e8211737fbc6b2a940ce8db5004871d9b2a1f98d1281267b3308858b48f20fac2910c33ba38782f48a38d59b606cf5899a0f36a08940f27cff003cb84d629e83e27a86b0be54c6e7d457b2b642e4ee8dfccebde5112883ae157d315");
    var c = new RSAKey;
    c.setPublic(a, window.exponent);
    if (b = c.encrypt_back(b)) {
        return b;
    }
    alert("加密失败")
}

var dbits, canary = 0xdeadbeefcafe, j_lm = 15715070 == (canary & 16777215);

function BigInteger(b, a, c) {
    null != b && ("number" == typeof b ? this.fromNumber(b, a, c) : null == a && "string" != typeof b ? this.fromString(b, 256) : this.fromString(b, a))
}

function nbi() {
    return new BigInteger(null)
}

function am1(b, a, c, d, e, h) {
    for (; 0 <= --h;) {
        var l = a * this[b++] + c[d] + e, e = Math.floor(l / 67108864);
        c[d++] = l & 67108863
    }
    return e
}

function am2(b, a, c, d, e, h) {
    for (var l = a & 32767, a = a >> 15; 0 <= --h;) {
        var g = this[b] & 32767, p = this[b++] >> 15, q = a * g + p * l,
            g = l * g + ((q & 32767) << 15) + c[d] + (e & 1073741823), e = (g >>> 30) + (q >>> 15) + a * p + (e >>> 30);
        c[d++] = g & 1073741823
    }
    return e
}

function am3(b, a, c, d, e, h) {
    for (var l = a & 16383, a = a >> 14; 0 <= --h;) {
        var g = this[b] & 16383, p = this[b++] >> 14, q = a * g + p * l, g = l * g + ((q & 16383) << 14) + c[d] + e,
            e = (g >> 28) + (q >> 14) + a * p;
        c[d++] = g & 268435455
    }
    return e
}

j_lm && "Microsoft Internet Explorer" == navigator.appName ? (BigInteger.prototype.am = am2, dbits = 30) : j_lm && "Netscape" != navigator.appName ? (BigInteger.prototype.am = am1, dbits = 26) : (BigInteger.prototype.am = am3, dbits = 28);
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz", BI_RC = [], rr, vv;
rr = 48;
for (vv = 0; 9 >= vv; ++vv) BI_RC[rr++] = vv;
rr = 97;
for (vv = 10; 36 > vv; ++vv) BI_RC[rr++] = vv;
rr = 65;
for (vv = 10; 36 > vv; ++vv) BI_RC[rr++] = vv;

function int2char(b) {
    return BI_RM.charAt(b)
}

function intAt(b, a) {
    var c = BI_RC[b.charCodeAt(a)];
    return c == null ? -1 : c
}

function bnpCopyTo(b) {
    for (var a = this.t - 1; a >= 0; --a) b[a] = this[a];
    b.t = this.t;
    b.s = this.s
}

function bnpFromInt(b) {
    this.t = 1;
    this.s = b < 0 ? -1 : 0;
    b > 0 ? this[0] = b : b < -1 ? this[0] = b + this.DV : this.t = 0
}

function nbv(b) {
    var a = nbi();
    a.fromInt(b);
    return a
}

function bnpFromString(b, a) {
    var c;
    if (a == 16) c = 4; else if (a == 8) c = 3; else if (a == 256) c = 8; else if (a == 2) c = 1; else if (a == 32) c = 5; else if (a == 4) c = 2; else {
        this.fromRadix(b, a);
        return
    }
    this.s = this.t = 0;
    for (var d = b.length, e = false, h = 0; --d >= 0;) {
        var l = c == 8 ? b[d] & 255 : intAt(b, d);
        if (l < 0) b.charAt(d) == "-" && (e = true); else {
            e = false;
            if (h == 0) this[this.t++] = l; else if (h + c > this.DB) {
                this[this.t - 1] = this[this.t - 1] | (l & (1 << this.DB - h) - 1) << h;
                this[this.t++] = l >> this.DB - h
            } else this[this.t - 1] = this[this.t - 1] | l << h;
            h = h + c;
            h >= this.DB && (h = h - this.DB)
        }
    }
    if (c ==
        8 && (b[0] & 128) != 0) {
        this.s = -1;
        h > 0 && (this[this.t - 1] = this[this.t - 1] | (1 << this.DB - h) - 1 << h)
    }
    this.clamp();
    e && BigInteger.ZERO.subTo(this, this)
}

function bnpClamp() {
    for (var b = this.s & this.DM; this.t > 0 && this[this.t - 1] == b;) --this.t
}

function bnToString(b) {
    if (this.s < 0) return "-" + this.negate().toString(b);
    if (b == 16) b = 4; else if (b == 8) b = 3; else if (b == 2) b = 1; else if (b == 32) b = 5; else if (b == 4) b = 2; else return this.toRadix(b);
    var a = (1 << b) - 1, c, d = false, e = "", h = this.t, l = this.DB - h * this.DB % b;
    if (h-- > 0) {
        if (l < this.DB && (c = this[h] >> l) > 0) {
            d = true;
            e = int2char(c)
        }
        for (; h >= 0;) {
            if (l < b) {
                c = (this[h] & (1 << l) - 1) << b - l;
                c = c | this[--h] >> (l = l + (this.DB - b))
            } else {
                c = this[h] >> (l = l - b) & a;
                if (l <= 0) {
                    l = l + this.DB;
                    --h
                }
            }
            c > 0 && (d = true);
            d && (e = e + int2char(c))
        }
    }
    return d ? e : "0"
}

function bnNegate() {
    var b = nbi();
    BigInteger.ZERO.subTo(this, b);
    return b
}

function bnAbs() {
    return this.s < 0 ? this.negate() : this
}

function bnCompareTo(b) {
    var a = this.s - b.s;
    if (a != 0) return a;
    var c = this.t, a = c - b.t;
    if (a != 0) return this.s < 0 ? -a : a;
    for (; --c >= 0;) if ((a = this[c] - b[c]) != 0) return a;
    return 0
}

function nbits(b) {
    var a = 1, c;
    if ((c = b >>> 16) != 0) {
        b = c;
        a = a + 16
    }
    if ((c = b >> 8) != 0) {
        b = c;
        a = a + 8
    }
    if ((c = b >> 4) != 0) {
        b = c;
        a = a + 4
    }
    if ((c = b >> 2) != 0) {
        b = c;
        a = a + 2
    }
    b >> 1 != 0 && (a = a + 1);
    return a
}

function bnBitLength() {
    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
}

function bnpDLShiftTo(b, a) {
    var c;
    for (c = this.t - 1; c >= 0; --c) a[c + b] = this[c];
    for (c = b - 1; c >= 0; --c) a[c] = 0;
    a.t = this.t + b;
    a.s = this.s
}

function bnpDRShiftTo(b, a) {
    for (var c = b; c < this.t; ++c) a[c - b] = this[c];
    a.t = Math.max(this.t - b, 0);
    a.s = this.s
}

function bnpLShiftTo(b, a) {
    var c = b % this.DB, d = this.DB - c, e = (1 << d) - 1, h = Math.floor(b / this.DB), l = this.s << c & this.DM, g;
    for (g = this.t - 1; g >= 0; --g) {
        a[g + h + 1] = this[g] >> d | l;
        l = (this[g] & e) << c
    }
    for (g = h - 1; g >= 0; --g) a[g] = 0;
    a[h] = l;
    a.t = this.t + h + 1;
    a.s = this.s;
    a.clamp()
}

function bnpRShiftTo(b, a) {
    a.s = this.s;
    var c = Math.floor(b / this.DB);
    if (c >= this.t) a.t = 0; else {
        var d = b % this.DB, e = this.DB - d, h = (1 << d) - 1;
        a[0] = this[c] >> d;
        for (var l = c + 1; l < this.t; ++l) {
            a[l - c - 1] = a[l - c - 1] | (this[l] & h) << e;
            a[l - c] = this[l] >> d
        }
        d > 0 && (a[this.t - c - 1] = a[this.t - c - 1] | (this.s & h) << e);
        a.t = this.t - c;
        a.clamp()
    }
}

function bnpSubTo(b, a) {
    for (var c = 0, d = 0, e = Math.min(b.t, this.t); c < e;) {
        d = d + (this[c] - b[c]);
        a[c++] = d & this.DM;
        d = d >> this.DB
    }
    if (b.t < this.t) {
        for (d = d - b.s; c < this.t;) {
            d = d + this[c];
            a[c++] = d & this.DM;
            d = d >> this.DB
        }
        d = d + this.s
    } else {
        for (d = d + this.s; c < b.t;) {
            d = d - b[c];
            a[c++] = d & this.DM;
            d = d >> this.DB
        }
        d = d - b.s
    }
    a.s = d < 0 ? -1 : 0;
    d < -1 ? a[c++] = this.DV + d : d > 0 && (a[c++] = d);
    a.t = c;
    a.clamp()
}

function bnpMultiplyTo(b, a) {
    var c = this.abs(), d = b.abs(), e = c.t;
    for (a.t = e + d.t; --e >= 0;) a[e] = 0;
    for (e = 0; e < d.t; ++e) a[e + c.t] = c.am(0, d[e], a, e, 0, c.t);
    a.s = 0;
    a.clamp();
    this.s != b.s && BigInteger.ZERO.subTo(a, a)
}

function bnpSquareTo(b) {
    for (var a = this.abs(), c = b.t = 2 * a.t; --c >= 0;) b[c] = 0;
    for (c = 0; c < a.t - 1; ++c) {
        var d = a.am(c, a[c], b, 2 * c, 0, 1);
        if ((b[c + a.t] = b[c + a.t] + a.am(c + 1, 2 * a[c], b, 2 * c + 1, d, a.t - c - 1)) >= a.DV) {
            b[c + a.t] = b[c + a.t] - a.DV;
            b[c + a.t + 1] = 1
        }
    }
    b.t > 0 && (b[b.t - 1] = b[b.t - 1] + a.am(c, a[c], b, 2 * c, 0, 1));
    b.s = 0;
    b.clamp()
}

function bnpDivRemTo(b, a, c) {
    var d = b.abs();
    if (!(d.t <= 0)) {
        var e = this.abs();
        if (e.t < d.t) {
            a != null && a.fromInt(0);
            c != null && this.copyTo(c)
        } else {
            c == null && (c = nbi());
            var h = nbi(), l = this.s, b = b.s, g = this.DB - nbits(d[d.t - 1]);
            if (g > 0) {
                d.lShiftTo(g, h);
                e.lShiftTo(g, c)
            } else {
                d.copyTo(h);
                e.copyTo(c)
            }
            d = h.t;
            e = h[d - 1];
            if (e != 0) {
                var p = e * (1 << this.F1) + (d > 1 ? h[d - 2] >> this.F2 : 0), q = this.FV / p, p = (1 << this.F1) / p,
                    u = 1 << this.F2, r = c.t, o = r - d, f = a == null ? nbi() : a;
                h.dlShiftTo(o, f);
                if (c.compareTo(f) >= 0) {
                    c[c.t++] = 1;
                    c.subTo(f, c)
                }
                BigInteger.ONE.dlShiftTo(d,
                    f);
                for (f.subTo(h, h); h.t < d;) h[h.t++] = 0;
                for (; --o >= 0;) {
                    var w = c[--r] == e ? this.DM : Math.floor(c[r] * q + (c[r - 1] + u) * p);
                    if ((c[r] = c[r] + h.am(0, w, c, o, 0, d)) < w) {
                        h.dlShiftTo(o, f);
                        for (c.subTo(f, c); c[r] < --w;) c.subTo(f, c)
                    }
                }
                if (a != null) {
                    c.drShiftTo(d, a);
                    l != b && BigInteger.ZERO.subTo(a, a)
                }
                c.t = d;
                c.clamp();
                g > 0 && c.rShiftTo(g, c);
                l < 0 && BigInteger.ZERO.subTo(c, c)
            }
        }
    }
}

function bnMod(b) {
    var a = nbi();
    this.abs().divRemTo(b, null, a);
    this.s < 0 && a.compareTo(BigInteger.ZERO) > 0 && b.subTo(a, a);
    return a
}

function Classic(b) {
    this.m = b
}

function cConvert(b) {
    return b.s < 0 || b.compareTo(this.m) >= 0 ? b.mod(this.m) : b
}

function cRevert(b) {
    return b
}

function cReduce(b) {
    b.divRemTo(this.m, null, b)
}

function cMulTo(b, a, c) {
    b.multiplyTo(a, c);
    this.reduce(c)
}

function cSqrTo(b, a) {
    b.squareTo(a);
    this.reduce(a)
}

Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;

function bnpInvDigit() {
    if (this.t < 1) return 0;
    var b = this[0];
    if ((b & 1) == 0) return 0;
    var a = b & 3, a = a * (2 - (b & 15) * a) & 15, a = a * (2 - (b & 255) * a) & 255,
        a = a * (2 - ((b & 65535) * a & 65535)) & 65535, a = a * (2 - b * a % this.DV) % this.DV;
    return a > 0 ? this.DV - a : -a
}

function Montgomery(b) {
    this.m = b;
    this.mp = b.invDigit();
    this.mpl = this.mp & 32767;
    this.mph = this.mp >> 15;
    this.um = (1 << b.DB - 15) - 1;
    this.mt2 = 2 * b.t
}

function montConvert(b) {
    var a = nbi();
    b.abs().dlShiftTo(this.m.t, a);
    a.divRemTo(this.m, null, a);
    b.s < 0 && a.compareTo(BigInteger.ZERO) > 0 && this.m.subTo(a, a);
    return a
}

function montRevert(b) {
    var a = nbi();
    b.copyTo(a);
    this.reduce(a);
    return a
}

function montReduce(b) {
    for (; b.t <= this.mt2;) b[b.t++] = 0;
    for (var a = 0; a < this.m.t; ++a) {
        var c = b[a] & 32767, d = c * this.mpl + ((c * this.mph + (b[a] >> 15) * this.mpl & this.um) << 15) & b.DM,
            c = a + this.m.t;
        for (b[c] = b[c] + this.m.am(0, d, b, a, 0, this.m.t); b[c] >= b.DV;) {
            b[c] = b[c] - b.DV;
            b[++c]++
        }
    }
    b.clamp();
    b.drShiftTo(this.m.t, b);
    b.compareTo(this.m) >= 0 && b.subTo(this.m, b)
}

function montSqrTo(b, a) {
    b.squareTo(a);
    this.reduce(a)
}

function montMulTo(b, a, c) {
    b.multiplyTo(a, c);
    this.reduce(c)
}

Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

function bnpIsEven() {
    return (this.t > 0 ? this[0] & 1 : this.s) == 0
}

function bnpExp(b, a) {
    if (b > 4294967295 || b < 1) return BigInteger.ONE;
    var c = nbi(), d = nbi(), e = a.convert(this), h = nbits(b) - 1;
    for (e.copyTo(c); --h >= 0;) {
        a.sqrTo(c, d);
        if ((b & 1 << h) > 0) a.mulTo(d, e, c); else var l = c, c = d, d = l
    }
    return a.revert(c)
}

function bnModPowInt(b, a) {
    var c;
    c = b < 256 || a.isEven() ? new Classic(a) : new Montgomery(a);
    return this.exp(b, c)
}

BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);

function Arcfour() {
    this.j = this.i = 0;
    this.S = []
}

function ARC4init(b) {
    var a, c, d;
    for (a = 0; a < 256; ++a) this.S[a] = a;
    for (a = c = 0; a < 256; ++a) {
        c = c + this.S[a] + b[a % b.length] & 255;
        d = this.S[a];
        this.S[a] = this.S[c];
        this.S[c] = d
    }
    this.j = this.i = 0
}

function ARC4next() {
    var b;
    this.i = this.i + 1 & 255;
    this.j = this.j + this.S[this.i] & 255;
    b = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = b;
    return this.S[b + this.S[this.i] & 255]
}

Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;

function prng_newstate() {
    return new Arcfour
}

var rng_psize = 256, rng_state, rng_pool, rng_pptr;

function rng_seed_int(b) {
    rng_pool[rng_pptr++] ^= b & 255;
    rng_pool[rng_pptr++] ^= b >> 8 & 255;
    rng_pool[rng_pptr++] ^= b >> 16 & 255;
    rng_pool[rng_pptr++] ^= b >> 24 & 255;
    rng_pptr >= rng_psize && (rng_pptr = rng_pptr - rng_psize)
}

function rng_seed_time() {
    rng_seed_int((new Date).getTime())
}

if (null == rng_pool) {
    rng_pool = [];
    rng_pptr = 0;
    var t;
    if (window.crypto && window.crypto.getRandomValues) {
        var ua = new Uint8Array(32);
        window.crypto.getRandomValues(ua);
        for (t = 0; 32 > t; ++t) rng_pool[rng_pptr++] = ua[t]
    }
    if ("Netscape" == navigator.appName && "5" > navigator.appVersion && window.crypto && window.crypto.random) {
        var z = window.crypto.random(32);
        for (t = 0; t < z.length; ++t) rng_pool[rng_pptr++] = z.charCodeAt(t) & 255
    }
    for (; rng_pptr < rng_psize;) t = Math.floor(65536 * Math.random()), rng_pool[rng_pptr++] = t >>> 8, rng_pool[rng_pptr++] = t &
        255;
    rng_pptr = 0;
    rng_seed_time()
}

function rng_get_byte() {
    if (rng_state == null) {
        rng_seed_time();
        rng_state = prng_newstate();
        rng_state.init(rng_pool);
        for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) rng_pool[rng_pptr] = 0;
        rng_pptr = 0
    }
    return rng_state.next()
}

function rng_get_bytes(b) {
    var a;
    for (a = 0; a < b.length; ++a) b[a] = rng_get_byte()
}

function SecureRandom() {
}

SecureRandom.prototype.nextBytes = rng_get_bytes;

function parseBigInt(b, a) {
    return new BigInteger(b, a)
}

function linebrk(b, a) {
    for (var c = "", d = 0; d + a < b.length;) {
        c = c + (b.substring(d, d + a) + "\n");
        d = d + a
    }
    return c + b.substring(d, b.length)
}

function byte2Hex(b) {
    return b < 16 ? "0" + b.toString(16) : b.toString(16)
}

function pkcs1pad2(b, a) {
    for (var c = [], d = 248, e = 0; e < b.length; e = e + 4) c[d++] = parseInt(b.substring(e, e + 4));
    a = 248;
    c[--a] = 0;
    d = new SecureRandom;
    for (e = []; a > 2;) {
        for (e[0] = 0; e[0] == 0;) d.nextBytes(e);
        c[--a] = e[0]
    }
    c[--a] = 2;
    c[--a] = 0;
    return new BigInteger(c)
}

function pkcs1pad2_bak(b, a) {
    if (a < b.length + 11) {
        alert("Message too long for RSA");
        return null
    }
    for (var c = [], d = b.length - 1; d >= 0 && a > 0;) {
        var e = b.charCodeAt(d--);
        if (e < 128) c[--a] = e; else if (e > 127 && e < 2048) {
            c[--a] = e & 63 | 128;
            c[--a] = e >> 6 | 192
        } else {
            c[--a] = e & 63 | 128;
            c[--a] = e >> 6 & 63 | 128;
            c[--a] = e >> 12 | 224
        }
    }
    c[--a] = 0;
    d = new SecureRandom;
    for (e = []; a > 2;) {
        for (e[0] = 0; e[0] == 0;) d.nextBytes(e);
        c[--a] = e[0]
    }
    c[--a] = 2;
    c[--a] = 0;
    return new BigInteger(c)
}

function RSAKey() {
    this.n = null;
    this.e = 0;
    this.coeff = this.dmq1 = this.dmp1 = this.q = this.p = this.d = null
}

function RSASetPublic(b, a) {
    if (b != null && a != null && b.length > 0 && a.length > 0) {
        this.n = parseBigInt(b, 16);
        this.e = parseInt(a, 16)
    } else alert("Invalid RSA public key")
}

function RSADoPublic(b) {
    return b.modPowInt(this.e, this.n)
}

function RSAEncrypt(b) {
    b = pkcs1pad2(b, this.n.bitLength() + 7 >> 3);
    if (b == null) return null;
    b = this.doPublic(b);
    if (b == null) return null;
    b = b.toString(16);
    return (b.length & 1) == 0 ? b : "0" + b
}

function RSAEncrypt_back(b) {
    b = pkcs1pad2_bak(b, this.n.bitLength() + 7 >> 3);
    if (b == null) return null;
    b = this.doPublic(b);
    if (b == null) return null;
    b = b.toString(16);
    return (b.length & 1) == 0 ? b : "0" + b
}

RSAKey.prototype.doPublic = RSADoPublic;
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
RSAKey.prototype.encrypt_back = RSAEncrypt_back;
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", b64padchar = "=";

function hex2b64(b) {
    var a, c, d = "";
    for (a = 0; a + 3 <= b.length; a = a + 3) {
        c = parseInt(b.substring(a, a + 3), 16);
        d = d + (b64map.charAt(c >> 6) + b64map.charAt(c & 63))
    }
    if (a + 1 == b.length) {
        c = parseInt(b.substring(a, a + 1), 16);
        d = d + b64map.charAt(c << 2)
    } else if (a + 2 == b.length) {
        c = parseInt(b.substring(a, a + 2), 16);
        d = d + (b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4))
    }
    for (; (d.length & 3) > 0;) d = d + b64padchar;
    return d
}

function b64tohex(b) {
    var a = "", c, d = 0, e;
    for (c = 0; c < b.length; ++c) {
        if (b.charAt(c) == b64padchar) break;
        v = b64map.indexOf(b.charAt(c));
        if (!(v < 0)) if (d == 0) {
            a = a + int2char(v >> 2);
            e = v & 3;
            d = 1
        } else if (d == 1) {
            a = a + int2char(e << 2 | v >> 4);
            e = v & 15;
            d = 2
        } else if (d == 2) {
            a = a + int2char(e);
            a = a + int2char(v >> 2);
            e = v & 3;
            d = 3
        } else {
            a = a + int2char(e << 2 | v >> 4);
            a = a + int2char(v & 15);
            d = 0
        }
    }
    d == 1 && (a = a + int2char(e << 2));
    return a
}

function b64toBA(b) {
    var b = b64tohex(b), a, c = [];
    for (a = 0; 2 * a < b.length; ++a) c[a] = parseInt(b.substring(2 * a, 2 * a + 2), 16);
    return c
}

var key1 = "", key2 = "", key3 = "", array = "12345678".split("");
array.sort(function () {
    return Math.random() > 0.5 ? -1 : 1
});
key1 = array[0] + array[1] + array[2] + array[3] + array[4] + array[5] + array[6] + array[7];
key2 = array[1] + array[2] + array[3] + array[4] + array[5] + array[6] + array[7] + array[0];
key3 = array[2] + array[3] + array[4] + array[5] + array[6] + array[7] + array[0] + array[1];

function enString(b) {
    return strEnc(b, key1, key2, key3)
}

function deString(b) {
    return strDec(b, key1, key2, key3)
}

function strEnc(b, a, c, d) {
    var e = b.length, h = "", l, g, p, q, u, r;
    if (a != null && a != "") {
        l = getKeyBytes(a);
        q = l.length
    }
    if (c != null && c != "") {
        g = getKeyBytes(c);
        u = g.length
    }
    if (d != null && d != "") {
        p = getKeyBytes(d);
        r = p.length
    }
    if (e > 0) if (e < 4) {
        var h = strToBt(b), o;
        if (a != null && a != "" && c != null && c != "" && d != null && d != "") {
            var f;
            o = h;
            for (f = 0; f < q; f++) o = enc(o, l[f]);
            for (f = 0; f < u; f++) o = enc(o, g[f]);
            for (f = 0; f < r; f++) o = enc(o, p[f])
        } else if (a != null && a != "" && c != null && c != "") {
            o = h;
            for (f = 0; f < q; f++) o = enc(o, l[f]);
            for (f = 0; f < u; f++) o = enc(o, g[f])
        } else if (a != null &&
            a != "") {
            o = h;
            for (f = 0; f < q; f++) o = enc(o, l[f])
        }
        h = bt64ToHex(o)
    } else {
        for (var w = parseInt(e / 4), x = e % 4, s = 0, s = 0; s < w; s++) {
            f = b.substring(s * 4 + 0, s * 4 + 4);
            f = strToBt(f);
            if (a != null && a != "" && c != null && c != "" && d != null && d != "") {
                o = f;
                for (f = 0; f < q; f++) o = enc(o, l[f]);
                for (f = 0; f < u; f++) o = enc(o, g[f]);
                for (f = 0; f < r; f++) o = enc(o, p[f])
            } else if (a != null && a != "" && c != null && c != "") {
                o = f;
                for (f = 0; f < q; f++) o = enc(o, l[f]);
                for (f = 0; f < u; f++) o = enc(o, g[f])
            } else if (a != null && a != "") {
                o = f;
                for (f = 0; f < q; f++) o = enc(o, l[f])
            }
            h = h + bt64ToHex(o)
        }
        if (x > 0) {
            b = b.substring(w * 4 + 0, e);
            f = strToBt(b);
            if (a != null && a != "" && c != null && c != "" && d != null && d != "") {
                o = f;
                for (f = 0; f < q; f++) o = enc(o, l[f]);
                for (f = 0; f < u; f++) o = enc(o, g[f]);
                for (f = 0; f < r; f++) o = enc(o, p[f])
            } else if (a != null && a != "" && c != null && c != "") {
                o = f;
                for (f = 0; f < q; f++) o = enc(o, l[f]);
                for (f = 0; f < u; f++) o = enc(o, g[f])
            } else if (a != null && a != "") {
                o = f;
                for (f = 0; f < q; f++) o = enc(o, l[f])
            }
            h = h + bt64ToHex(o)
        }
    }
    return h
}

function strDec(b, a, c, d) {
    var e = b.length, h = "", l, g, p, q, u, r;
    if (a != null && a != "") {
        l = getKeyBytes(a);
        q = l.length
    }
    if (c != null && c != "") {
        g = getKeyBytes(c);
        u = g.length
    }
    if (d != null && d != "") {
        p = getKeyBytes(d);
        r = p.length
    }
    for (var e = parseInt(e / 16), o = 0, o = 0; o < e; o++) {
        for (var f = b.substring(o * 16 + 0, o * 16 + 16), f = hexToBt64(f), w = Array(64), x = 0, x = 0; x < 64; x++) w[x] = parseInt(f.substring(x, x + 1));
        var s;
        if (a != null && a != "" && c != null && c != "" && d != null && d != "") {
            s = w;
            for (f = r - 1; f >= 0; f--) s = dec(s, p[f]);
            for (f = u - 1; f >= 0; f--) s = dec(s, g[f]);
            for (f = q - 1; f >= 0; f--) s =
                dec(s, l[f])
        } else if (a != null && a != "" && c != null && c != "") {
            s = w;
            for (f = u - 1; f >= 0; f--) s = dec(s, g[f]);
            for (f = q - 1; f >= 0; f--) s = dec(s, l[f])
        } else if (a != null && a != "") {
            s = w;
            for (f = q - 1; f >= 0; f--) s = dec(s, l[f])
        }
        h = h + byteToString(s)
    }
    return h
}

function getKeyBytes(b) {
    for (var a = [], c = b.length, d = parseInt(c / 4), e = c % 4, h = 0, h = 0; h < d; h++) a[h] = strToBt(b.substring(h * 4 + 0, h * 4 + 4));
    e > 0 && (a[h] = strToBt(b.substring(h * 4 + 0, c)));
    return a
}

function strToBt(b) {
    var a = b.length, c = Array(64);
    if (a < 4) {
        for (var d = 0, e = 0, d = e = d = 0; d < a; d++) for (var h = b.charCodeAt(d), e = 0; e < 16; e++) {
            for (var l = 1, g = 0, g = 15; g > e; g--) l = l * 2;
            c[16 * d + e] = parseInt(h / l) % 2
        }
        for (d = a; d < 4; d++) for (e = h = 0; e < 16; e++) {
            l = 1;
            for (g = 15; g > e; g--) l = l * 2;
            c[16 * d + e] = parseInt(h / l) % 2
        }
    } else for (d = 0; d < 4; d++) {
        h = b.charCodeAt(d);
        for (e = 0; e < 16; e++) {
            l = 1;
            for (g = 15; g > e; g--) l = l * 2;
            c[16 * d + e] = parseInt(h / l) % 2
        }
    }
    return c
}

function bt4ToHex(b) {
    var a;
    switch (b) {
        case "0000":
            a = "0";
            break;
        case "0001":
            a = "1";
            break;
        case "0010":
            a = "2";
            break;
        case "0011":
            a = "3";
            break;
        case "0100":
            a = "4";
            break;
        case "0101":
            a = "5";
            break;
        case "0110":
            a = "6";
            break;
        case "0111":
            a = "7";
            break;
        case "1000":
            a = "8";
            break;
        case "1001":
            a = "9";
            break;
        case "1010":
            a = "A";
            break;
        case "1011":
            a = "B";
            break;
        case "1100":
            a = "C";
            break;
        case "1101":
            a = "D";
            break;
        case "1110":
            a = "E";
            break;
        case "1111":
            a = "F"
    }
    return a
}

function hexToBt4(b) {
    var a;
    switch (b) {
        case "0":
            a = "0000";
            break;
        case "1":
            a = "0001";
            break;
        case "2":
            a = "0010";
            break;
        case "3":
            a = "0011";
            break;
        case "4":
            a = "0100";
            break;
        case "5":
            a = "0101";
            break;
        case "6":
            a = "0110";
            break;
        case "7":
            a = "0111";
            break;
        case "8":
            a = "1000";
            break;
        case "9":
            a = "1001";
            break;
        case "A":
            a = "1010";
            break;
        case "B":
            a = "1011";
            break;
        case "C":
            a = "1100";
            break;
        case "D":
            a = "1101";
            break;
        case "E":
            a = "1110";
            break;
        case "F":
            a = "1111"
    }
    return a
}

function byteToString(b) {
    var a = "";
    for (i = 0; i < 4; i++) {
        var c = 0;
        for (j = 0; j < 16; j++) {
            var d = 1;
            for (m = 15; m > j; m--) d = d * 2;
            c = c + b[16 * i + j] * d
        }
        c != 0 && (a = a + String.fromCharCode(c))
    }
    return a
}

function bt64ToHex(b) {
    var a = "";
    for (i = 0; i < 16; i++) {
        var c = "";
        for (j = 0; j < 4; j++) c = c + b[i * 4 + j];
        a = a + bt4ToHex(c)
    }
    return a
}

function hexToBt64(b) {
    var a = "";
    for (i = 0; i < 16; i++) a = a + hexToBt4(b.substring(i, i + 1));
    return a
}

function enc(b, a) {
    for (var c = generateKeys(a), d = initPermute(b), e = Array(32), h = Array(32), l = Array(32), g = 0, p = 0, g = p = p = g = 0; g < 32; g++) {
        e[g] = d[g];
        h[g] = d[32 + g]
    }
    for (g = 0; g < 16; g++) {
        for (p = 0; p < 32; p++) {
            l[p] = e[p];
            e[p] = h[p]
        }
        d = Array(48);
        for (p = 0; p < 48; p++) d[p] = c[g][p];
        d = xor(pPermute(sBoxPermute(xor(expandPermute(h), d))), l);
        for (p = 0; p < 32; p++) h[p] = d[p]
    }
    c = Array(64);
    for (g = 0; g < 32; g++) {
        c[g] = h[g];
        c[32 + g] = e[g]
    }
    return finallyPermute(c)
}

function dec(b, a) {
    for (var c = generateKeys(a), d = initPermute(b), e = Array(32), h = Array(32), l = Array(32), g = 0, p = 0, g = p = p = g = 0; g < 32; g++) {
        e[g] = d[g];
        h[g] = d[32 + g]
    }
    for (g = 15; g >= 0; g--) {
        for (p = 0; p < 32; p++) {
            l[p] = e[p];
            e[p] = h[p]
        }
        d = Array(48);
        for (p = 0; p < 48; p++) d[p] = c[g][p];
        d = xor(pPermute(sBoxPermute(xor(expandPermute(h), d))), l);
        for (p = 0; p < 32; p++) h[p] = d[p]
    }
    c = Array(64);
    for (g = 0; g < 32; g++) {
        c[g] = h[g];
        c[32 + g] = e[g]
    }
    return finallyPermute(c)
}

function initPermute(b) {
    var a = Array(64);
    i = 0;
    m = 1;
    for (n = 0; i < 4; i++, m = m + 2, n = n + 2) {
        j = 7;
        for (k = 0; j >= 0; j--, k++) {
            a[i * 8 + k] = b[j * 8 + m];
            a[i * 8 + k + 32] = b[j * 8 + n]
        }
    }
    return a
}

function expandPermute(b) {
    var a = Array(48);
    for (i = 0; i < 8; i++) {
        a[i * 6 + 0] = i == 0 ? b[31] : b[i * 4 - 1];
        a[i * 6 + 1] = b[i * 4 + 0];
        a[i * 6 + 2] = b[i * 4 + 1];
        a[i * 6 + 3] = b[i * 4 + 2];
        a[i * 6 + 4] = b[i * 4 + 3];
        a[i * 6 + 5] = i == 7 ? b[0] : b[i * 4 + 4]
    }
    return a
}

function xor(b, a) {
    var c = Array(b.length);
    for (i = 0; i < b.length; i++) c[i] = b[i] ^ a[i];
    return c
}

function sBoxPermute(b) {
    var a = Array(32), c = "",
        d = [[14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7], [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8], [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0], [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]],
        e = [[15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10], [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5], [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15], [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]],
        h = [[10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8], [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1], [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7], [1, 10,
            13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]],
        l = [[7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15], [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9], [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4], [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]],
        g = [[2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9], [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6], [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14], [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]],
        p = [[12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11], [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8], [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6], [4, 3, 2, 12, 9, 5, 15,
            10, 11, 14, 1, 7, 6, 0, 8, 13]],
        q = [[4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1], [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6], [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2], [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]],
        u = [[13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7], [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2], [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8], [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]];
    for (m = 0; m < 8; m++) {
        var r = 0, o = 0, r = b[m * 6 + 0] * 2 + b[m * 6 + 5],
            o = b[m * 6 + 1] * 8 + b[m * 6 + 2] * 4 + b[m * 6 + 3] * 2 + b[m * 6 + 4];
        switch (m) {
            case 0:
                c = getBoxBinary(d[r][o]);
                break;
            case 1:
                c =
                    getBoxBinary(e[r][o]);
                break;
            case 2:
                c = getBoxBinary(h[r][o]);
                break;
            case 3:
                c = getBoxBinary(l[r][o]);
                break;
            case 4:
                c = getBoxBinary(g[r][o]);
                break;
            case 5:
                c = getBoxBinary(p[r][o]);
                break;
            case 6:
                c = getBoxBinary(q[r][o]);
                break;
            case 7:
                c = getBoxBinary(u[r][o])
        }
        a[m * 4 + 0] = parseInt(c.substring(0, 1));
        a[m * 4 + 1] = parseInt(c.substring(1, 2));
        a[m * 4 + 2] = parseInt(c.substring(2, 3));
        a[m * 4 + 3] = parseInt(c.substring(3, 4))
    }
    return a
}

function pPermute(b) {
    var a = Array(32);
    a[0] = b[15];
    a[1] = b[6];
    a[2] = b[19];
    a[3] = b[20];
    a[4] = b[28];
    a[5] = b[11];
    a[6] = b[27];
    a[7] = b[16];
    a[8] = b[0];
    a[9] = b[14];
    a[10] = b[22];
    a[11] = b[25];
    a[12] = b[4];
    a[13] = b[17];
    a[14] = b[30];
    a[15] = b[9];
    a[16] = b[1];
    a[17] = b[7];
    a[18] = b[23];
    a[19] = b[13];
    a[20] = b[31];
    a[21] = b[26];
    a[22] = b[2];
    a[23] = b[8];
    a[24] = b[18];
    a[25] = b[12];
    a[26] = b[29];
    a[27] = b[5];
    a[28] = b[21];
    a[29] = b[10];
    a[30] = b[3];
    a[31] = b[24];
    return a
}

function finallyPermute(b) {
    var a = Array(64);
    a[0] = b[39];
    a[1] = b[7];
    a[2] = b[47];
    a[3] = b[15];
    a[4] = b[55];
    a[5] = b[23];
    a[6] = b[63];
    a[7] = b[31];
    a[8] = b[38];
    a[9] = b[6];
    a[10] = b[46];
    a[11] = b[14];
    a[12] = b[54];
    a[13] = b[22];
    a[14] = b[62];
    a[15] = b[30];
    a[16] = b[37];
    a[17] = b[5];
    a[18] = b[45];
    a[19] = b[13];
    a[20] = b[53];
    a[21] = b[21];
    a[22] = b[61];
    a[23] = b[29];
    a[24] = b[36];
    a[25] = b[4];
    a[26] = b[44];
    a[27] = b[12];
    a[28] = b[52];
    a[29] = b[20];
    a[30] = b[60];
    a[31] = b[28];
    a[32] = b[35];
    a[33] = b[3];
    a[34] = b[43];
    a[35] = b[11];
    a[36] = b[51];
    a[37] = b[19];
    a[38] = b[59];
    a[39] =
        b[27];
    a[40] = b[34];
    a[41] = b[2];
    a[42] = b[42];
    a[43] = b[10];
    a[44] = b[50];
    a[45] = b[18];
    a[46] = b[58];
    a[47] = b[26];
    a[48] = b[33];
    a[49] = b[1];
    a[50] = b[41];
    a[51] = b[9];
    a[52] = b[49];
    a[53] = b[17];
    a[54] = b[57];
    a[55] = b[25];
    a[56] = b[32];
    a[57] = b[0];
    a[58] = b[40];
    a[59] = b[8];
    a[60] = b[48];
    a[61] = b[16];
    a[62] = b[56];
    a[63] = b[24];
    return a
}

function getBoxBinary(b) {
    var a = "";
    switch (b) {
        case 0:
            a = "0000";
            break;
        case 1:
            a = "0001";
            break;
        case 2:
            a = "0010";
            break;
        case 3:
            a = "0011";
            break;
        case 4:
            a = "0100";
            break;
        case 5:
            a = "0101";
            break;
        case 6:
            a = "0110";
            break;
        case 7:
            a = "0111";
            break;
        case 8:
            a = "1000";
            break;
        case 9:
            a = "1001";
            break;
        case 10:
            a = "1010";
            break;
        case 11:
            a = "1011";
            break;
        case 12:
            a = "1100";
            break;
        case 13:
            a = "1101";
            break;
        case 14:
            a = "1110";
            break;
        case 15:
            a = "1111"
    }
    return a
}

function generateKeys(b) {
    for (var a = Array(56), c = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []], d = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1], e = 0; e < 7; e++) {
        j = 0;
        for (k = 7; j < 8; j++, k--) a[e * 8 + j] = b[8 * k + e]
    }
    for (var e = 0, e = 0; e < 16; e++) {
        var h = b = 0;
        for (j = 0; j < d[e]; j++) {
            b = a[0];
            h = a[28];
            for (k = 0; k < 27; k++) {
                a[k] = a[k + 1];
                a[28 + k] = a[29 + k]
            }
            a[27] = b;
            a[55] = h
        }
        b = Array(48);
        b[0] = a[13];
        b[1] = a[16];
        b[2] = a[10];
        b[3] = a[23];
        b[4] = a[0];
        b[5] = a[4];
        b[6] = a[2];
        b[7] = a[27];
        b[8] = a[14];
        b[9] = a[5];
        b[10] = a[20];
        b[11] = a[9];
        b[12] = a[22];
        b[13] = a[18];
        b[14] = a[11];
        b[15] =
            a[3];
        b[16] = a[25];
        b[17] = a[7];
        b[18] = a[15];
        b[19] = a[6];
        b[20] = a[26];
        b[21] = a[19];
        b[22] = a[12];
        b[23] = a[1];
        b[24] = a[40];
        b[25] = a[51];
        b[26] = a[30];
        b[27] = a[36];
        b[28] = a[46];
        b[29] = a[54];
        b[30] = a[29];
        b[31] = a[39];
        b[32] = a[50];
        b[33] = a[44];
        b[34] = a[32];
        b[35] = a[47];
        b[36] = a[43];
        b[37] = a[48];
        b[38] = a[38];
        b[39] = a[55];
        b[40] = a[33];
        b[41] = a[52];
        b[42] = a[45];
        b[43] = a[41];
        b[44] = a[49];
        b[45] = a[35];
        b[46] = a[28];
        b[47] = a[31];
        switch (e) {
            case 0:
                for (m = 0; m < 48; m++) c[0][m] = b[m];
                break;
            case 1:
                for (m = 0; m < 48; m++) c[1][m] = b[m];
                break;
            case 2:
                for (m = 0; m < 48; m++) c[2][m] =
                    b[m];
                break;
            case 3:
                for (m = 0; m < 48; m++) c[3][m] = b[m];
                break;
            case 4:
                for (m = 0; m < 48; m++) c[4][m] = b[m];
                break;
            case 5:
                for (m = 0; m < 48; m++) c[5][m] = b[m];
                break;
            case 6:
                for (m = 0; m < 48; m++) c[6][m] = b[m];
                break;
            case 7:
                for (m = 0; m < 48; m++) c[7][m] = b[m];
                break;
            case 8:
                for (m = 0; m < 48; m++) c[8][m] = b[m];
                break;
            case 9:
                for (m = 0; m < 48; m++) c[9][m] = b[m];
                break;
            case 10:
                for (m = 0; m < 48; m++) c[10][m] = b[m];
                break;
            case 11:
                for (m = 0; m < 48; m++) c[11][m] = b[m];
                break;
            case 12:
                for (m = 0; m < 48; m++) c[12][m] = b[m];
                break;
            case 13:
                for (m = 0; m < 48; m++) c[13][m] = b[m];
                break;
            case 14:
                for (m =
                         0; m < 48; m++) c[14][m] = b[m];
                break;
            case 15:
                for (m = 0; m < 48; m++) c[15][m] = b[m]
        }
    }
    return c
}

window.atmRSA = function () {
    return {
        do_encrypt: function (b) {
            return do_encrypt_back(b)
        }
    }
}();
