import Avaliador from '@/views/Avaliador' // Componente a ser testado
import { mount, RouterLinkStub } from '@vue/test-utils' // 'RouterLinkStub' é um componente Vue, feito para ajudar substituir o original RouterLink
import { getLeiloes } from '@/http' // O componente Leiloeiro evoca essas funcoes ao ser montado, vamos Mockar elas

jest.mock('@/http') // O Jest irá interceptar dependencias importadas deste diretorio

const leiloesFicticios = [
  {
    produto: 'Lenovo Ideapad 330S',
    lanceInicial: 2400,
    descricao: 'Notebook para multimidia'
  },
  {
    produto: 'Acer Aspire Nitro 5',
    lanceInicial: 4999,
    descricao: 'Notebook gamer equipado com GTX 1650 4GB e Intel Core i5 10300H'
  }
]

describe('Um avaliador que se conecta com a API', () => {
  test('Mostra todos os leiloes retornados pela API', async () => {
    getLeiloes.mockResolvedValueOnce(leiloesFicticios)
    const wrapper = mount(Avaliador, { stubs: { RouterLink: RouterLinkStub } }) // Com stubs o componente RouterLink contido dentro de Avaliador.vue sera substituido
    await new Promise(process.nextTick) // Aguarda qualquer código assíncrono ser terminado (getLeiloes)
    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(leiloesFicticios.length)
  })
  test('Não há leiloes retornados pela API', async () => {
    getLeiloes.mockResolvedValueOnce([])
    const wrapper = mount(Avaliador, { stubs: { RouterLink: RouterLinkStub } }) // Com stubs o componente RouterLink contido dentro de Avaliador.vue sera substituido
    await new Promise(process.nextTick) // Aguarda qualquer código assíncrono ser terminado (getLeiloes)
    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(0)
  })
})
