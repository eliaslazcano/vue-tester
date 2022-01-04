import Lance from '@/components/Lance' //Componente a ser testado
import { mount } from '@vue/test-utils' //'mount' nos ajudará a simular a renderização do componente

//describe, test e expect estão globalmentes disponibilizados neste escopo por conta do Jest.
//describe -> vai me permitir organizar os testes, agrupando eles com descrições.
//test -> é um teste unitário, no escopo dele deve ser usado expect() para checar se um valor está dentro do esperado.

describe('Um Lance sem valor mínimo', () => {
  test('não aceita lance com valor menor do que 0', () => {
    const wrapper = mount(Lance) //monta (renderiza) o componente Lance, obtem uma variável que disponibiliza diversas funções para interagir com o componente
    const input = wrapper.find('input') //uma query de busca html, igual buscamos com o document.querySelector()
    input.setValue(-100) //propositalmente definimos um valor negativo para ver se o lance sera processado adiante
    wrapper.trigger('submit') //dispara o formulario html
    const lancesEmitidos = wrapper.emitted('novo-lance') //captura todas as vezes que um evento foi emitido pelo componente, retornando [[valor_primeira_vez], [valor_segunda_vez], ..]
    expect(lancesEmitidos).toBeUndefined() //faz o teste do valor esperado. neste caso o evento 'novo-lance' nao pode ter sido emitido nenhuma vez.
  })

  test('emite um lance quando o valor é maior do que 0', () => {
    const wrapper = mount(Lance)
    const input = wrapper.find('input')
    input.setValue(100)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1) //faz o teste do valor esperado. neste caso o array precisa ter o tamanho = 1
  })

  test('emite o valor esperado de um lance válido', () => {
    const wrapper = mount(Lance)
    const input = wrapper.find('input')
    input.setValue(100)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    const lance = parseInt(lancesEmitidos[0][0])
    expect(lance).toBe(100) //faz o teste do valor esperado. neste caso o valor precisa ser igual a 100
  })
})

describe('Um Lance com valor mínimo', () => {
  test('todos os lances devem possuir um valor maior do que o do mínimo informado', async () => {
    const wrapper = mount(Lance, { propsData: {lanceMinimo: 300} })
    const input = wrapper.find('input')
    input.setValue(400)
    wrapper.trigger('submit')
    await wrapper.vm.$nextTick()
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1) //faz o teste do valor esperado. neste caso o evento 'novo-lance' precisa ter sido emitido exatamente uma vez.
  })

  test('emite o valor esperado de um lance válido', () => {
    const wrapper = mount(Lance)
    const input = wrapper.find('input')
    input.setValue(400)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    const lance = parseInt(lancesEmitidos[0][0]) //pega o valor da primeira vez que o evento 'novo-lance' foi emitido
    expect(lance).toBe(400) //confere se o valor esperado é igual a 400
  })
  
  test('não são aceitos lances menores do que o valor mínimo', async () => {
    const wrapper = mount(Lance, { propsData: {lanceMinimo: 300} })
    const input = wrapper.find('input')
    input.setValue(100)
    wrapper.trigger('submit')
    await wrapper.vm.$nextTick()
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toBeUndefined()
    const msgErro = wrapper.find('p.alert').element.textContent //pega o texto do elemento html tag <p> que possui classe css 'alert'
    expect(msgErro).toContain('O valor mínimo para o lance é de R$ 300') //o texto precisa conter essa frase
  })
})
