$(document).on('turbolinks:load', function () {
  function appendOption(category) {
    var html = `<option value="${category.id}" data-category="${category.id}">${category.name}</option>`;
    return html;
  }
  // 子カテゴリー
  function appendChildrenBox(insertHTML) {
    var childSelectHtml = '';
    childSelectHtml = `
                      <select class='select-default' name='item[category_id]]' id='child_category'>
                        <option value='---' data-category='---'>---</option>
                          ${insertHTML}
                      </select>
                      `;
    $('.contents-box__category-section__category-box__tag#async-select-box').append(childSelectHtml);
  }

  // 孫カテゴリー
  function appendGrandchildBox(insertHTML) {
    var grandchildSelectHtml = '';
    grandchildSelectHtml = `
                      <select class='select-default' name='item[category_id]' id='grandchild_category'>
                        <option value='---' data-category='---'>---</option>
                          ${insertHTML}
                      </select>
                      `;
    $('.contents-box__category-section__category-box__tag#async-select-box').append(grandchildSelectHtml);
  }

  function appendOptionsecond(derivery) {
    var html = `<option value="${delivery.id}" data-category="${delivery.id}">${delivery.name}</option>`;
    return html;
  }

  // 子デリバリー
  function appendDeliveryChildrenBox(insertHTML) {
    var deliverySelectHtml = '';
    deliverySelectHtml = `
                        <div class='contents-box__category-section__category-box__tag#async-select-boxsecond'>
                        <div class='contents-box__category-section__category-box__tag' id='delivery-method'>
                          配送の方法
                        <div class='form-require'>
                          必須
                        </div>
                        </div>
                        <select class='category' name='item[delivery_id]' id='delivery_category'>
                          <option value='---' data-category='---'>---</option>
                            ${insertHTML}
                        </select>
                        </div>
                      `;
    $('.contents-box__category-section__category-box__tag#async-select-box').append(deliverySelectHtml);
  }

  // カテゴリー欄
  $('#parent_category').on('change', function () {
    var parentCategory = document.getElementById('parent_category').value
    if (parentCategory != "---") {

      $.ajax({
        url: 'category_children',
        type: 'GET',
        data: { name: parentCategory },
        dataType: 'json'
      })
        .done(function (children) {
          $('#child_category').remove();
          $('#grandchild_category').remove();
          var insertHTML = '';
          console.log(children)
          children.forEach(function (child) {
            insertHTML += appendOption(child);
          });
          appendChildrenBox(insertHTML);
        })
        .fail(function () {
          alert('カテゴリー取得に失敗しました');
        })
    } else {
      $('#child_category').remove();
      $('#grandchild_category').remove();
    }
  });

  $('.contents-box__category-section__category-box__tag#async-select-box').on('change', '#child_category', function () {
    var childId = $('#child_category option:selected').data('category');
    if (childId != "---") {
      $.ajax({
        url: 'category_grandchildren',
        type: 'GET',
        data: { child_id: childId },
        dataType: 'json'
      })
        .done(function (grandchildren) {
          if (grandchildren.length != 0) {
            $('#grandchild_category').remove();
            var insertHTML = '';
            grandchildren.forEach(function (grandchild) {
              insertHTML += appendOption(grandchild);
            });
            appendGrandchildBox(insertHTML);
          }
        })
        .fail(function () {
          alert('カテゴリー取得に失敗しました');
        })
    } else {
      $('#grandchild_category').remove();
    }
  });
});