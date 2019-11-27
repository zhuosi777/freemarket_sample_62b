class ItemsController < ApplicationController

  def index
    @ladiesitem = Item.where(category_id:2690).order("created_at DESC").limit(10)
    @mensitem = Item.where(category_id:2889).order("created_at DESC").limit(10)
  end

  def show
    @items = Item.find(1)
  end

  def new
    @item = Item.new
    @category = []
    Category.where(ancestry: nil).each do |parent|
    @category << parent
    end

    @delivery = []
    Delivery.where(ancestry: nil).each do |parent_delivery|
    @delivery << parent_delivery
    end

    @bland = []
    Bland.where(params[:name]).each do |bland|
    @bland << bland
    end
  end

  def category_children
    children = Category.find(params[:name]).name
    @category_children = Category.find_by(name: children, ancestry: nil ).children
  end

  def category_grandchildren
    @category_grandchildren = Category.find(params[:child_id]).children
  end

  def delivery_children
    delivery = Delivery.find(params[:name]).name
    @delivery_children = Delivery.find_by(name: delivery).children
  end

  def create
    @item = Item.new(item_params)
    @item.save
  end

  private
    def item_params
      params.require(:item).permit(:product_name,
                                  :product_text,
                                  :price, :image, 
                                  :category_id, 
                                  :bland_id, 
                                  :size, 
                                  :delivery_id, 
                                  :shipping_region, 
                                  :shipping_date, 
                                  :commodity_condition, 
                                  :seller_id, 
                                  :buyer_id).merge(user_id_id: 1, seller_id: 1, buyer_id: 1 )
    end

end