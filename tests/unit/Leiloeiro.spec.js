import Leiloeiro from '@/views/Leiloeiro'
import { mount } from '@vue/test-utils'
import { getLeilao, getLances } from '@/http' // O componente Leiloeiro evoca essas funcoes ao ser montado, vamos Mockar elas

// Um objeto leilao para simulacao
const leilaoFicticio = {
  produto: 'Acer Aspire Nitro 5',
  lanceInicial: 4999,
  descricao: 'Notebook gamer equipado com GTX 1650 4GB e Intel Core i5 10300H'
}
// Um objeto de lances de leilao para simulacao
const lancesFicticios = [
  {
    id: 1,
    valor: 5001,
    data: '2020-06-13T18:04:26.826Z',
    leilao_id: 1
  },
  {
    id: 2,
    valor: 5005,
    data: '2020-06-13T18:06:45.811Z',
    leilao_id: 1
  },
  {
    id: 3,
    valor: 5099,
    data: '2020-06-13T18:19:44.871Z',
    leilao_id: 1
  }
]

// Mockando as funções 'getLeilao' e 'getLances' (simulando outro código no lugar do original)
jest.mock('@/http') // O Jest irá interceptar dependencias importadas deste diretorio, para simular outro resultado:
getLeilao.mockResolvedValue(leilaoFicticio) // Por padrao, todas as vezes que 'getLeilao' for invocado, o retorno será 'leilaoFicticio'
getLances.mockResolvedValue(lancesFicticios) // Por padrao, todas as vezes que 'getLances' for invocado, o retorno será 'lancesFicticios'

describe('Leiloeiro inicia um leião sem possuir lances', () => {
  test('avisa o usuário que o leilão ainda não possui lance', async () => {
    getLances.mockResolvedValueOnce([]) // Somente na proxima vez que invocar a 'getLances', o retorno será []. Depois volta ao padrao.
    const wrapper = mount(Leiloeiro, { propsData: { id: 1 } }) // Monta o componente Leiloeiro, lembrando que ele evoca getLeilao() e getLances()
    await new Promise(process.nextTick) // Aguarda qualquer código assíncrono ser terminado, como getLeilao() e getLances()
    const alerta = wrapper.find('div.alert-dark')
    expect(alerta.exists()).toBe(true)
  })
})

describe('Leiloeiro exibe os lances existentes', () => {
  test('Não mostra o aviso de "sem lances"', async () => {
    const wrapper = mount(Leiloeiro, { propsData: { id: 1 } }) // Monta o componente Leiloeiro, lembrando que ele evoca getLeilao() e getLances()
    await new Promise(process.nextTick) // Aguarda qualquer código assíncrono ser terminado, como getLeilao() e getLances()
    const alerta = wrapper.find('div.alert-dark')
    expect(alerta.exists()).toBe(false)
  })
  test('Possui uma listagem de lances', async () => {
    const wrapper = mount(Leiloeiro, { propsData: { id: 1 } }) // Monta o componente Leiloeiro, lembrando que ele evoca getLeilao() e getLances()
    await new Promise(process.nextTick) // Aguarda qualquer código assíncrono ser terminado, como getLeilao() e getLances()
    const lista = wrapper.find('ul.list-inline')
    expect(lista.exists()).toBe(true)
  })
})

describe('Leiloeiro comunica os valores de menor e maior lance', () => {
  test('Mostra o maior lance do leilao', async () => {
    const wrapper = mount(Leiloeiro, { propsData: { id: 1 } }) // Monta o componente Leiloeiro, lembrando que ele evoca getLeilao() e getLances()
    await new Promise(process.nextTick) // Aguarda qualquer código assíncrono ser terminado, como getLeilao() e getLances()
    const maiorLance = wrapper.find('.maior-lance')
    expect(maiorLance.element.textContent).toContain('Maior lance: R$ 5099')
  })
  test('Mostra o menor lance do leilao', async () => {
    const wrapper = mount(Leiloeiro, { propsData: { id: 1 } }) // Monta o componente Leiloeiro, lembrando que ele evoca getLeilao() e getLances()
    await new Promise(process.nextTick) // Aguarda qualquer código assíncrono ser terminado, como getLeilao() e getLances()
    const menorLance = wrapper.find('.menor-lance')
    expect(menorLance.element.textContent).toContain('Menor lance: R$ 5001')
  })
})
