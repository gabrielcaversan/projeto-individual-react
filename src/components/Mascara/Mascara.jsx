export function Mascara(e) {
    var valor = e.target.value.replace(/\D/g,'');
    valor = (valor/100).toFixed(2) + '';
    valor = 'R$ ' + parseFloat(valor).toLocaleString('pt-br' , {minimumFractionDigits: 2})
    e.target.value = valor;
}