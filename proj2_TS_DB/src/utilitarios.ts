export function converterParaDataISO(dataStr: string, horaStr: string): string {
    const partes = dataStr.split('/');
    const dia = partes[0];
    const mes = partes[1];
    const ano = partes[2];

    const dataFormatada = `${ano}-${mes}-${dia}T${horaStr}:00`;
    const dataObjeto = new Date(dataFormatada);

    return dataObjeto.toISOString();
}