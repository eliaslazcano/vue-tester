import Leilao from '@/components/Leilao'
import { mount } from '@vue/test-utils'

//O componente Leilao exige o recebimento de uma propriedade chamada 'leilao', vamos simular uma:
const leilao = {
    produto: 'Acer Aspire Nitro 5',
    lanceInicial: 4999,
    descricao: 'Notebook gamer equipado com GTX 1650 4GB e Intel Core i5 10300H'
}

describe('um leilão exibe os dados do produto', () => {
  test('exibe os dados do leilão no card', () => {
    const wrapper = mount(Leilao, { propsData: {leilao} })

    const header = wrapper.find('.card-header').element
    expect(header.textContent).toContain(`Estamos leiloando um(a): ${leilao.produto}`)

    const title = wrapper.find('.card-title').element
    expect(title.textContent).toContain(`Lance inicial: R$ ${leilao.lanceInicial}`)

    const text = wrapper.find('.card-text').element
    expect(text.textContent).toContain(leilao.descricao)
  })
})
